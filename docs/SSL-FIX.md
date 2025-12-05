# Quick SSL Certificate Fix

You're getting the error because nginx is trying to load SSL certificates that don't exist yet. Here's how to fix it:

## Problem
```
cannot load certificate "/etc/letsencrypt/live/camredmond.com/fullchain.pem"
```

This happens because:
1. Your nginx config references SSL certificates
2. But certbot hasn't created them yet
3. Nginx won't start without valid certificate paths

## Solution: 3-Step Process

### Step 1: Use Initial Config (No SSL)

```bash
# Remove current config
sudo rm /etc/nginx/sites-enabled/portfolio

# Copy initial config (without SSL)
sudo cp /var/www/portfolio/nginx-initial.conf /etc/nginx/sites-available/portfolio

# Enable it
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

### Step 2: Get SSL Certificate

```bash
# Now certbot can work (nginx is running on port 80)
sudo certbot certonly --nginx -d camredmond.com -d www.camredmond.com
```

You should see:
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/camredmond.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/camredmond.com/privkey.pem
```

### Step 3: Switch to Full Config (With SSL)

```bash
# Remove initial config
sudo rm /etc/nginx/sites-enabled/portfolio

# Copy full config (with SSL)
sudo cp /var/www/portfolio/nginx.conf /etc/nginx/sites-available/portfolio

# Enable it
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: Verify It Works

```bash
# Test HTTPS
curl -I https://camredmond.com

# Should show:
# HTTP/2 200
# server: nginx
# content-encoding: gzip
# etc.
```

## Alternative: Let Certbot Handle It

If you want certbot to automatically configure nginx:

```bash
# Use initial config first
sudo cp /var/www/portfolio/nginx-initial.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# Let certbot modify the config
sudo certbot --nginx -d camredmond.com -d www.camredmond.com

# Certbot will:
# 1. Get the certificate
# 2. Modify your nginx config to use it
# 3. Set up HTTPS redirect

# Then you can manually add security headers and optimizations from nginx.conf
```

## Troubleshooting

### If you see "Address already in use"
```bash
# Stop nginx
sudo systemctl stop nginx

# Start fresh
sudo systemctl start nginx
```

### If certbot fails with "Connection refused"
```bash
# Make sure nginx is running
sudo systemctl status nginx

# Make sure port 80 is open
sudo ufw allow 80/tcp

# Check if something else is using port 80
sudo netstat -tlnp | grep :80
```

### If you already have old certificate attempts
```bash
# Remove old certificates
sudo certbot delete --cert-name camredmond.com

# Start fresh
sudo certbot certonly --nginx -d camredmond.com -d www.camredmond.com
```

## Quick Commands Summary

```bash
# 1. Initial setup
sudo cp /var/www/portfolio/nginx-initial.conf /etc/nginx/sites-available/portfolio
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# 2. Get certificate
sudo certbot certonly --nginx -d camredmond.com -d www.camredmond.com

# 3. Full config
sudo cp /var/www/portfolio/nginx.conf /etc/nginx/sites-available/portfolio
sudo nginx -t && sudo systemctl restart nginx

# 4. Test
curl -I https://camredmond.com
```

Done! Your site should now be running with HTTPS.
