// Minimal theme toggle with localStorage persistence
// Defaults to light mode
(function() {
  'use strict';

  // Get saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Apply theme immediately (before DOMContentLoaded to prevent flash)
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Toggle function
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  // Attach to button after DOM loads
  document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  });
})();
