import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://return-policy.on.websim.ai/');
    let html = await response.text();

    // Optional: sanitize or modify content here if needed
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(html);
  } catch (err) {
    res.status(500).send('Error fetching original page');
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
