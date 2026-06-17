terraform {
  required_providers {
        aws = {
      source  = "hashicorp/aws"
      version = "~> 6.39.0"
    }
  }
  backend "s3" {
    bucket         = "terraform-remote-backend-kubernetes"
    key            = "kubernetes/terraform.tfstate"
    region         = "eu-central-1"
    encrypt        = true

    use_lockfile = true
  }
}
provider "aws" {
  region = "eu-central-1"
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/24"
  enable_dns_hostnames = true
  enable_dns_support   = true
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.0.128/25"
  availability_zone       = "eu-central-1a"
  map_public_ip_on_launch = true
}