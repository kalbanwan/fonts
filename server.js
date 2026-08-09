const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: '*' }));

// server.js lives inside public/, fonts are in public/oun
const fontsDir = path.join(__dirname, 'oun');

app.use('/fonts', express.static(fontsDir, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.ttf')) res.setHeader('Content-Type', 'font/ttf');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

app.get('/', (req, res) => res.send('Fonts server is running'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
