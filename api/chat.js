 export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { system, messages } = req.body;
  
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.ANTHROPIC_API_KEY
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 400,
        messages: [
          { role: 'system', content: system },
          ...messages
        ]
      })
    });
    
    const data = await response.json();
    const reply = data.choices && data.choices[0] ? data.choices[0].message.content : '在呢。';
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ reply: '网络有点问题，稍等宁宁。' });
  }
}
