# Novark Website

Statische Website der Marke Novark (DE / EN / SQ). Kein Framework, keine Abhängigkeiten – nur Node.js.

## Lokal ansehen
```
node dev.mjs
```
→ http://localhost:4321

## Bauen
```
node build.mjs
```
Ergebnis liegt in `dist/`. Links richten sich nach `site.config.mjs` (`siteUrl`, `base`).

## Struktur
| Pfad | Inhalt |
|---|---|
| `src/data/apps.json` | Alle Apps (Name, Status, Texte, Funktionen, Screenshots) |
| `src/data/i18n.mjs` | Alle Website-Texte in DE / EN / SQ |
| `src/data/<app>-privacy.html` | Datenschutzerklärung der App (Kopie aus dem App-Projekt) |
| `src/assets/` | Logo, CSS, JS, Favicons, OG-Bild, App-Grafiken |
| `build.mjs` | Seitengenerator |
| `tools/make-assets.cjs` | Erzeugt Favicons, OG-Bild und WebP-Screenshots (braucht `sharp`) |

## 1. Neue App hinzufügen
1. In `src/data/apps.json` einen neuen Eintrag anlegen (FamilyKeep als Vorlage kopieren).
   - `status`: `soon` = „Bald verfügbar“, `testing` = „Im Test“ (zeigt „Tester gesucht“), `live` = „Bei Google Play“ (aktiviert den Play-Button).
2. Grafiken ablegen: `src/assets/apps/<id>/icon-256.webp` und `src/assets/apps/<id>/<de|en|sq>/1.webp … 4.webp`.
   Am einfachsten PNGs dort ablegen und `tools/make-assets.cjs` anpassen/ausführen.
3. Datenschutzerklärung der App als `src/data/<id>-privacy.html` ablegen (gleiches Format wie bei FamilyKeep: Blöcke `<div data-lang="de|en|sq">`).
4. `node build.mjs` – fertig. Es entstehen automatisch App-Seite, „Konto löschen“-Seite und Datenschutzseite in allen 3 Sprachen.

**Wenn FamilyKeep live geht:** in `apps.json` `"status": "live"` setzen und neu veröffentlichen.

**Datenschutzerklärung ändern:** im App-Projekt `public/privacy.html` ändern und nach `src/data/familykeep-privacy.html` kopieren.

## 2. Auf GitHub Pages veröffentlichen
1. Auf GitHub ein neues Repository **`novark`** anlegen (öffentlich).
2. Diesen Ordner hochladen (ohne `dist/`, steht in `.gitignore`).
3. Im Repo: *Settings → Pages → Source: „GitHub Actions“*.
4. Bei jedem Push auf `main` baut `.github/workflows/deploy.yml` die Seite neu.
5. Adresse: `https://<github-name>.github.io/novark/` – passt zu `site.config.mjs`. Bei anderem Repo-Namen `base` anpassen.

## 3. Eigene Domain (z. B. novark.app oder novark.de)
1. Domain kaufen (ca. 10–20 €/Jahr).
2. In `site.config.mjs`: `siteUrl: 'https://novark.app'`, `base: '/'`, `cname: 'novark.app'`.
3. Beim Domain-Anbieter DNS eintragen: 4× `A`-Record auf `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` und `CNAME www` → `<github-name>.github.io`.
4. Im Repo unter *Settings → Pages → Custom domain* die Domain eintragen und „Enforce HTTPS“ aktivieren.
5. Danach in der Play Console unter *Store settings → Website* die Adresse eintragen.

## Hinweise
- Keine Cookies, kein Tracking. Nur Schriftarten werden von Google Fonts geladen (in der Datenschutzseite erwähnt).
- Das Impressum übernimmt Name und Adresse automatisch aus der FamilyKeep-Datenschutzerklärung.
- `/.well-known/assetlinks.json` ist vorbereitet (leer) für spätere Android App Links.
