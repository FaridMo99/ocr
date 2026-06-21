output "vpc_id" {
  value = aws_vpc.main.id
}

output "github_actions_role_arn" {
  value = aws_iam_role.github_actions.arn
}