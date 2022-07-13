output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.website_cdn.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.website_cdn.domain_name
}

output "s3_deploy_bucket" {
  value = "s3://${aws_s3_bucket.deploy_bucket.bucket}"
}
