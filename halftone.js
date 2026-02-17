// Halftone background animation
(function() {
  'use strict';

  const canvas = document.getElementById('halftone-canvas');
  const ctx = canvas.getContext('2d');

  // Configuration
  const config = {
    dotSpacing: 25,        // Grid spacing
    minSize: 0.5,          // Minimum dot radius
    maxSize: 2.5,          // Maximum dot radius
    waveSpeed: 0.0008,     // Animation speed
    waveScale: 0.015,      // Wave frequency (lower = larger waves)
    baseOpacity: 0.15      // Base opacity
  };

  let time = 0;
  let dots = [];
  let resizeTimeout;

  // Get current theme color
  function getDotColor() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'dark' ? '#f0ede8' : '#2a2a2a';
  }

  // Initialize canvas and dot grid
  function init() {
    resizeCanvas();
    animate();

    // Update on theme change
    const observer = new MutationObserver(() => requestAnimationFrame(draw));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  // Resize canvas to window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createDotGrid();
  }

  // Create grid of dot positions
  function createDotGrid() {
    dots = [];
    const cols = Math.ceil(canvas.width / config.dotSpacing) + 1;
    const rows = Math.ceil(canvas.height / config.dotSpacing) + 1;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: i * config.dotSpacing,
          y: j * config.dotSpacing
        });
      }
    }
  }

  // Calculate dot size based on wave function
  function getDotSize(x, y, t) {
    // Create flowing wave pattern using sine waves
    const wave1 = Math.sin(x * config.waveScale + t);
    const wave2 = Math.sin(y * config.waveScale + t * 0.7);
    const wave3 = Math.sin((x + y) * config.waveScale * 0.5 + t * 0.5);

    // Combine waves for more organic pattern
    const combined = (wave1 + wave2 + wave3) / 3;

    // Map to size range (0 to 1)
    const normalized = (combined + 1) / 2;

    // Return size between min and max
    return config.minSize + (normalized * (config.maxSize - config.minSize));
  }

  // Draw all dots
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const color = getDotColor();
    ctx.fillStyle = color;

    // Draw each dot with calculated size
    dots.forEach(dot => {
      const size = getDotSize(dot.x, dot.y, time);

      // Vary opacity slightly with size for more depth
      const opacity = config.baseOpacity + (size / config.maxSize) * 0.1;
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
  }

  // Animation loop
  function animate() {
    time += config.waveSpeed;
    draw();
    requestAnimationFrame(animate);
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 100);
  });

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
