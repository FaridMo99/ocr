terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.39.0"
    }
  }
}

provider "aws" { 
    region = "eu-central-1"
    }

resource "aws_s3_bucket" "terraform_state" {
  bucket = "terraform-remote-backend-kubernetes"
  
  lifecycle {
    prevent_destroy = true
  }
}


resource "aws_s3_bucket_versioning" "state_versioning" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration { 
    status = "Enabled"
     }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state_crypto" {
  bucket = aws_s3_bucket.terraform_state.id
  rule { 
    apply_server_side_encryption_by_default { 
        sse_algorithm = "AES256"
        }
    }
}