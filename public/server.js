const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors({ origin: '*' }));

function setFontHeaders(res, filePath) {
  if (filePath && filePath.endsWith('.ttf')) {
    res.setHeader('Content-Type', 'font/ttf');
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
}

// KFGQPC fonts
app.use(
  '/KFGQPC',
  express.static(path.join(__dirname, '..', 'KFGQPC'), {
    setHeaders: setFontHeaders
  })
);

// OUN fonts
app.use(
  '/oun',
  express.static(path.join(__dirname, 'oun'), {
    setHeaders: setFontHeaders
  })
);

app.use(
  '/oun',
  express.static(path.join(__dirname, '..', 'oun'), {
    setHeaders: setFontHeaders
  })
);

// Decothulth fonts
app.use(
  '/decothulth',
  express.static(path.join(__dirname, 'decothulth'), {
    setHeaders: setFontHeaders
  })
);

app.use(
  '/decothulth',
  express.static(path.join(__dirname, '..', 'decothulth'), {
    setHeaders: setFontHeaders
  })
);

// Dynamic route: /{name}/{filepath...}
app.get('/:name/*', (req, res) => {
  const name = req.params.name;
  const rel = req.params[0];

  const candidates = [
    // current directory/name/...
    path.join(__dirname, name, rel),

    // parent directory/name/...
    path.join(__dirname, '..', name, rel),

    // current directory/oun/...
    path.join(__dirname, 'oun', rel),

    // parent directory/oun/...
    path.join(__dirname, '..', 'oun', rel),

    // current directory/decothulth/...
    path.join(__dirname, 'decothulth', rel),

    // parent directory/decothulth/...
    path.join(__dirname, '..', 'decothulth', rel)
  ];

  for (const p of candidates) {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
      setFontHeaders(res, p);
      return res.sendFile(p);
    }
  }

  return res.status(404).send('Not found');
});

// Serve files from the current directory
app.use(express.static(path.join(__dirname)));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});