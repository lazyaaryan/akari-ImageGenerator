var styleMap = {
  'Realistic':    ', ultra realistic, 8K, photographic, detailed',
  'Anime':        ', anime style, studio ghibli, vibrant colors, detailed anime art',
  'Cartoon':      ', cartoon style, colorful, playful, cel-shaded',
  'Oil Painting': ', oil painting, classical art, brush strokes, canvas texture',
  'Cyberpunk':    ', cyberpunk style, neon lights, futuristic, sci-fi, dark atmosphere',
  'Watercolor':   ', watercolor painting, soft washes, delicate, artistic'
};

function generateImage(prompt, style) {
  var fullPrompt = prompt.trim() + (styleMap[style] || '');

  return fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: fullPrompt })
  })
  .then(function(res) {
    if (!res.ok) {
      return res.json().then(function(err) {
        throw new Error(err.error || 'API failed (' + res.status + ')');
      }).catch(function(e) {
        if (e.message.includes('API failed')) throw e;
        throw new Error('API failed with status ' + res.status);
      });
    }
    return res.blob();
  })
  .then(function(blob) {
    if (!blob || blob.size === 0) throw new Error('Empty response from API');
    return { blob: blob, url: URL.createObjectURL(blob) };
  });
}
