resource "aws_route53_record" "subdomain" {
  zone_id = "Z01786413D3NWMNM4V0CR"
  name    = "${var.subdomain_name}.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website_cdn.domain_name
    zone_id                = "Z2FDTNDATAQYW2" # CloudFront ZoneID (https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53-aliastarget.html)
    evaluate_target_health = false
  }
}
