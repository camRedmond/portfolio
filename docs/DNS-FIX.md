# DNS Fix for SSL Certificate

## The Problem

Certbot is failing because `www.camredmond.com` doesn't exist in your DNS:

```
DNS problem: NXDOMAIN looking up A for www.camredmond.com
```

**NXDOMAIN = "Non-Existent Domain"**

## Option 1: Get Certificate Without WWW (Quickest)

Just use the apex domain without www:

```bash
# Get certificate for apex domain only
sudo certbot certonly --nginx -d camredmond.com

# This will work immediately!
```

Then update your nginx configs to remove www references.

## Option 2: Add WWW DNS Record (Recommended)

Add a DNS record for www subdomain, then get certificate for both.

### Check Current DNS Setup

```bash
# Check if apex domain resolves
dig +short camredmond.com

# Check if www resolves (probably returns nothing)
dig +short www.camredmond.com
```

### Add DNS Records

Go to your DNS provider (Google Cloud DNS, Cloudflare, etc.) and add:

**For apex domain (if not already there):**
```
Type: A
Name: @
Value: YOUR_VPS_IP
TTL: 3600
```

**For www subdomain:**
```
Type: A
Name: www
Value: YOUR_VPS_IP
TTL: 3600
```

**OR use a CNAME (alternative):**
```
Type: CNAME
Name: www
Value: camredmond.com
TTL: 3600
```

### Wait for DNS Propagation

```bash
# Check if it's working (may take 5-60 minutes)
dig +short www.camredmond.com

# Should return your VPS IP
```

### Then Get Certificate

```bash
# Once DNS is working, get cert for both
sudo certbot certonly --nginx -d camredmond.com -d www.camredmond.com
```

## Quick Fix: Use Apex Domain Only

### Step 1: Update nginx-initial.conf

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Change:
```nginx
server_name camredmond.com www.camredmond.com;
```

To:
```nginx
server_name camredmond.com;
```

### Step 2: Restart Nginx

```bash
sudo nginx -t && sudo systemctl restart nginx
```

### Step 3: Get Certificate (Just Apex)

```bash
sudo certbot certonly --nginx -d camredmond.com
```

This should work immediately!

### Step 4: Update Full Config

Edit `/var/www/portfolio/nginx.conf` and change all instances:

```nginx
# Change this:
server_name camredmond.com www.camredmond.com;

# To this:
server_name camredmond.com;
```

### Step 5: Use Full Config

```bash
sudo cp /var/www/portfolio/nginx.conf /etc/nginx/sites-available/portfolio
sudo nginx -t && sudo systemctl restart nginx
```

## Testing

```bash
# Test apex domain
curl -I https://camredmond.com

# If you added www, test it too
curl -I https://www.camredmond.com
```

## Recommended: Add WWW Later

Even if you start without www, you can add it later:

1. Add DNS record for www
2. Wait for propagation
3. Expand certificate:
```bash
sudo certbot certonly --nginx --expand -d camredmond.com -d www.camredmond.com
```
4. Update nginx config to include www again

## Google Cloud DNS Example

If using Google Cloud DNS:

```bash
# Add www A record
gcloud dns record-sets create www.camredmond.com. \
  --zone=YOUR_ZONE_NAME \
  --type=A \
  --ttl=300 \
  --rrdatas=YOUR_VPS_IP
```

Or use the Google Cloud Console:
1. Go to Cloud DNS
2. Click your zone
3. Click "Add Record Set"
4. DNS Name: www
5. Resource Record Type: A
6. IPv4 Address: YOUR_VPS_IP
7. Click Create

## Quick Commands (Apex Only)

```bash
# 1. Update nginx config (remove www)
sudo nano /etc/nginx/sites-available/portfolio
# Remove 'www.camredmond.com' from server_name line

# 2. Restart
sudo nginx -t && sudo systemctl restart nginx

# 3. Get cert (apex only)
sudo certbot certonly --nginx -d camredmond.com

# 4. Use full config
sudo cp /var/www/portfolio/nginx.conf /etc/nginx/sites-available/portfolio
sudo nano /etc/nginx/sites-available/portfolio
# Remove 'www.camredmond.com' from both server blocks

# 5. Final restart
sudo nginx -t && sudo systemctl restart nginx

# 6. Test
curl -I https://camredmond.com
```

Done! Your site should be live at https://camredmond.com
