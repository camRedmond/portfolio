# Portfolio Website

A lightweight, JavaScript-free personal portfolio website showcasing DevOps and full-stack development experience. Built with pure HTML and CSS, emphasizing performance, accessibility, and aesthetic minimalism.

## 🎯 Design Philosophy

- **No JavaScript**: 100% functionality through HTML and CSS only
- **Lightweight**: Total size under 512KB (currently ~188KB)
- **Accessible**: Semantic HTML, keyboard navigation, and reduced motion support
- **Modern**: Glassmorphism effects, smooth animations, and responsive design
- **Retro Touch**: 88x31 pixel badges, monospace fonts, and terminal aesthetics

## 🏆 Achievements

- ✅ Member of [512KB Club](https://512kb.club) (188KB / 512KB - 36.6% used)
- ✅ Member of [NO-JS Club](https://no-js.club) (zero JavaScript)
- ✅ Fully responsive design
- ✅ WCAG accessibility compliant

## 📊 Technical Stats

```
Total Size: 187.64 KB
├── HTML:           50 KB
├── CSS:            31 KB
└── Assets:        107 KB
    ├── Resume PDF:  100 KB
    └── Badges:        7 KB
```

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern features (Grid, Flexbox, Custom Properties, Animations)
- **Fonts**: Space Mono (loaded via Google Fonts)
- **Icons**: Inline SVG
- **No Build Tools**: Pure HTML/CSS

## ✨ Features

### Interactive Elements (CSS Only)
- Expandable project cards using `:checked` pseudo-class
- Hover effects and transitions
- Animated background patterns
- Smooth scroll navigation
- Glassmorphism card effects

### Sections
- **Hero**: Animated background with cosmic theme
- **About**: Professional summary and background
- **Skills**: Grid layout with 10 core technologies
- **Projects**: Collapsible cards with detailed descriptions
- **Resume**: Full work experience with downloadable PDF
- **Vibes**: Spotify embeds, links, quotes, and 88x31 badges
- **Contact**: Social links and email

### Responsive Design
- Desktop: Full-width layout with 6-column skills grid
- Tablet: 3-column skills grid
- Mobile: 2-column skills grid with stacked navigation

## 🎨 Design System

### Color Palette
```css
--color-primary:    #E8E8E8  /* Off-white */
--color-secondary:  #A0A0A0  /* Light grey */
--color-accent:     #8B7BA8  /* Purple accent */
--bg-dark:          #1A1A1A  /* Dark background */
--bg-darker:        #0D0D0D  /* Darker background */
```

### Typography
- **Display/Headings**: Space Mono (monospace)
- **Body**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Code/Mono**: Space Mono

### Spacing Scale
```css
--space-xs:  0.5rem   (8px)
--space-sm:  0.75rem  (12px)
--space-md:  1.5rem   (24px)
--space-lg:  2.5rem   (40px)
--space-xl:  4rem     (64px)
```

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles.css              # All styles
├── assets/
│   ├── button356.png       # 88x31 badge
│   ├── ehbutton (2).gif    # 88x31 badge
│   ├── fingerofgod.gif     # 88x31 badge
│   ├── hetzner.gif         # 88x31 badge
│   ├── vim.gif             # 88x31 badge
│   └── Cameron Redmond - 2025 Resume.pdf
└── README.md               # This file
```

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/camRedmond/portfolio.git
cd portfolio
```

2. Open in browser:
```bash
open index.html
# or
python3 -m http.server 8000
```

3. Navigate to `http://localhost:8000`

### Deployment

This is a static site with no build process.

#### Simple Hosting (Static)

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect repository
- **Cloudflare Pages**: Connect repository

#### Production VPS (Nginx)

For production deployment on a VPS with Nginx, see the complete guide:

📖 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Full production deployment guide

Includes:
- ✅ Nginx configuration with HTTP/2
- ✅ SSL/TLS setup (Let's Encrypt)
- ✅ Security headers (CSP, HSTS, etc.)
- ✅ Gzip compression (280KB → ~50KB transfer)
- ✅ Rate limiting and DDoS protection
- ✅ Monitoring and health checks
- ✅ Maintains 512KB + NO-JS Club status

**Quick Start:**
```bash
# Clone to server
git clone https://github.com/yourusername/portfolio.git /var/www/portfolio

# Copy nginx config
sudo cp /var/www/portfolio/nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Edit domain name
sudo nano /etc/nginx/sites-available/portfolio

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Restart nginx
sudo nginx -t && sudo systemctl restart nginx
```

## 🎨 Customization

### Updating Content

1. **Personal Info**: Edit `index.html` sections (About, Projects, Resume)
2. **Colors**: Modify CSS custom properties in `styles.css` (lines 4-52)
3. **Projects**: Update project cards in `index.html` (lines 170-242)
4. **Resume**: Replace PDF in `assets/` folder

### Adding 88x31 Badges

1. Download badges from:
   - https://cyber.dabamos.de/88x31/
   - https://anlucas.neocities.org/88x31Buttons
   - Create your own: https://hekate2.github.io/buttonmaker/

2. Add to `assets/` folder

3. Reference in HTML:
```html
<img src="assets/your-badge.gif" alt="Description" class="badge-88x31">
```

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- Semantic HTML5 elements
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigation support
- Focus visible indicators
- Reduced motion support (`prefers-reduced-motion`)
- High contrast ratios
- Alt text for all images

## 📈 Performance

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 1s
- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **No JavaScript**: Zero blocking scripts
- **CSS Animations**: GPU-accelerated transforms

## 🔧 Future Enhancements

- [ ] Dark/light mode toggle (CSS only via checkbox)
- [ ] Print stylesheet optimization
- [ ] More 88x31 badges
- [ ] Blog section
- [ ] RSS feed

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Cameron Redmond**
- Email: cam.redmond@protonmail.com
- GitHub: [@camRedmond](https://github.com/camRedmond)
- LinkedIn: [cameron-redmond](https://linkedin.com/in/cameron-redmond)
- Twitter: [@0xREDZ](https://x.com/0xREDZ)

## 🙏 Acknowledgments

- [512KB Club](https://512kb.club) - Inspiration for lightweight web
- [NO-JS Club](https://no-js.club) - JavaScript-free web movement
- [Space Mono](https://fonts.google.com/specimen/Space+Mono) - Google Fonts
- [88x31 Badge Collection](https://cyber.dabamos.de/88x31/) - Retro badges

---

⭐ If you found this portfolio template useful, consider starring the repository!

Built with ❤️ and zero JavaScript.
