export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true`;

  const response = await fetch(imageUrl);

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Image generation failed' });
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.setHeader('Content-Type', 'image/jpeg');
  res.send(buffer);
}
