// Statischer Seitengenerator für die Novark-Website (keine Abhängigkeiten).
//   node build.mjs            -> dist/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cfg from './site.config.mjs';
import { LANGS, LANG_NAMES, T } from './src/data/i18n.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'dist');
const APPS = JSON.parse(fs.readFileSync(path.join(SRC, 'data', 'apps.json'), 'utf8'));
const BASE = cfg.base.endsWith('/') ? cfg.base : cfg.base + '/';
const SITE = cfg.siteUrl.replace(/\/$/, '');
const VERSION = Date.now().toString(36);

const u = (p = '') => BASE + p.replace(/^\//, '');
const abs = (p = '') => SITE + u(p);
const fill = (s, app) => s.replaceAll('{app}', app?.name ?? '');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const mailto = (subject) => `mailto:${cfg.email}${subject ? '?subject=' + encodeURIComponent(subject) : ''}`;

// ---------------------------------------------------------------- Icons
const I = {
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
  home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  up: '<path d="M6 15l6-6 6 6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  left: '<path d="M15 6l-6 6 6 6"/>',
  right: '<path d="M9 6l6 6-6 6"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
  play: '<path d="M7 4.5v15a1 1 0 001.5.9l12-7.5a1 1 0 000-1.8l-12-7.5A1 1 0 007 4.5z"/>',
};
const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;
const playIcon = `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${I.play}</svg>`;

const LOGO_SVG = fs.readFileSync(path.join(SRC, 'assets', 'novark.svg'), 'utf8')
  .replace(/<\?xml[^>]*>/, '').replace(/<!--[\s\S]*?-->/g, '')
  .replace(/\swidth="512" height="512"/, '');
let logoN = 0;
const logo = (size = 36) => {
  // eindeutige IDs je Einbettung, damit Gradients nicht kollidieren
  const k = 'l' + (++logoN);
  return LOGO_SVG.replace('<svg', `<svg class="logo-mark" width="${size}" height="${size}" role="img" aria-label="Novark"`)
    .replace(/id="(nv\w+)"/g, `id="$1${k}"`).replace(/url\(#(nv\w+)\)/g, `url(#$1${k})`);
};

// ---------------------------------------------------------------- Privacy-Texte der Apps
function loadPrivacy(app) {
  const html = fs.readFileSync(path.join(SRC, 'data', app.privacySource), 'utf8');
  const k = {};
  for (const key of ['name', 'adresse', 'email', 'datum']) {
    const m = html.match(new RegExp(key + ":\\s*'([^']*)'"));
    k[key] = m ? m[1] : '';
  }
  const out = {};
  for (const l of LANGS) {
    const start = html.indexOf(`<div data-lang="${l}">`);
    if (start < 0) continue;
    const rest = html.slice(start);
    const endCandidates = [rest.indexOf('<!-- ====', 10), rest.indexOf('</article>')].filter((i) => i > 0);
    let block = rest.slice(rest.indexOf('>') + 1, Math.min(...endCandidates));
    block = block.replace(/<\/div>\s*$/, '');
    block = block
      .replace(/<span class="k-name"><\/span>/g, esc(k.name))
      .replace(/<span class="k-adresse"><\/span>/g, esc(k.adresse))
      .replace(/<span class="k-datum"><\/span>/g, esc(k.datum))
      .replace(/<a class="k-mail"><\/a>/g, `<a href="mailto:${esc(k.email)}">${esc(k.email)}</a>`)
      .replace(/<h1>[^<]*<\/h1>/, '');
    out[l] = block.trim();
  }
  return { contact: k, langs: out };
}
const PRIVACY = Object.fromEntries(APPS.map((a) => [a.id, loadPrivacy(a)]));
const CONTACT = PRIVACY[APPS[0].id].contact;

// ---------------------------------------------------------------- Layout
function layout({ lang, route, title, desc, body, pageClass = '', noindex = false }) {
  const t = T[lang];
  const url = (l) => `${l}/${route}`;
  const navItem = (r, label) => {
    const cur = route === r || (r && route.startsWith(r));
    return `<a href="${u(`${lang}/${r}`)}"${cur ? ' aria-current="page"' : ''}>${label}</a>`;
  };
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(url(l))}">`).join('\n  ') +
    `\n  <link rel="alternate" hreflang="x-default" href="${abs(url(cfg.defaultLang))}">`;
  const fullTitle = title.includes('Novark') ? title : `${title} · Novark`;

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(desc)}">
  ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${abs(url(lang))}">\n  ${alternates}`}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Novark">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${abs(url(lang))}">
  <meta property="og:image" content="${abs('assets/og-image.png')}">
  <meta property="og:locale" content="${{ de: 'de_DE', en: 'en_US', sq: 'sq_AL' }[lang]}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#f8f7ff" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0f0d1f" media="(prefers-color-scheme: dark)">
  <link rel="icon" href="${u('assets/novark.svg')}" type="image/svg+xml">
  <link rel="icon" href="${u('assets/favicon-32.png')}" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="${u('assets/apple-touch-icon.png')}">
  <link rel="manifest" href="${u('manifest.webmanifest')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700;800&display=swap">
  <link rel="stylesheet" href="${u('assets/style.css')}?v=${VERSION}">
  <script>try{var t=localStorage.getItem('nv-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
  <script defer src="${u('assets/main.js')}?v=${VERSION}"></script>
</head>
<body class="${pageClass}">
<a class="skip" href="#main">${t.skip}</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${u(lang + '/')}" aria-label="Novark – Home">${logo(36)}<span class="wordmark">NOVARK</span></a>
    <nav class="main-nav" id="main-nav" aria-label="Main">
      ${navItem('apps/', t.nav.apps)}
      ${navItem('about/', t.nav.about)}
      ${navItem('support/', t.nav.support)}
    </nav>
    <div class="header-tools">
      <div class="lang-menu">
        <button class="icon-btn lang-btn" aria-haspopup="true" aria-expanded="false" aria-label="${t.language}">${icon('globe')}<span>${lang.toUpperCase()}</span></button>
        <ul class="lang-list" role="menu">
          ${LANGS.map((l) => `<li role="none"><a role="menuitem" data-lang="${l}" hreflang="${l}" lang="${l}" href="${u(url(l))}"${l === lang ? ' aria-current="true"' : ''}>${LANG_NAMES[l]}</a></li>`).join('')}
        </ul>
      </div>
      <button class="icon-btn theme-btn" aria-label="${t.theme}" title="${t.theme}">${icon('sun', 'i-sun')}${icon('moon', 'i-moon')}</button>
      <button class="icon-btn menu-btn" aria-controls="main-nav" aria-expanded="false" aria-label="Menu">${icon('menu')}</button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-inner">
    <div class="footer-brand">
      <a class="brand" href="${u(lang + '/')}">${logo(32)}<span class="wordmark">NOVARK</span></a>
      <p>${t.footerTag}</p>
      <p class="pill-note">${icon('lock')} ${t.footerNote}</p>
    </div>
    <nav class="footer-nav" aria-label="Footer">
      <a href="${u(lang + '/apps/')}">${t.nav.apps}</a>
      <a href="${u(lang + '/about/')}">${t.nav.about}</a>
      <a href="${u(lang + '/support/')}">${t.nav.support}</a>
      <a href="${u(lang + '/privacy/')}">${t.nav.privacy}</a>
      <a href="${u(lang + '/impressum/')}">${t.nav.impressum}</a>
    </nav>
  </div>
  <div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} Novark</span><a href="${mailto()}">${cfg.email}</a></div>
</footer>
</body>
</html>
`;
}

// ---------------------------------------------------------------- Bausteine
const chevrons = `<div class="chevrons" aria-hidden="true"><span></span><span></span><span></span></div>`;
const divider = `<div class="divider" aria-hidden="true">${icon('up')}</div>`;
const statusBadge = (lang, s) => `<span class="badge badge-${s}">${T[lang].status[s]}</span>`;

function appCard(lang, app, big = false) {
  const t = T[lang];
  return `<article class="app-card${big ? ' app-card-big' : ''}" style="--accent:${app.accent}">
  <img class="app-icon" src="${u(app.icon)}" alt="" width="${big ? 96 : 72}" height="${big ? 96 : 72}" loading="lazy">
  <div class="app-card-body">
    <div class="app-card-head"><h3>${app.name}</h3>${statusBadge(lang, app.status)}</div>
    <p>${app.tagline[lang]}</p>
    ${big ? `<p class="muted">${app.description[lang]}</p>` : ''}
    <a class="link-arrow" href="${u(`${lang}/apps/${app.id}/`)}">${t.more} <span class="sr-only">– ${app.name}</span>${icon('arrow')}</a>
  </div>
</article>`;
}

function pageHead(title, lead, eyebrow = '') {
  return `<section class="page-head"><div class="wrap">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div>${chevrons}</section>`;
}

// ---------------------------------------------------------------- Seiten
const pages = [];
const add = (lang, route, opts) => pages.push({ lang, route, ...opts });

for (const lang of LANGS) {
  const t = T[lang];
  const featured = APPS[0];

  // Home
  add(lang, '', {
    title: t.home.title, desc: t.home.desc, pageClass: 'home',
    body: `
<section class="hero">
  <div class="hero-bg" aria-hidden="true">
    <div class="glow g1"></div><div class="glow g2"></div>
    <svg class="rise" viewBox="0 0 400 600" preserveAspectRatio="xMidYMax slice">
      <defs><linearGradient id="riseG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#6366f1" stop-opacity="0"/><stop offset=".6" stop-color="#38bdf8" stop-opacity=".55"/><stop offset="1" stop-color="#5eead4"/></linearGradient></defs>
      <g fill="none" stroke="url(#riseG)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path class="r r1" d="M120 620 L200 540 L280 620"/>
        <path class="r r2" d="M120 620 L200 540 L280 620"/>
        <path class="r r3" d="M120 620 L200 540 L280 620"/>
        <path class="r r4" d="M120 620 L200 540 L280 620"/>
      </g>
    </svg>
  </div>
  <div class="wrap hero-inner">
    <div class="hero-text">
      <p class="eyebrow">${t.home.eyebrow}</p>
      <h1>${t.home.h1a} <span class="grad">${t.home.h1b}</span></h1>
      <p class="lead">${t.home.lead}</p>
      <div class="actions">
        <a class="btn btn-primary" href="${u(lang + '/apps/')}">${t.home.cta}${icon('arrow')}</a>
        <a class="btn btn-ghost" href="${u(lang + '/about/')}">${t.home.cta2}</a>
      </div>
    </div>
    <div class="hero-mark" aria-hidden="true">${logo(260)}</div>
  </div>
</section>
${divider}
<section class="section">
  <div class="wrap">
    <h2 class="section-title">${t.home.valuesTitle}</h2>
    <div class="values">
      ${t.home.values.map(([ic, h, p]) => `<div class="value"><div class="value-ic">${icon(ic)}</div><h3>${h}</h3><p>${p}</p></div>`).join('')}
    </div>
  </div>
</section>
<section class="section section-alt">
  <div class="wrap">
    <p class="eyebrow">${t.home.featured}</p>
    <div class="featured" style="--accent:${featured.accent}">
      <div class="featured-text">
        <div class="featured-head"><img src="${u(featured.icon)}" alt="" width="64" height="64" loading="lazy"><div><h2>${featured.name}</h2>${statusBadge(lang, featured.status)}</div></div>
        <p class="lead">${featured.tagline[lang]}</p>
        <p class="muted">${featured.description[lang]}</p>
        <div class="actions">
          <a class="btn btn-primary" href="${u(`${lang}/apps/${featured.id}/`)}">${t.more}${icon('arrow')}</a>
          <a class="btn btn-ghost" href="${u(lang + '/apps/')}">${t.home.allApps}</a>
        </div>
      </div>
      <div class="featured-phones" aria-hidden="true">
        <img class="phone p-back" src="${u(`assets/apps/${featured.id}/${lang}/${featured.screenshots[2]}`)}" alt="" width="270" height="480" loading="lazy">
        <img class="phone p-front" src="${u(`assets/apps/${featured.id}/${lang}/${featured.screenshots[0]}`)}" alt="" width="270" height="480" loading="lazy">
      </div>
    </div>
  </div>
</section>`,
  });

  // Apps
  add(lang, 'apps/', {
    title: t.apps.title, desc: t.apps.desc,
    body: `${pageHead(t.apps.title, t.apps.lead)}
<section class="section"><div class="wrap">
  <div class="app-grid">
    ${APPS.map((a) => appCard(lang, a)).join('\n')}
    <article class="app-card app-card-next"><div class="app-icon placeholder">${icon('spark')}</div><div class="app-card-body"><div class="app-card-head"><h3>${t.apps.next}</h3>${statusBadge(lang, 'soon')}</div><p>${t.apps.nextText}</p></div></article>
  </div>
</div></section>`,
  });

  for (const app of APPS) {
    const live = app.status === 'live';
    const playUrl = `https://play.google.com/store/apps/details?id=${app.package}`;
    const playBtn = live
      ? `<a class="btn btn-play" href="${playUrl}" rel="noopener">${playIcon}<span><small>Google Play</small>${t.app.get}</span></a>`
      : `<span class="btn btn-play is-disabled" aria-disabled="true">${playIcon}<span><small>Google Play</small>${t.app.soonBtn}</span></span>`;

    add(lang, `apps/${app.id}/`, {
      title: `${app.name} – ${app.tagline[lang]}`, desc: app.description[lang], pageClass: 'app-page',
      body: `
<section class="app-hero" style="--accent:${app.accent}">
  <div class="wrap app-hero-inner">
    <img class="app-hero-icon" src="${u(app.icon)}" alt="${app.name}" width="120" height="120">
    <div>
      ${statusBadge(lang, app.status)}
      <h1>${app.name}</h1>
      <p class="lead">${app.tagline[lang]}</p>
      <div class="actions">${playBtn}</div>
    </div>
  </div>
  ${chevrons}
</section>
<section class="section"><div class="wrap narrow"><p class="intro">${app.description[lang]}</p></div></section>
${app.status === 'testing' ? `<section class="section tight"><div class="wrap"><div class="callout" style="--accent:${app.accent}"><div><h2>${t.app.testingTitle}</h2><p>${t.app.testingText}</p></div><a class="btn btn-primary" href="${app.testing ? u(`${lang}/apps/${app.id}/test/`) : mailto(fill(t.app.testingSubject, app))}">${t.app.testingBtn}${icon('arrow')}</a></div></div></section>` : ''}
<section class="section"><div class="wrap">
  <h2 class="section-title">${t.app.features}</h2>
  <ul class="features" style="--accent:${app.accent}">
    ${app.features[lang].map(([h, p]) => `<li>${icon('check')}<div><h3>${h}</h3><p>${p}</p></div></li>`).join('')}
  </ul>
</div></section>
<section class="section section-alt"><div class="wrap">
  <h2 class="section-title">${t.app.screens}</h2>
  <div class="carousel" data-carousel>
    <button class="icon-btn car-btn prev" aria-label="${t.app.prev}">${icon('left')}</button>
    <ul class="car-track" tabindex="0">
      ${app.screenshots.map((s, i) => `<li><img src="${u(`assets/apps/${app.id}/${lang}/${s}`)}" alt="${app.name} – ${t.app.shot} ${i + 1}" width="270" height="480" loading="lazy"></li>`).join('')}
    </ul>
    <button class="icon-btn car-btn next" aria-label="${t.app.next}">${icon('right')}</button>
  </div>
</div></section>
<section class="section"><div class="wrap">
  <h2 class="section-title">${t.app.legal}</h2>
  <div class="link-tiles">
    <a href="${u(`${lang}/privacy/${app.id}/`)}">${icon('lock')}<span>${t.app.privacy}</span></a>
    <a href="${u(`${lang}/apps/${app.id}/delete-account/`)}">${icon('trash')}<span>${t.app.del}</span></a>
    <a href="${u(`${lang}/support/`)}">${icon('mail')}<span>${t.app.support}</span></a>
  </div>
</div></section>`,
    });

    if (app.testing) {
      const tt = t.test;
      const links = [app.testing.group, app.testing.optin, `https://play.google.com/store/apps/details?id=${app.package}`];
      add(lang, `apps/${app.id}/test/`, {
        title: fill(tt.title, app), desc: fill(tt.desc, app), pageClass: 'test-page',
        body: `
<section class="app-hero" style="--accent:${app.accent}">
  <div class="wrap app-hero-inner">
    <img class="app-hero-icon" src="${u(app.icon)}" alt="${app.name}" width="120" height="120">
    <div>
      ${statusBadge(lang, app.status)}
      <h1>${fill(tt.title, app)}</h1>
      <p class="lead">${fill(tt.lead, app)}</p>
    </div>
  </div>
  ${chevrons}
</section>
<section class="section"><div class="wrap narrow">
  <div class="card need">
    <h2>${icon('check')} ${tt.needTitle}</h2>
    <ul class="checklist">${tt.need.map((n) => `<li>${icon('check')}<span>${n}</span></li>`).join('')}</ul>
  </div>
  <ol class="test-steps" style="--accent:${app.accent}">
    ${tt.steps.map(([h, p, btn], i) => `<li class="test-step">
      <span class="test-num" aria-hidden="true">${i + 1}</span>
      <div><h2>${h}</h2><p>${fill(p, app)}</p>
      <a class="btn ${i === 2 ? 'btn-play' : 'btn-primary'}" href="${links[i]}" target="_blank" rel="noopener">${i === 2 ? playIcon : ''}${btn}${i === 2 ? '' : icon('arrow')}</a></div>
    </li>`).join('')}
  </ol>
  <p class="hint">${tt.hint}</p>
  <div class="callout" style="--accent:${app.accent}"><div><h2>${tt.keepTitle}</h2><p>${tt.keep}</p></div></div>
  <p class="feedback">${tt.feedback} <a href="${mailto('Feedback ' + app.name)}">${cfg.email}</a></p>
  <p><a class="link-arrow back" href="${u(`${lang}/apps/${app.id}/`)}">${icon('left')} ${fill(t.del.back, app)}</a></p>
</div></section>`,
      });
    }

    add(lang, `apps/${app.id}/delete-account/`, {
      title: fill(t.del.title, app), desc: fill(t.del.desc, app),
      body: `${pageHead(fill(t.del.title, app), t.del.lead)}
<section class="section"><div class="wrap narrow prose">
  <div class="card">
    <h2>${icon('trash')} ${t.del.inApp}</h2>
    <ol class="steps">${t.del.steps.map((s) => `<li>${fill(s, app)}</li>`).join('')}</ol>
    <p class="muted">${t.del.inAppNote}</p>
  </div>
  <div class="card">
    <h2>${icon('mail')} ${t.del.byMail}</h2>
    <p>${t.del.byMailText}</p>
    <p><a class="btn btn-ghost" href="${mailto(fill(t.del.mailSubject, app))}">${t.del.mailBtn}</a></p>
  </div>
  <p class="muted">${t.del.partial}</p>
  <p><a class="link-arrow back" href="${u(`${lang}/apps/${app.id}/`)}">${icon('left')} ${fill(t.del.back, app)}</a></p>
</div></section>`,
    });

    add(lang, `privacy/${app.id}/`, {
      title: fill(t.appPrivacy.title, app), desc: fill(t.appPrivacy.desc, app),
      body: `${pageHead(t.app.privacy, '', app.name)}
<section class="section"><div class="wrap narrow prose policy">${PRIVACY[app.id].langs[lang] || PRIVACY[app.id].langs.en}</div></section>`,
    });
  }

  // Privacy (Übersicht)
  add(lang, 'privacy/', {
    title: t.privacy.title, desc: t.privacy.desc,
    body: `${pageHead(t.privacy.title, t.privacy.lead)}
<section class="section"><div class="wrap narrow prose">
  <h2>${t.privacy.principles}</h2>
  <ul class="checklist">${t.privacy.principlesList.map((p) => `<li>${icon('check')}<span>${p}</span></li>`).join('')}</ul>
  <h2>${t.privacy.perApp}</h2>
  <div class="link-tiles">${APPS.map((a) => `<a href="${u(`${lang}/privacy/${a.id}/`)}"><img src="${u(a.icon)}" alt="" width="32" height="32"><span>${a.name}</span></a>`).join('')}</div>
  <h2>${t.privacy.site}</h2>
  <p>${t.privacy.siteText}</p>
  <h2>${t.privacy.contact}</h2>
  <p><a href="${mailto()}">${cfg.email}</a></p>
</div></section>`,
  });

  // About
  add(lang, 'about/', {
    title: t.about.title, desc: t.about.desc,
    body: `${pageHead(t.about.title, t.about.lead)}
<section class="section"><div class="wrap about">
  <div class="prose">${t.about.p.map((p) => `<p>${p}</p>`).join('')}</div>
  <aside class="about-side">
    <div class="about-logo">${logo(140)}</div>
    <dl class="facts">${t.about.facts.map(([n, l]) => `<div><dt>${n}</dt><dd>${l}</dd></div>`).join('')}</dl>
  </aside>
</div></section>`,
  });

  // Support
  add(lang, 'support/', {
    title: t.support.title, desc: t.support.desc,
    body: `${pageHead(t.support.title, t.support.lead)}
<section class="section"><div class="wrap narrow">
  <a class="mail-card" href="${mailto()}">${icon('mail')}<span><small>${t.support.mail}</small>${cfg.email}</span>${icon('arrow')}</a>
  <h2 class="section-title">${t.support.faq}</h2>
  <div class="faq">${t.support.faqs.map(([q, a]) => `<details><summary>${q}${icon('right')}</summary><p>${a}</p></details>`).join('')}</div>
</div></section>`,
  });

  // Impressum
  add(lang, 'impressum/', {
    title: t.impressum.title, desc: t.impressum.desc,
    body: `${pageHead(t.impressum.title)}
<section class="section"><div class="wrap narrow prose">
  <h2>${t.impressum.heading}</h2>
  <p>${esc(CONTACT.name)}<br>${esc(CONTACT.adresse).replace(', ', '<br>').replace(/, (?=[^,]*$)/, '<br>')}</p>
  <h2>${t.impressum.contact}</h2>
  <p>E-Mail: <a href="${mailto()}">${cfg.email}</a></p>
  <h2>${t.impressum.resp}</h2>
  <p>${esc(CONTACT.name)}</p>
  <p class="muted">${t.impressum.note}</p>
</div></section>`,
  });
}

// ---------------------------------------------------------------- Ausgabe
fs.rmSync(OUT, { recursive: true, force: true });
const write = (rel, content) => {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
};

for (const p of pages) write(path.join(p.lang, p.route, 'index.html'), layout(p));

// Assets kopieren (Originale behalten)
fs.cpSync(path.join(SRC, 'assets'), path.join(OUT, 'assets'), { recursive: true });

// Startseite: Sprache wählen und weiterleiten
write('index.html', `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Novark</title>
<meta name="description" content="${esc(T.de.home.desc)}">
<link rel="canonical" href="${abs(cfg.defaultLang + '/')}">
${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(l + '/')}">`).join('\n')}
<link rel="icon" href="${u('assets/novark.svg')}" type="image/svg+xml">
<meta property="og:image" content="${abs('assets/og-image.png')}">
<script>
(function(){var L=${JSON.stringify(LANGS)},l=null;try{l=localStorage.getItem('nv-lang')}catch(e){}
if(L.indexOf(l)<0){var n=(navigator.languages||[navigator.language||'']);for(var i=0;i<n.length&&L.indexOf(l)<0;i++){l=String(n[i]).slice(0,2).toLowerCase()}}
if(L.indexOf(l)<0)l='${cfg.defaultLang}';location.replace('${BASE}'+l+'/'+location.hash)})();
</script>
<style>body{font-family:system-ui,sans-serif;background:#0f0d1f;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0}a{color:#5eead4;margin:0 .5em}</style>
</head><body><noscript>${LANGS.map((l) => `<a href="${u(l + '/')}">${LANG_NAMES[l]}</a>`).join('')}</noscript></body></html>
`);

// 404 (GitHub Pages liefert /404.html für unbekannte Pfade)
{
  const lang = cfg.defaultLang;
  let html = layout({
    lang, route: '', noindex: true, title: T[lang].notFound.title, desc: T[lang].notFound.text, pageClass: 'not-found',
    body: `<section class="nf"><div class="wrap">
  <div class="nf-code" aria-hidden="true">4${logo(110)}4</div>
  ${LANGS.map((l) => `<div class="nf-lang" data-nf="${l}"${l === lang ? '' : ' hidden'} lang="${l}"><h1>${T[l].notFound.title}</h1><p>${T[l].notFound.text}</p>
  <div class="actions"><a class="btn btn-primary" href="${u(l + '/')}">${T[l].notFound.home}${icon('arrow')}</a><a class="btn btn-ghost" href="${u(l + '/apps/')}">${T[l].nav.apps}</a><a class="btn btn-ghost" href="${u(l + '/support/')}">${T[l].nav.support}</a></div></div>`).join('')}
</div></section>`,
  });
  write('404.html', html);
}

// sitemap / robots / manifest / well-known
const urls = pages.map((p) => `  <url><loc>${abs(`${p.lang}/${p.route}`)}</loc>${LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(`${l}/${p.route}`)}"/>`).join('')}</url>`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${abs('sitemap.xml')}\n`);
write('manifest.webmanifest', JSON.stringify({
  name: 'Novark', short_name: 'Novark', start_url: BASE, scope: BASE, display: 'standalone',
  background_color: '#0f0d1f', theme_color: '#262153',
  icons: [
    { src: u('assets/icon-192.png'), sizes: '192x192', type: 'image/png' },
    { src: u('assets/icon-512.png'), sizes: '512x512', type: 'image/png' },
  ],
}, null, 2));
write('.well-known/assetlinks.json', '[]\n');
write('.nojekyll', '');
if (cfg.cname) write('CNAME', cfg.cname + '\n');

console.log(`✓ ${pages.length} Seiten + index/404 -> dist/  (base ${BASE})`);
