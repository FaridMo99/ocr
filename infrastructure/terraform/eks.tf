module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"
  name    = "textgrab-production"

  vpc_id     = aws_vpc.main.id
  subnet_ids = [for s in aws_subnet.private : s.id]

  enable_cluster_creator_admin_permissions = true
  enable_irsa                              = true

  addons = {
    coredns    = { most_recent = true }
    kube-proxy = { most_recent = true }
    vpc-cni    = { most_recent = true }
  }

  identity_providers = {
    sts = {
      issuer = "https://token.actions.githubusercontent.com"
    }
  }

  eks_managed_node_groups = {
    general = {
      min_size     = 1
      max_size     = 3
      desired_size = 2

      instance_types = ["t3.medium"]
      subnet_ids     = [for s in aws_subnet.private : s.id]

      vpc_security_group_ids = [
        aws_security_group.frontend.id,
        aws_security_group.ocr-backend.id,
        aws_security_group.server.id
      ]
    }
  }

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}