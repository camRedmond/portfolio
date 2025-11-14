#!/bin/bash

# Simple monitoring script for portfolio website
# Run on server via cron or manually

set -e

# Configuration
DOMAIN="your-domain.com"
LOG_FILE="/var/log/portfolio_monitor.log"
ALERT_EMAIL="your-email@example.com"  # Optional: for email alerts

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Timestamp
timestamp() {
    date "+%Y-%m-%d %H:%M:%S"
}

log() {
    echo "[$(timestamp)] $1" | tee -a "$LOG_FILE"
}

check_website() {
    echo -e "${YELLOW}=== Portfolio Website Health Check ===${NC}\n"

    # 1. Check if Nginx is running
    echo -n "Nginx Status: "
    if systemctl is-active --quiet nginx; then
        echo -e "${GREEN}✓ Running${NC}"
        log "INFO: Nginx is running"
    else
        echo -e "${RED}✗ Not Running${NC}"
        log "ERROR: Nginx is not running"
        return 1
    fi

    # 2. Check website accessibility
    echo -n "Website Accessibility (HTTP): "
    if curl -s -o /dev/null -w "%{http_code}" "http://$DOMAIN" | grep -q "301\|200"; then
        echo -e "${GREEN}✓ Accessible${NC}"
        log "INFO: Website HTTP accessible"
    else
        echo -e "${RED}✗ Not Accessible${NC}"
        log "ERROR: Website HTTP not accessible"
        return 1
    fi

    echo -n "Website Accessibility (HTTPS): "
    if curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" | grep -q "200"; then
        echo -e "${GREEN}✓ Accessible${NC}"
        log "INFO: Website HTTPS accessible"
    else
        echo -e "${RED}✗ Not Accessible${NC}"
        log "ERROR: Website HTTPS not accessible"
        return 1
    fi

    # 3. Check SSL certificate expiry
    echo -n "SSL Certificate: "
    CERT_DAYS=$(echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | \
                openssl x509 -noout -dates | grep notAfter | cut -d= -f2 | \
                xargs -I {} date -d {} +%s 2>/dev/null || \
                echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | \
                openssl x509 -noout -dates | grep notAfter | cut -d= -f2 | \
                xargs -I {} date -jf "%b %d %T %Y %Z" {} +%s)
    CURRENT_EPOCH=$(date +%s)
    DAYS_LEFT=$(( ($CERT_DAYS - $CURRENT_EPOCH) / 86400 ))

    if [ "$DAYS_LEFT" -gt 30 ]; then
        echo -e "${GREEN}✓ Valid ($DAYS_LEFT days remaining)${NC}"
        log "INFO: SSL certificate valid for $DAYS_LEFT days"
    elif [ "$DAYS_LEFT" -gt 7 ]; then
        echo -e "${YELLOW}⚠ Expiring soon ($DAYS_LEFT days remaining)${NC}"
        log "WARNING: SSL certificate expires in $DAYS_LEFT days"
    else
        echo -e "${RED}✗ Expiring very soon ($DAYS_LEFT days remaining)${NC}"
        log "CRITICAL: SSL certificate expires in $DAYS_LEFT days"
    fi

    # 4. Check response time
    echo -n "Response Time: "
    RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" "https://$DOMAIN")
    if (( $(echo "$RESPONSE_TIME < 1.0" | bc -l) )); then
        echo -e "${GREEN}✓ ${RESPONSE_TIME}s${NC}"
        log "INFO: Response time: ${RESPONSE_TIME}s"
    else
        echo -e "${YELLOW}⚠ ${RESPONSE_TIME}s (slow)${NC}"
        log "WARNING: Slow response time: ${RESPONSE_TIME}s"
    fi

    # 5. Check gzip compression
    echo -n "Gzip Compression: "
    if curl -sI -H "Accept-Encoding: gzip" "https://$DOMAIN" | grep -q "Content-Encoding: gzip"; then
        echo -e "${GREEN}✓ Enabled${NC}"
        log "INFO: Gzip compression enabled"
    else
        echo -e "${RED}✗ Not Enabled${NC}"
        log "ERROR: Gzip compression not enabled"
    fi

    # 6. Check security headers
    echo -n "Security Headers: "
    HEADERS=$(curl -sI "https://$DOMAIN")
    SECURITY_SCORE=0

    echo "$HEADERS" | grep -q "X-Frame-Options" && SECURITY_SCORE=$((SECURITY_SCORE + 1))
    echo "$HEADERS" | grep -q "X-Content-Type-Options" && SECURITY_SCORE=$((SECURITY_SCORE + 1))
    echo "$HEADERS" | grep -q "Content-Security-Policy" && SECURITY_SCORE=$((SECURITY_SCORE + 1))
    echo "$HEADERS" | grep -q "Strict-Transport-Security" && SECURITY_SCORE=$((SECURITY_SCORE + 1))

    if [ "$SECURITY_SCORE" -eq 4 ]; then
        echo -e "${GREEN}✓ All present (4/4)${NC}"
        log "INFO: All security headers present"
    elif [ "$SECURITY_SCORE" -ge 2 ]; then
        echo -e "${YELLOW}⚠ Partial ($SECURITY_SCORE/4)${NC}"
        log "WARNING: Only $SECURITY_SCORE/4 security headers present"
    else
        echo -e "${RED}✗ Missing ($SECURITY_SCORE/4)${NC}"
        log "ERROR: Only $SECURITY_SCORE/4 security headers present"
    fi

    # 7. Check disk space
    echo -n "Disk Space: "
    DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$DISK_USAGE" -lt 80 ]; then
        echo -e "${GREEN}✓ ${DISK_USAGE}% used${NC}"
        log "INFO: Disk usage: ${DISK_USAGE}%"
    elif [ "$DISK_USAGE" -lt 90 ]; then
        echo -e "${YELLOW}⚠ ${DISK_USAGE}% used${NC}"
        log "WARNING: Disk usage: ${DISK_USAGE}%"
    else
        echo -e "${RED}✗ ${DISK_USAGE}% used (critical)${NC}"
        log "CRITICAL: Disk usage: ${DISK_USAGE}%"
    fi

    # 8. Check recent errors in nginx logs
    echo -n "Recent Nginx Errors: "
    ERROR_COUNT=$(grep -c "error" /var/log/nginx/portfolio_error.log 2>/dev/null | tail -1 || echo 0)
    if [ "$ERROR_COUNT" -eq 0 ]; then
        echo -e "${GREEN}✓ None${NC}"
        log "INFO: No recent nginx errors"
    else
        echo -e "${YELLOW}⚠ $ERROR_COUNT errors in log${NC}"
        log "WARNING: $ERROR_COUNT errors in nginx log"
    fi

    echo -e "\n${GREEN}Health check complete!${NC}"
    log "INFO: Health check completed successfully"
}

# Run health check
check_website

# Optional: Print recent visitor stats
echo -e "\n${YELLOW}=== Recent Traffic (Last 100 requests) ===${NC}"
if [ -f /var/log/nginx/portfolio_access.log ]; then
    echo "Top IPs:"
    tail -100 /var/log/nginx/portfolio_access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -5

    echo -e "\nTop Pages:"
    tail -100 /var/log/nginx/portfolio_access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head -5

    echo -e "\nStatus Codes:"
    tail -100 /var/log/nginx/portfolio_access.log | awk '{print $9}' | sort | uniq -c | sort -rn
fi
