const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: '*' }));

function setFontHeaders(res, filePath) {
  if (filePath.endsWith('.ttf')) res.setHeader('Content-Type', 'font/ttf');
  res.setHeader('Access-Control-Allow-Origin', '*');
}

// Serve at /fonts from repo-root 'oun' and public/oun
app.use('/fonts', express.static(path.join(__dirname, 'oun'), { setHeaders: setFontHeaders }));
app.use('/fonts', express.static(path.join(__dirname, 'public', 'oun'), { setHeaders: setFontHeaders }));

// Serve at /oun as requested
app.use('/oun', express.static(path.join(__dirname, 'oun'), { setHeaders: setFontHeaders }));
app.use('/oun', express.static(path.join(__dirname, 'public', 'oun'), { setHeaders: setFontHeaders }));

// Keep existing KFGQPC mapping
app.use('/KFGQPC', express.static(path.join(__dirname, 'KFGQPC'), { setHeaders: setFontHeaders }));

// Serve repository root static files
app.use(express.static(path.join(__dirname)));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
