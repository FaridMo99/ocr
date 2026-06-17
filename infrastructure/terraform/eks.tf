module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  vpc_id     = aws_vpc.main.id
  subnet_ids = aws_subnet.public.id

  # Security: Add your IAM user/role as an admin to the cluster
  enable_cluster_creator_admin_permissions = true

  # Compute: Managed Node Groups
  eks_managed_node_groups = {
    general = {
      min_size     = 1
      max_size     = 3
      desired_size = 2

      instance_types = ["t3.medium"]
    }
  }

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}