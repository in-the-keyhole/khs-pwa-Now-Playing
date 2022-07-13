locals {
  bucket_name = format("%s.%s", var.subdomain_name, var.domain_name)
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.deploy_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.deploy_bucket.arn}/*"
      },
    ]
  })
}

resource "aws_s3_bucket" "deploy_bucket" {
  bucket = local.bucket_name
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = var.tags
}
