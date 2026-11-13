// Grundeinstellungen der Website.
// siteUrl + base bestimmen alle Links. Beispiele:
//   GitHub Pages Projekt-Repo "novark":   siteUrl 'https://<github-name>.github.io', base '/novark/'
//   Eigene Domain (z. B. novark.app):      siteUrl 'https://novark.app',              base '/'
// Beides kann beim Bauen per Umgebungsvariable überschrieben werden (SITE_URL, BASE).
export default {
  siteUrl: process.env.SITE_URL || 'https://tonettare-maker.github.io',
  base: process.env.BASE || '/novark/',
  // Eigene Domain eintragen (z. B. 'novark.app'), dann wird eine CNAME-Datei erzeugt.
  cname: process.env.CNAME || '',
  email: 'novark.app@gmail.com',
  // Postanschrift – erscheint NUR im Impressum (gesetzliche Pflicht nach § 5 DDG).
  // Später durch eine Impressum-Service-Adresse ersetzen, wenn gewünscht.
  address: [],
  defaultLang: 'de',
};
