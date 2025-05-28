<?php
// Set Content Security Policy
header("Content-Security-Policy: default-src 'self'; script-src 'self' https://js.stripe.com https://checkout.stripe.com 'unsafe-inline'; connect-src 'self' https://api.stripe.com; frame-src 'self' https://checkout.stripe.com https://js.stripe.com; img-src 'self' data: https://*.stripe.com;");

// Set other security headers
header("X-Frame-Options: DENY");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection: 1; mode=block");
header("Referrer-Policy: strict-origin-when-cross-origin");
