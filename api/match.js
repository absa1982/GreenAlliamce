// api/match.js - This runs on Vercel server
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Your Google Apps Script URL - CORRECT VERSION
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwcM3qv89YL0kh0ub9RlQ61B512bnitx0SbaUrrMYX2hXpG8s8GeQDDPfpy5UC0V7rFnA/exec';

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to connect to matching service'
    });
  }
}