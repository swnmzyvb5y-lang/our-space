export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { system, messages } = req.body;
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        system: system,
        messages: messages
      })
    });
    
    const data = await response.json();
    const reply = data.content && data.content[0] ? data.content[0].text : '在呢。';
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ reply: '网络有点问题，稍等宁宁。' });
  }
}
