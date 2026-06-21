variable "subnets_public" {
  default = {
    "public-az1" = { az = "eu-central-1a", cidr = "10.0.1.0/24", public = true }
    "public-az2" = { az = "eu-central-1b", cidr = "10.0.2.0/24", public = true }
    "public-az3" = { az = "eu-central-1c", cidr = "10.0.3.0/24", public = true }
  }
}

variable "subnets_private" {
  default = {
    "private-az1" = { az = "eu-central-1a", cidr = "10.0.10.0/24", public = false }
    "private-az2" = { az = "eu-central-1b", cidr = "10.0.11.0/24", public = false }
    "private-az3" = { az = "eu-central-1c", cidr = "10.0.12.0/24", public = false }
  }
}