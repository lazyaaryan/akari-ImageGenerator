var PER_PAGE = 6;
var currentPage = 1;
var showFavs = false;
var lastUrl = null;
var lastBlob = null;
var lastPrompt = '';
var lastStyle = '';

var $prompt = document.getElementById('promptInput');
var $charCount = document.getElementById('charCount');
var $style = document.getElementById('styleSelect');
var $genBtn = document.getElementById('generateBtn');
var $preview = document.getElementById('previewArea');
var $previewImg = document.getElementById('previewImage');
var $dlBtn = document.getElementById('downloadBtn');
var $saveBtn = document.getElementById('saveToGalleryBtn');
var $search = document.getElementById('searchInput');
var $filterStyle = document.getElementById('filterStyle');
var $sort = document.getElementById('sortSelect');
var $favBtn = document.getElementById('favoritesBtn');
var $grid = document.getElementById('galleryGrid');
var $empty = document.getElementById('galleryEmpty');
var $pages = document.getElementById('pagination');
var $loader = document.getElementById('loaderOverlay');
var $toasts = document.getElementById('toastContainer');

document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  renderGallery();
  bindEvents();
});

function bindEvents() {
  $prompt.addEventListener('input', function() {
    $charCount.textContent = $prompt.value.length;
  });

  $genBtn.addEventListener('click', handleGenerate);
  $dlBtn.addEventListener('click', handleDownload);
  $saveBtn.addEventListener('click', handleSave);

  $search.addEventListener('input', debounce(function() {
    currentPage = 1;
    renderGallery();
  }, 300));

  $filterStyle.addEventListener('change', function() { currentPage = 1; renderGallery(); });
  $sort.addEventListener('change', function() { currentPage = 1; renderGallery(); });

  $favBtn.addEventListener('click', function() {
    showFavs = !showFavs;
    $favBtn.classList.toggle('active', showFavs);
    currentPage = 1;
    renderGallery();
  });
}

function handleGenerate() {
  var prompt = $prompt.value.trim();
  if (!prompt) { showToast('Please enter a prompt first.', 'error'); return; }

  var style = $style.value;
  $loader.classList.add('active');
  $genBtn.disabled = true;

  generateImage(prompt, style)
    .then(function(res) {
      lastUrl = res.url;
      lastBlob = res.blob;
      lastPrompt = prompt;
      lastStyle = style;

      $previewImg.src = res.url;
      $preview.style.display = 'block';
      $preview.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('Image generated! ✨', 'success');
    })
    .catch(function(err) {
      showToast(err.message || 'Failed to generate image.', 'error');
    })
    .finally(function() {
      $loader.classList.remove('active');
      $genBtn.disabled = false;
    });
}

function handleDownload() {
  if (!lastUrl) return;
  var a = document.createElement('a');
  a.href = lastUrl;
  a.download = 'ai-image-' + Date.now() + '.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Download started ⬇', 'info');
}

function handleSave() {
  if (!lastBlob) return;
  var reader = new FileReader();
  reader.onloadend = function() {
    addImageToGallery({
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 6),
      prompt: lastPrompt,
      style: lastStyle,
      imageUrl: reader.result,
      date: new Date().toISOString(),
      liked: false
    });
    renderGallery();
    showToast('Saved to gallery! 💾', 'success');
    $preview.style.display = 'none';
    lastUrl = null;
    lastBlob = null;
  };
  reader.readAsDataURL(lastBlob);
}

function renderGallery() {
  var items = getGallery();
  items = searchImages(items, $search.value);
  items = filterByStyle(items, $filterStyle.value);
  if (showFavs) items = filterFavorites(items);
  items = sortImages(items, $sort.value);

  var totalPg = getTotalPages(items.length, PER_PAGE);
  if (currentPage > totalPg) currentPage = totalPg || 1;
  var page = paginate(items, currentPage, PER_PAGE);

  if (items.length === 0) {
    $empty.classList.add('visible');
    $grid.innerHTML = '';
    $pages.innerHTML = '';
    return;
  }
  $empty.classList.remove('visible');

  $grid.innerHTML = page.map(function(item, i) {
    var heart = item.liked ? '❤️' : '🤍';
    var date = new Date(item.date).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
    return '<div class="card" style="animation-delay:' + (i * 0.06) + 's">' +
      '<div class="card__img-wrap">' +
        '<img class="card__img" src="' + item.imageUrl + '" alt="' + esc(item.prompt) + '" loading="lazy"/>' +
        '<span class="card__style-tag">' + esc(item.style) + '</span>' +
        '<button class="card__like" data-id="' + item.id + '" data-action="like">' + heart + '</button>' +
      '</div>' +
      '<div class="card__body">' +
        '<p class="card__prompt">' + esc(item.prompt) + '</p>' +
        '<div class="card__footer">' +
          '<span class="card__date">' + date + '</span>' +
          '<div class="card__actions">' +
            '<button class="card__action-btn" data-id="' + item.id + '" data-action="download" title="Download">⬇</button>' +
            '<button class="card__action-btn card__action-btn--delete" data-id="' + item.id + '" data-action="delete" title="Delete">🗑</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  $grid.onclick = function(e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var action = btn.dataset.action;
    var id = btn.dataset.id;

    if (action === 'like') {
      showToast(toggleLike(id) ? 'Added to favorites ❤️' : 'Removed from favorites', 'info');
      renderGallery();
    }
    if (action === 'delete') {
      deleteImage(id);
      showToast('Image deleted 🗑', 'info');
      renderGallery();
    }
    if (action === 'download') {
      var found = getGallery().filter(function(x) { return x.id === id; })[0];
      if (found) {
        var a = document.createElement('a');
        a.href = found.imageUrl;
        a.download = 'ai-image-' + id + '.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast('Download started ⬇', 'info');
      }
    }
  };

  renderPagination(totalPg);
}

function renderPagination(total) {
  if (total <= 1) { $pages.innerHTML = ''; return; }

  $pages.innerHTML = Array.from({ length: total }, function(_, i) {
    var pg = i + 1;
    return '<button class="page-btn' + (pg === currentPage ? ' active' : '') + '" data-page="' + pg + '">' + pg + '</button>';
  }).join('');

  $pages.onclick = function(e) {
    var btn = e.target.closest('.page-btn');
    if (!btn) return;
    currentPage = parseInt(btn.dataset.page, 10);
    renderGallery();
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
  };
}

function debounce(fn, ms) {
  var t;
  return function() {
    var ctx = this, args = arguments;
    clearTimeout(t);
    t = setTimeout(function() { fn.apply(ctx, args); }, ms);
  };
}

function showToast(msg, type) {
  var el = document.createElement('div');
  el.className = 'toast toast--' + (type || 'info');
  el.textContent = msg;
  $toasts.appendChild(el);
  setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 3200);
}

function esc(str) {
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}
