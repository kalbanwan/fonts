const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors({ origin: '*' }));

function setFontHeaders(res, filePath) {
  if (filePath && filePath.endsWith('.ttf')) res.setHeader('Content-Type', 'font/ttf');
  res.setHeader('Access-Control-Allow-Origin', '*');
}

app.use('/KFGQPC', express.static(path.join(__dirname, '..', 'KFGQPC'), { setHeaders: setFontHeaders }));

app.get('/:name/*', (req, res) => {
  const name = req.params.name;
  const rel = req.params[0];
  const candidates = [
    path.join(__dirname, name, rel),               // public/name/...
    path.join(__dirname, '..', name, rel),        // repo-root/name/...
    path.join(__dirname, 'oun', rel),              // public/oun/...
    path.join(__dirname, '..', 'oun', rel)         // repo-root/oun/...
  ];
  for (const p of candidates) {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
      setFontHeaders(res, p);
      return res.sendFile(p);
    }
  }
  return res.status(404).send('Not found');
});

app.use(express.static(path.join(__dirname)));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
