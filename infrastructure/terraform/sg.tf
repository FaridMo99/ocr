resource "aws_security_group" "frontend" {
  name        = "frontend-sg"
  description = "Allow HTTP and HTTPS inbound"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
  from_port       = 0
  to_port         = 0
  protocol        = "-1"
  self            = true
}
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_security_group" "server" {
  name        = "server-sg"
  description = "Allow frontend and ocr-backend inbound and outbound http traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend.id, aws_security_group.ocr-backend.id]
  }
}

resource "aws_security_group" "ocr-backend" {
  name        = "ocr-sg"
  description = "Allow server inbound and outbound http traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 3001
    to_port         = 3001
    protocol        = "tcp"
    security_groups = [aws_security_group.server.id]
  }
}