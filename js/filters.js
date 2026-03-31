function searchImages(items, query) {
  var q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(function(item) {
    return item.prompt.toLowerCase().includes(q);
  });
}

function filterByStyle(items, style) {
  if (!style || style === 'All') return items;
  return items.filter(function(item) { return item.style === style; });
}

function filterFavorites(items) {
  return items.filter(function(item) { return item.liked; });
}

function sortImages(items, criteria) {
  var sorted = items.slice();
  switch (criteria) {
    case 'newest':
      return sorted.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
    case 'oldest':
      return sorted.sort(function(a, b) { return new Date(a.date) - new Date(b.date); });
    case 'az':
      return sorted.sort(function(a, b) { return a.prompt.toLowerCase().localeCompare(b.prompt.toLowerCase()); });
    case 'za':
      return sorted.sort(function(a, b) { return b.prompt.toLowerCase().localeCompare(a.prompt.toLowerCase()); });
    default: return sorted;
  }
}

function paginate(items, page, perPage) {
  var start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

function getTotalPages(total, perPage) {
  return Math.ceil(total / perPage);
}
