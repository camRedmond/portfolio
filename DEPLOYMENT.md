# Deployment Guide - Portfolio Website

Production deployment guide for Google VPS with Nginx, optimized for performance, security, and maintaining 512KB + NO-JS Club status.

## 📊 Club Status After Deployment

✅ **512KB Club**: Gzip compression REDUCES transfer size (280KB → ~50KB)
✅ **NO-JS Club**: CSP headers BLOCK all JavaScript execution

**Both clubs measure what's sent to browsers. These optimizations actually help your standing!**

---

## 🚀 Quick Deployment

### 1. Server Setup (One-time)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y

# Enable firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

### 2. Clone Repository

```bash
# Clone to server
cd /var/www
sudo git clone https://github.com/yourusername/portfolio.git

# Set permissions
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio
```

### 3. Configure Nginx

```bash
# Copy nginx config
sudo cp /var/www/portfolio/nginx.conf /etc/nginx/sites-available/portfolio

# Edit with your domain name
sudo nano /etc/nginx/sites-available/portfolio
# Replace "your-domain.com" with your actual domain

# Add rate limiting to main nginx.conf
sudo nano /etc/nginx/nginx.conf
```

Add this inside the `http {}` block:

```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 4. SSL Certificate (Let's Encrypt)

```bash
# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is set up automatically
# Test renewal:
sudo certbot renew --dry-run
```

### 5. Verify Deployment

```bash
# Check site is running
curl -I https://your-domain.com

# Check gzip is working
curl -H "Accept-Encoding: gzip" -I https://your-domain.com

# Check security headers
curl -I https://your-domain.com | grep -E "(X-Frame|X-Content|Strict-Transport)"
```

---

## 📈 Performance Optimizations

### Gzip Compression Stats

**Before Gzip (raw files):**
- index.html: 51KB
- styles.css: 32KB
- Total HTML/CSS: 83KB

**After Gzip:**
- index.html: ~12KB (76% reduction)
- styles.css: ~8KB (75% reduction)
- **Total transfer: ~20KB instead of 83KB**

### HTTP/2 Benefits

- Multiplexing (parallel requests)
- Header compression
- Server push (optional)
- Binary protocol (faster parsing)

### Browser Caching

```
Assets (images, CSS): 1 year cache
HTML files: 1 hour cache (for updates)
```

---

## 🔒 Security Features

### Headers Implemented

1. **Content Security Policy (CSP)**
   - Blocks ALL JavaScript execution
   - Protects NO-JS Club status
   - Prevents XSS attacks

2. **X-Frame-Options**
   - Prevents clickjacking
   - Site can't be embedded in iframes

3. **X-Content-Type-Options**
   - Prevents MIME sniffing
   - Forces correct content types

4. **Strict-Transport-Security (HSTS)**
   - Forces HTTPS
   - Prevents downgrade attacks
   - Preload ready

5. **Permissions-Policy**
   - Disables unnecessary browser features
   - Prevents location/camera/mic access

### Rate Limiting

```nginx
10 requests/second per IP
Burst: 20 requests
```

Prevents:
- DDoS attacks
- Scraping
- Abuse

### Additional Security

```bash
# Fail2ban (optional but recommended)
sudo apt install fail2ban -y

# Create nginx jail
sudo nano /etc/fail2ban/jail.local
```

Add:

```ini
[nginx-http-auth]
enabled = true

[nginx-noscript]
enabled = true

[nginx-badbots]
enabled = true
```

```bash
sudo systemctl restart fail2ban
```

---

## 📊 Monitoring

### 1. Nginx Logs

```bash
# Access log (who's visiting)
sudo tail -f /var/log/nginx/portfolio_access.log

# Error log (problems)
sudo tail -f /var/log/nginx/portfolio_error.log

# Analyze traffic
sudo cat /var/log/nginx/portfolio_access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -20
```

### 2. Simple Uptime Monitoring (Free Options)

- **UptimeRobot**: https://uptimerobot.com (free, 5 min checks)
- **Better Uptime**: https://betteruptime.com (free tier)
- **Pingdom**: https://www.pingdom.com (free trial)

### 3. Performance Monitoring

```bash
# Nginx status module (optional)
# Add to nginx.conf:
location /nginx_status {
    stub_status on;
    access_log off;
    allow 127.0.0.1;
    deny all;
}

# Check status
curl http://localhost/nginx_status
```

### 4. Basic Server Monitoring

```bash
# Install htop
sudo apt install htop -y

# Monitor resources
htop

# Check disk usage
df -h

# Check memory
free -h

# Check nginx processes
sudo systemctl status nginx
```

### 5. Log Rotation (Prevent disk fill)

Nginx logs auto-rotate, but verify:

```bash
ls -lh /etc/logrotate.d/nginx
```

---

## 🔄 Updating Your Site

### Method 1: Git Pull (Recommended)

```bash
# SSH to server
cd /var/www/portfolio

# Pull latest changes
sudo git pull origin main

# Clear nginx cache (if using)
sudo nginx -s reload

# Verify
curl -I https://your-domain.com
```

### Method 2: Manual Upload

```bash
# From local machine
rsync -avz --exclude '.git' ./ user@your-server:/var/www/portfolio/

# On server
sudo chown -R www-data:www-data /var/www/portfolio
sudo nginx -s reload
```

---

## ✅ Post-Deployment Checklist

### Performance Tests

- [ ] Run Lighthouse (should score 100/100)
- [ ] Test on https://www.webpagetest.org
- [ ] Verify gzip: https://checkgzipcompression.com
- [ ] Check load time: https://tools.pingdom.com

### Security Tests

- [ ] SSL test: https://www.ssllabs.com/ssltest/
- [ ] Security headers: https://securityheaders.com
- [ ] CSP test: https://csp-evaluator.withgoogle.com

### Club Verification

- [ ] 512KB Club: Check transfer size in DevTools Network tab
- [ ] NO-JS Club: Verify no JS in source, CSP blocks execution
- [ ] Apply for membership: https://512kb.club & https://no-js.club

### Monitoring Setup

- [ ] Set up uptime monitoring
- [ ] Configure log rotation
- [ ] Test fail2ban (if installed)
- [ ] Set calendar reminder for SSL renewal check

---

## 🐛 Troubleshooting

### Site not loading

```bash
# Check nginx status
sudo systemctl status nginx

# Check for errors
sudo nginx -t

# View error logs
sudo tail -50 /var/log/nginx/portfolio_error.log
```

### SSL issues

```bash
# Renew certificate
sudo certbot renew

# Check certificate expiry
sudo certbot certificates
```

### Performance issues

```bash
# Check server resources
htop
df -h
free -h

# Check nginx connections
netstat -an | grep :443 | wc -l

# Analyze slow requests
sudo tail -1000 /var/log/nginx/portfolio_access.log | awk '{print $4}' | sort | uniq -c | sort -rn
```

### 403 Forbidden errors

```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio
sudo chmod 644 /var/www/portfolio/index.html
```

---

## 📱 Testing Transfer Sizes

### Desktop (Chrome DevTools)

1. Open DevTools (F12)
2. Go to Network tab
3. Check "Disable cache"
4. Reload page (Ctrl+Shift+R)
5. Look at "Transferred" column (not "Size")

**Expected:**
- HTML: ~12KB transferred (~51KB uncompressed)
- CSS: ~8KB transferred (~32KB uncompressed)
- Images: Cached after first load
- **Total first load: ~280KB transferred**
- **Total cached: ~20KB**

### Command Line

```bash
# Check transfer size with gzip
curl -H "Accept-Encoding: gzip" -so /dev/null -w '%{size_download}\n' https://your-domain.com

# Check headers
curl -I https://your-domain.com
```

---

## 🎯 Expected Results

### Performance Metrics

- **First Contentful Paint**: < 0.5s
- **Largest Contentful Paint**: < 1.0s
- **Time to Interactive**: < 1.0s
- **Cumulative Layout Shift**: 0
- **Lighthouse Score**: 100/100

### Transfer Size

- **First visit**: ~280KB
- **Cached visit**: ~20KB
- **512KB Club**: ✅ Pass (54% of limit)

### Security Score

- **SSL Labs**: A+ rating
- **Security Headers**: A+ rating
- **Mozilla Observatory**: A+ rating

---

## 🔐 Maintenance Schedule

### Daily
- Monitor uptime alerts (automatic)

### Weekly
- Check error logs: `sudo tail -100 /var/log/nginx/portfolio_error.log`
- Review access patterns

### Monthly
- Update server: `sudo apt update && sudo apt upgrade -y`
- Test SSL renewal: `sudo certbot renew --dry-run`
- Check disk space: `df -h`

### Quarterly
- Review and rotate logs if needed
- Performance audit (Lighthouse)
- Security header check

---

## 📞 Support Resources

- **Nginx Docs**: https://nginx.org/en/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/
- **Security Headers**: https://securityheaders.com
- **Web.dev Performance**: https://web.dev/measure/

---

**Built with ❤️ and zero JavaScript**

*Proudly maintaining 512KB Club and NO-JS Club status in production* 🎉
