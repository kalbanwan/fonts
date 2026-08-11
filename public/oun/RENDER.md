Render deployment steps (package.json & server.js are in public/)

1) Ensure package.json, server.js and the public/oun/ fonts are committed in the repo under the `public/` directory.

2) In Render Web Service create flow:
   - Branch: main
   - Root Directory: public
   - Build Command: npm install
   - Start Command: npm start

3) Deploy. The fonts will be available at:
   https://<your-render>.onrender.com/fonts/<filename>.ttf

CSS example:
@font-face {
  font-family: 'DiabOrient-Bold';
  src: url('https://<your-render>.onrender.com/fonts/bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

Use preload:
<link rel="preload" href="https://<your-render>.onrender.com/fonts/bold.ttf" as="font" type="font/ttf" crossorigin>
