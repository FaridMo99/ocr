terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 6.42.0"
    }
  }
  backend "s3" {
    bucket  = "terraform-remote-backend-kubernetes"
    key     = "kubernetes/terraform.tfstate"
    region  = "eu-central-1"
    encrypt = true

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
  for_each          = var.subnets_public
  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az

  tags = { Name = each.key }
}

resource "aws_subnet" "private" {
  for_each          = var.subnets_private
  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az

  tags = { Name = each.key }
}