function initTheme() {
  applyTheme(getSavedTheme());

  document.getElementById('themeToggle').addEventListener('click', function() {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('themeIcon').textContent = theme === 'dark' ? 'Light' : 'Dark';
}
