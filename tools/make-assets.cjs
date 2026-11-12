// Einmalig/bei Bedarf: erzeugt Favicons, OG-Bild und optimierte Screenshots.
// Benötigt "sharp":  NODE_PATH=<pfad>/node_modules node tools/make-assets.cjs
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'src', 'assets');
const logo = fs.readFileSync(path.join(root, 'novark.svg'));

(async () => {
  for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
    await sharp(logo, { density: 300 }).resize(size, size).png().toFile(path.join(root, name));
  }

  // Logo-Pfade (ohne <svg>-Hülle) für das OG-Bild wiederverwenden
  const inner = logo.toString().replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a1640"/><stop offset="1" stop-color="#0b0a18"/></linearGradient>
    <linearGradient id="ln" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5eead4"/><stop offset=".5" stop-color="#38bdf8"/><stop offset="1" stop-color="#6366f1"/></linearGradient>
    <radialGradient id="glow" cx=".78" cy=".2" r=".6"><stop offset="0" stop-color="#6366f1" stop-opacity=".35"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g opacity=".10" stroke="#38bdf8" stroke-width="3" fill="none">
    <path d="M900 600 L1000 470 L1100 600"/><path d="M900 520 L1000 390 L1100 520"/><path d="M900 440 L1000 310 L1100 440"/>
  </g>
  <svg x="96" y="175" width="280" height="280" viewBox="0 0 512 512">${inner}</svg>
  <text x="430" y="300" font-family="Outfit, Segoe UI, Arial, sans-serif" font-weight="800" font-size="96" letter-spacing="15" fill="#ffffff">NOVARK</text>
  <rect x="434" y="330" width="120" height="6" rx="3" fill="url(#ln)"/>
  <text x="432" y="400" font-family="Segoe UI, Arial, sans-serif" font-size="36" fill="#c7d2fe">Apps, die den Alltag leichter machen.</text>
</svg>`;
  await sharp(Buffer.from(og)).png().toFile(path.join(root, 'og-image.png'));

  // Screenshots verkleinern (1080x1920 -> 540 breit, WebP)
  const fk = path.join(root, 'apps', 'familykeep');
  for (const lang of ['de', 'en', 'sq']) {
    for (const f of ['1', '2', '3', '4']) {
      const src = path.join(fk, lang, f + '.png');
      if (fs.existsSync(src)) await sharp(src).resize({ width: 540 }).webp({ quality: 82 }).toFile(path.join(fk, lang, f + '.webp'));
    }
  }
  await sharp(path.join(fk, 'icon-512.png')).resize(256, 256).webp({ quality: 90 }).toFile(path.join(fk, 'icon-256.webp'));
  console.log('Assets erzeugt.');
})();
