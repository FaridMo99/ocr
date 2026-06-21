locals {
  domain_name = "textgrab.com"
  subdomains  = ["", "www"]
  dns_records = { for s in local.subdomains : (s == "" ? local.domain_name : "${s}.${local.domain_name}") => s }
}

# TSL cert
resource "aws_acm_certificate" "main" {
  domain_name               = local.domain_name
  subject_alternative_names = [for domain in keys(local.dns_records) : domain if domain != local.domain_name]
  validation_method         = "DNS"
}

# DNS (R53)
resource "aws_route53_zone" "main" {
  name = "textgrab.com"
}

resource "aws_route53_record" "dns_records" {
  for_each = local.dns_records

  zone_id = aws_route53_zone.main.zone_id
  name    = each.key
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

# load balancer
resource "aws_lb" "main" {
  name               = "alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [for s in aws_subnet.public : s.id]

  enable_deletion_protection = false
}

resource "aws_lb_target_group" "app_tg" {
  name        = "app-target-group"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    path                = "/health"
    healthy_threshold   = 2
    unhealthy_threshold = 10
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-Res-PQ-2025-09"
  certificate_arn   = aws_acm_certificate.main.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}