# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email us at: security@highsafety.ae
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work on a fix.

## Security Best Practices

### For Deployment:

- ✅ Always use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Use strong passwords
- ✅ Enable rate limiting
- ✅ Regular security audits

### For Development:

- ✅ Never commit `.env` files
- ✅ Use environment variables for secrets
- ✅ Validate all user inputs
- ✅ Sanitize database queries
- ✅ Keep API keys secure

## Known Security Considerations

### Current Implementation (v1.0):

**Strengths:**
- Environment variables for sensitive data
- Password hashing (SHA256)
- Prepared statements for SQLite
- CORS configuration
- Stripe PCI-compliant payment

**Areas for Improvement:**
- Consider using bcrypt instead of SHA256
- Add rate limiting middleware
- Implement Helmet.js for security headers
- Remove shell command execution feature
- Add input validation middleware

## Updates

Security updates will be released as patch versions (1.0.x).

Stay informed by watching this repository.

---

**Last Updated:** December 2025
