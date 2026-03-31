var STORAGE_KEY = 'aiGallery_images';
var THEME_KEY = 'aiGallery_theme';

function getGallery() {
  var raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveGallery(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function addImageToGallery(item) {
  var g = getGallery();
  g.unshift(item);
  saveGallery(g);
}

function toggleLike(id) {
  var g = getGallery();
  var state = false;
  var updated = g.map(function(item) {
    if (item.id === id) {
      state = !item.liked;
      return Object.assign({}, item, { liked: state });
    }
    return item;
  });
  saveGallery(updated);
  return state;
}

function deleteImage(id) {
  saveGallery(getGallery().filter(function(item) { return item.id !== id; }));
}

function getSavedTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
