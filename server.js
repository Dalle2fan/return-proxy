import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

const TARGET = 'https://return-policy.on.websim.ai'; 

app.use(async (req, res) => {
  const targetURL = `${TARGET}${req.originalUrl}`;

  try {
    const response = await fetch(targetURL);
    const contentType = response.headers.get('content-type');
    const body = await response.buffer();

    // Pass through headers, but override X-Frame-Options
    res.setHeader('Content-Type', contentType || 'text/html');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send('Proxy error');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});
