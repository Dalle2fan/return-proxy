import fetch from 'node-fetch';

export default async function handler(req, res) {
  const targetURL = `https://return-policy.on.websim.ai${req.url}`;

  try {
    const response = await fetch(targetURL);
    const contentType = response.headers.get('content-type');
    const body = await response.buffer();

    res.setHeader('Content-Type', contentType || 'text/html');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(body);
  } catch (err) {
    res.status(500).send('Proxy error');
  }
}
