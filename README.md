# Portfolio v3 - Redesigned

## Philosophy

This redesign prioritizes **elegance through restraint**. No bento grids, no cards, no "AI template" aesthetics. Just clean typography, purposeful spacing, and thoughtful interactions.

Inspired by: ewan.my, binyam.io, benzimmermann.dev, and the terminal aesthetic from v2.

---

## Design Principles

1. **Typography is the interface** - Large, gradient hero. Clear hierarchy through scale.
2. **Whitespace creates rhythm** - 6rem section padding. Content never cramped.
3. **Single accent color** - Purple gradient. Used sparingly for maximum impact.
4. **Purposeful interactions** - Subtle transforms, smooth transitions. Nothing gratuitous.
5. **Content-first** - Single-column, linear flow. No clever layouts.
6. **Technical authenticity** - Monospace fonts, clean semantic HTML.

---

## Key Features

### Modern Typography
- Hero: `clamp(2.5rem, 8vw, 5rem)` with purple gradient
- Headings: `clamp()` for fluid scaling
- Monospace stack: JetBrains Mono → SF Mono → Consolas

### Sophisticated Spacing
- Section padding: 6rem (4rem on mobile)
- Hero padding: 8rem top (4rem on mobile)
- Line height: 1.7 for readability
- Max-width: 900px, content: 700px

### Dark Theme (Default)
- Background: `#0a0a0a` (near-black)
- Text: `#e5e5e5` (soft white)
- Muted: `#a0a0a0` (gray)
- Accent: `#a78bfa` (purple)
- Light theme available via toggle

### Subtle Interactions
- Transform on hover: `translateY(-1px)`, `translateX(4px)`
- Smooth transitions: 200ms
- Arrow reveal on project hover
- Pulsing status dot
- All respect `prefers-reduced-motion`

---

## File Structure

```
v3/
├── index.html          (8KB)   Single-page portfolio
├── style.css           (12KB)  Complete design system
├── theme.js            (897B)  Dark/light toggle
├── README.md           (this file)
└── assets/
    ├── gifs/           (52KB)  8 optimized GIFs (unused in redesign)
    ├── badges/         (60KB)  15 badges (minimal use)
    └── images/         Placeholder for profile photo

Total: ~152KB (30% of budget)
```

---

## What Changed from Previous v3

**Before (Generic):**
- ❌ Bento grid layout
- ❌ Multiple accent colors (purple, blue, pink, orange, green)
- ❌ Card-based components with borders
- ❌ Multi-page structure
- ❌ Felt "AI-generated"

**After (Purposeful):**
- ✅ Single-column linear layout
- ✅ One accent color (purple)
- ✅ Typography and whitespace as primary design elements
- ✅ Single-page with smooth anchor scrolling
- ✅ Feels intentional and human

---

## Design Decisions

Every choice has a purpose:

**Gradient on h1**: Creates visual interest without adding elements
**Status dot pulse**: Subtle life, indicates availability
**Transform on hover**: Provides feedback without being distracting
**6rem section spacing**: Generous breathing room, never cramped
**900px max-width**: Optimal line length for monospace fonts
**Purple accent**: Technical yet warm, stands out without screaming
**Dark default**: Preferred by developers, easier on eyes
**Single page**: Reduces friction, improves storytelling flow

---

## Code Quality

**Semantic HTML**
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels on interactive elements
- Native anchor links (no JavaScript routing)
- Focus-visible for keyboard navigation

**Modern CSS**
- CSS custom properties for theming
- `clamp()` for responsive typography
- Logical properties where applicable
- Print styles included
- No vendor prefixes needed (modern baseline)

**Minimal JavaScript**
- 897 bytes unminified
- Single purpose: theme toggle
- Progressive enhancement (works without JS)
- No dependencies

---

## Customization

### Change Accent Color
Edit CSS variables in `style.css`:
```css
:root {
  --accent: #8b5cf6;     /* Your color here */
  --accent-hover: #7c3aed;
}

[data-theme="dark"] {
  --accent: #a78bfa;     /* Brighter for dark mode */
  --accent-hover: #c4b5fd;
}
```

### Adjust Spacing
Modify section padding:
```css
section {
  padding: 6rem 0;  /* Increase/decrease as needed */
}
```

### Typography Scale
Change hero size:
```css
h1 {
  font-size: clamp(2.5rem, 8vw, 5rem);
  /* min, preferred, max */
}
```

---

## Performance

**Lighthouse Scores (Expected)**
- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Optimizations**
- No external dependencies
- Minimal CSS/JS
- System fonts (JetBrains Mono falls back to SF Mono)
- `font-display: swap` (implicit in modern browsers)
- `scroll-behavior: smooth` for UX
- Print styles included

---

## Browser Support

Works in all modern browsers:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Chrome Mobile

**Progressive Enhancement**
- Site works without JavaScript (just no theme toggle)
- Animations disabled for `prefers-reduced-motion`
- Print styles for CV printing
- Focus styles for keyboard navigation

---

## Next Steps

1. **Add content** - Update projects, work history, contact info
2. **Test in browser** - `open v3/index.html`
3. **Tweak colors** - Adjust accent color to your preference
4. **Deploy** - Upload to your web host
5. **Share** - Submit to 512KB Club

---

## Philosophy in Action

This isn't a template. It's a foundation.

The design doesn't try to impress with clever CSS tricks or trendy animations. It gets out of the way and lets your work speak.

Large typography commands attention. Generous whitespace creates rhythm. Subtle interactions provide feedback. Everything has a purpose.

This is what "10x engineer" looks like in design: thoughtful decisions, clean execution, no wasted motion.

**Built with intention. Designed with restraint. Coded with care.**
