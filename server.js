const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: '*' }));

// Serve files from 'oun' at /fonts
const ounDir = path.join(__dirname, 'oun');
app.use('/fonts', express.static(ounDir, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.ttf')) res.setHeader('Content-Type', 'font/ttf');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

// Serve KFGQPC folder at /KFGQPC so existing URLs keep working
const kfgDir = path.join(__dirname, 'KFGQPC');
app.use('/KFGQPC', express.static(kfgDir, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.ttf')) res.setHeader('Content-Type', 'font/ttf');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

app.get('/', (req, res) => res.send('Fonts server is running'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
