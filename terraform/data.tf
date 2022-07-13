locals {
  s3_bucket_name = format("%s.%s", var.subdomain_name, var.domain_name)
}
