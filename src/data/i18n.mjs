// Alle Texte der Website in DE / EN / SQ.
export const LANGS = ['de', 'en', 'sq'];
export const LANG_NAMES = { de: 'Deutsch', en: 'English', sq: 'Shqip' };

export const T = {
  de: {
    skip: 'Zum Inhalt springen',
    nav: { apps: 'Apps', about: 'Über uns', support: 'Support', privacy: 'Datenschutz', impressum: 'Impressum' },
    theme: 'Hell/Dunkel umschalten',
    language: 'Sprache',
    footerTag: 'Apps, die den Alltag leichter machen.',
    footerNote: 'Keine Cookies. Kein Tracking.',
    status: { soon: 'Bald verfügbar', testing: 'Im Test', live: 'Bei Google Play' },
    more: 'Mehr erfahren',
    home: {
      title: 'Novark – Apps, die den Alltag leichter machen',
      desc: 'Novark ist ein unabhängiges App-Studio. Wir entwickeln schlanke Android-Apps für Familien – ohne Werbung, ohne Tracking.',
      eyebrow: 'Unabhängiges App-Studio',
      h1a: 'Apps, die den Alltag', h1b: 'leichter machen.',
      lead: 'Novark entwickelt schlanke Android-Apps für Familien – ohne Werbung, ohne Tracking, mit Fokus auf das Wesentliche.',
      cta: 'Unsere Apps', cta2: 'Über Novark',
      valuesTitle: 'Wofür wir stehen',
      values: [
        ['shield', 'Privatsphäre zuerst', 'Keine Werbung, keine Tracker, kein Verkauf von Daten. Was du einträgst, gehört dir.'],
        ['spark', 'Einfach & klar', 'Jede App löst ein Problem – und zwar gründlich. Ohne Menü-Labyrinth und ohne Ablenkung.'],
        ['home', 'Für Familien gemacht', 'Gedacht für echte Alltage: geteilte Konten, verlässliche Erinnerungen, mehrere Sprachen.']
      ],
      featured: 'Neu von Novark',
      allApps: 'Alle Apps ansehen'
    },
    apps: {
      title: 'Unsere Apps', desc: 'Alle Apps von Novark für Android.',
      lead: 'Jede Novark-App ist klein, fokussiert und respektiert deine Privatsphäre. Weitere Apps sind in Arbeit.',
      next: 'Die nächste App', nextText: 'Wir arbeiten bereits an weiteren Ideen. Schau bald wieder vorbei.'
    },
    app: {
      features: 'Was die App kann', screens: 'Einblicke', get: 'Jetzt bei Google Play',
      soonBtn: 'Bald bei Google Play',
      testingTitle: 'Tester gesucht!',
      testingText: 'Die App ist im geschlossenen Test. Du hast ein Android-Handy und möchtest sie vorab ausprobieren? Schreib uns deine Gmail-Adresse – du bekommst dann den Link zum Installieren.',
      testingBtn: 'Tester werden', testingSubject: 'Tester für {app}',
      legal: 'Rechtliches', privacy: 'Datenschutzerklärung', del: 'Konto löschen', support: 'Support',
      prev: 'Vorheriges Bild', next: 'Nächstes Bild', shot: 'Screenshot'
    },
    del: {
      title: '{app}: Konto und Daten löschen',
      desc: 'So löschst du dein {app}-Konto und alle zugehörigen Daten.',
      lead: 'Du kannst dein Konto und alle Daten jederzeit selbst löschen. Die Löschung ist endgültig.',
      inApp: 'In der App (sofort)',
      steps: ['Öffne {app} und melde dich an.', 'Gehe zu <b>Einstellungen → Konto & Synchronisierung</b>.', 'Tippe auf <b>„Konto und alle Daten löschen“</b> und bestätige.'],
      inAppNote: 'Konto, Einträge, Fotos und Familienmitglieder werden sofort von unseren Servern entfernt.',
      byMail: 'Per E-Mail (innerhalb von 30 Tagen)',
      byMailText: 'Kein Zugriff mehr auf die App? Schreib uns von der E-Mail-Adresse deines Kontos. Wir löschen dein Konto und alle Daten innerhalb von 30 Tagen und bestätigen es dir.',
      mailBtn: 'Löschung per E-Mail anfordern', mailSubject: 'Kontolöschung {app}',
      partial: 'Nur einzelne Daten löschen? Einträge und Fotos kannst du in der App jederzeit einzeln löschen.',
      back: 'Zurück zu {app}'
    },
    privacy: {
      title: 'Datenschutz', desc: 'Datenschutz bei Novark und allen Novark-Apps.',
      lead: 'Datenschutz ist bei uns keine Fußnote, sondern Grundprinzip.',
      site: 'Diese Website',
      siteText: 'Diese Website setzt keine Cookies, nutzt keine Analyse-Tools und lädt keine Inhalte von Drittanbietern außer Schriftarten von Google Fonts. Der Hoster (GitHub Pages) verarbeitet technisch notwendige Server-Logs, z. B. die IP-Adresse.',
      principles: 'Unsere Grundsätze',
      principlesList: ['Keine Werbung und keine Werbe-IDs.', 'Keine Tracker oder Analyse-SDKs in unseren Apps.', 'Wir verkaufen keine Daten – niemals.', 'Nur die Daten, die eine App für ihre Funktion braucht.', 'Konto-Löschung jederzeit direkt in der App.'],
      perApp: 'Datenschutzerklärungen der Apps',
      contact: 'Fragen zum Datenschutz?'
    },
    appPrivacy: { title: '{app} – Datenschutzerklärung', desc: 'Datenschutzerklärung der App {app} von Novark.' },
    about: {
      title: 'Über Novark', desc: 'Die Geschichte hinter Novark, einem unabhängigen App-Studio.',
      lead: 'Novark ist ein kleines, unabhängiges App-Studio aus Deutschland.',
      p: [
        'Alles begann mit einem ganz normalen Familienproblem: Eine Kündigungsfrist war verpasst, ein Ausweis abgelaufen, und keiner wusste mehr, wo der Vertrag lag. Daraus entstand FamilyKeep – und die Idee hinter Novark.',
        'Wir bauen Apps, die ein konkretes Alltagsproblem lösen, ohne dabei die Aufmerksamkeit oder die Daten ihrer Nutzer zu verkaufen. Klein, durchdacht und mehrsprachig – denn viele Familien leben zwischen mehreren Sprachen.',
        'Der Name Novark steht für „neu“ und „Arche“: ein sicherer Ort für die Dinge, die einer Familie wichtig sind. Der Pfeil im Logo zeigt nach oben – dorthin, wo der Alltag leichter wird.'
      ],
      facts: [['2026', 'gegründet'], ['3', 'Sprachen'], ['0', 'Tracker']]
    },
    support: {
      title: 'Support & Kontakt', desc: 'Hilfe und Kontakt für alle Novark-Apps.',
      lead: 'Fragen, Feedback oder ein Fehler gefunden? Schreib uns – wir antworten in der Regel innerhalb von zwei Werktagen.',
      mail: 'E-Mail schreiben', faq: 'Häufige Fragen',
      faqs: [
        ['Was kosten die Novark-Apps?', 'FamilyKeep ist kostenlos und enthält keine Werbung.'],
        ['Wo werden meine Daten gespeichert?', 'Bei FamilyKeep in einem gesicherten Google-Firebase-Projekt (Google Ireland Limited), verschlüsselt übertragen. Details stehen in der Datenschutzerklärung der App.'],
        ['Wie lösche ich mein Konto?', 'Direkt in der App unter Einstellungen → Konto & Synchronisierung. Eine Anleitung findest du auf der Seite „Konto löschen“ der jeweiligen App.'],
        ['Gibt es die Apps auch für iPhone?', 'Im Moment entwickeln wir nur für Android.'],
        ['Kann ich eine App vorab testen?', 'Ja! Schreib uns deine Gmail-Adresse, die du auf deinem Android-Handy verwendest.']
      ]
    },
    impressum: {
      title: 'Impressum', desc: 'Impressum von Novark.',
      heading: 'Angaben gemäß § 5 DDG', contact: 'Kontakt', resp: 'Verantwortlich für den Inhalt',
      note: 'Novark ist die Marke, unter der die oben genannte Person Apps veröffentlicht.'
    },
    notFound: { title: 'Seite nicht gefunden', text: 'Diese Seite gibt es nicht (mehr). Vielleicht hilft dir einer dieser Links weiter:', home: 'Zur Startseite' }
  },

  en: {
    skip: 'Skip to content',
    nav: { apps: 'Apps', about: 'About', support: 'Support', privacy: 'Privacy', impressum: 'Legal notice' },
    theme: 'Toggle light/dark',
    language: 'Language',
    footerTag: 'Apps that make everyday life easier.',
    footerNote: 'No cookies. No tracking.',
    status: { soon: 'Coming soon', testing: 'In testing', live: 'On Google Play' },
    more: 'Learn more',
    home: {
      title: 'Novark – Apps that make everyday life easier',
      desc: 'Novark is an independent app studio. We build focused Android apps for families – with no ads and no tracking.',
      eyebrow: 'Independent app studio',
      h1a: 'Apps that make', h1b: 'everyday life easier.',
      lead: 'Novark builds focused Android apps for families – with no ads, no tracking, and nothing but what matters.',
      cta: 'Our apps', cta2: 'About Novark',
      valuesTitle: 'What we stand for',
      values: [
        ['shield', 'Privacy first', 'No ads, no trackers, no selling of data. What you enter belongs to you.'],
        ['spark', 'Simple & clear', 'Each app solves one problem – and solves it well. No menu mazes, no distractions.'],
        ['home', 'Made for families', 'Built for real life: shared accounts, reliable reminders, multiple languages.']
      ],
      featured: 'New from Novark',
      allApps: 'See all apps'
    },
    apps: {
      title: 'Our apps', desc: 'All Novark apps for Android.',
      lead: 'Every Novark app is small, focused and respects your privacy. More apps are on the way.',
      next: 'The next app', nextText: "We're already working on new ideas. Check back soon."
    },
    app: {
      features: 'What it does', screens: 'A closer look', get: 'Get it on Google Play',
      soonBtn: 'Coming soon to Google Play',
      testingTitle: 'Testers wanted!',
      testingText: "The app is in closed testing. Have an Android phone and want to try it early? Send us your Gmail address and we'll send you the install link.",
      testingBtn: 'Become a tester', testingSubject: 'Tester for {app}',
      legal: 'Legal', privacy: 'Privacy policy', del: 'Delete account', support: 'Support',
      prev: 'Previous image', next: 'Next image', shot: 'Screenshot'
    },
    del: {
      title: '{app}: delete account and data',
      desc: 'How to delete your {app} account and all associated data.',
      lead: 'You can delete your account and all data yourself at any time. Deletion is permanent.',
      inApp: 'In the app (immediately)',
      steps: ['Open {app} and sign in.', 'Go to <b>Settings → Account & sync</b>.', 'Tap <b>“Delete account and all data”</b> and confirm.'],
      inAppNote: 'Your account, entries, photos and family members are removed from our servers immediately.',
      byMail: 'By email (within 30 days)',
      byMailText: "Can't access the app anymore? Write to us from your account's email address. We'll delete your account and all data within 30 days and confirm it to you.",
      mailBtn: 'Request deletion by email', mailSubject: 'Account deletion {app}',
      partial: 'Only want to delete some data? You can delete individual entries and photos in the app at any time.',
      back: 'Back to {app}'
    },
    privacy: {
      title: 'Privacy', desc: 'Privacy at Novark and in all Novark apps.',
      lead: "Privacy isn't a footnote for us – it's a founding principle.",
      site: 'This website',
      siteText: 'This website sets no cookies, uses no analytics and loads no third-party content except fonts from Google Fonts. The host (GitHub Pages) processes technically necessary server logs, such as the IP address.',
      principles: 'Our principles',
      principlesList: ['No ads and no advertising IDs.', 'No trackers or analytics SDKs in our apps.', 'We never sell data – ever.', 'Only the data an app needs to work.', 'Account deletion right in the app, at any time.'],
      perApp: 'App privacy policies',
      contact: 'Questions about privacy?'
    },
    appPrivacy: { title: '{app} – Privacy policy', desc: 'Privacy policy of the {app} app by Novark.' },
    about: {
      title: 'About Novark', desc: 'The story behind Novark, an independent app studio.',
      lead: 'Novark is a small, independent app studio based in Germany.',
      p: [
        'It all started with an ordinary family problem: a cancellation deadline missed, an ID expired, and nobody remembered where the contract was. That became FamilyKeep – and the idea behind Novark.',
        "We build apps that solve one concrete everyday problem without selling their users' attention or data. Small, thoughtful and multilingual – because many families live between several languages.",
        'The name Novark stands for “new” and “ark”: a safe place for the things that matter to a family. The arrow in the logo points upwards – towards an easier everyday life.'
      ],
      facts: [['2026', 'founded'], ['3', 'languages'], ['0', 'trackers']]
    },
    support: {
      title: 'Support & contact', desc: 'Help and contact for all Novark apps.',
      lead: 'Questions, feedback or found a bug? Write to us – we usually reply within two working days.',
      mail: 'Send an email', faq: 'Frequently asked questions',
      faqs: [
        ['How much do Novark apps cost?', 'FamilyKeep is free and contains no ads.'],
        ['Where is my data stored?', "For FamilyKeep, in a secured Google Firebase project (Google Ireland Limited), transmitted encrypted. Details are in the app's privacy policy."],
        ['How do I delete my account?', 'Right in the app under Settings → Account & sync. You will find a guide on each app\'s “Delete account” page.'],
        ['Are the apps available for iPhone?', 'For now we only build for Android.'],
        ['Can I test an app early?', 'Yes! Send us the Gmail address you use on your Android phone.']
      ]
    },
    impressum: {
      title: 'Legal notice', desc: 'Legal notice (Impressum) of Novark.',
      heading: 'Information according to § 5 DDG (German law)', contact: 'Contact', resp: 'Responsible for content',
      note: 'Novark is the brand under which the person named above publishes apps.'
    },
    notFound: { title: 'Page not found', text: "This page doesn't exist (anymore). Maybe one of these links helps:", home: 'Go to homepage' }
  },

  sq: {
    skip: 'Kalo te përmbajtja',
    nav: { apps: 'App-et', about: 'Rreth nesh', support: 'Ndihma', privacy: 'Privatësia', impressum: 'Njoftim ligjor' },
    theme: 'Ndërro temën e çelur/errët',
    language: 'Gjuha',
    footerTag: 'App që e bëjnë jetën e përditshme më të lehtë.',
    footerNote: 'Pa cookies. Pa gjurmim.',
    status: { soon: 'Së shpejti', testing: 'Në testim', live: 'Në Google Play' },
    more: 'Më shumë',
    home: {
      title: 'Novark – App që e bëjnë jetën më të lehtë',
      desc: 'Novark është një studio e pavarur app-esh. Ndërtojmë app Android të thjeshta për familjet – pa reklama dhe pa gjurmim.',
      eyebrow: 'Studio e pavarur app-esh',
      h1a: 'App që e bëjnë', h1b: 'jetën më të lehtë.',
      lead: 'Novark ndërton app Android të thjeshta për familjet – pa reklama, pa gjurmim, vetëm me atë që vlen.',
      cta: 'App-et tona', cta2: 'Rreth Novark',
      valuesTitle: 'Për çfarë qëndrojmë',
      values: [
        ['shield', 'Privatësia e para', 'Pa reklama, pa gjurmues, pa shitje të dhënash. Ajo që shkruan të përket ty.'],
        ['spark', 'E thjeshtë & e qartë', 'Çdo app zgjidh një problem – dhe e zgjidh mirë. Pa labirinte menush, pa shpërqendrime.'],
        ['home', 'E bërë për familjet', 'Për jetën e vërtetë: llogari të përbashkëta, kujtesa të besueshme, disa gjuhë.']
      ],
      featured: 'E re nga Novark',
      allApps: 'Shiko të gjitha app-et'
    },
    apps: {
      title: 'App-et tona', desc: 'Të gjitha app-et e Novark për Android.',
      lead: 'Çdo app i Novark është i vogël, i fokusuar dhe respekton privatësinë tënde. App të tjera po vijnë.',
      next: 'App-i i radhës', nextText: 'Po punojmë tashmë për ide të reja. Kthehu së shpejti.'
    },
    app: {
      features: 'Çfarë bën app-i', screens: 'Një vështrim nga afër', get: 'Shkarko në Google Play',
      soonBtn: 'Së shpejti në Google Play',
      testingTitle: 'Kërkojmë testues!',
      testingText: 'App-i është në testim të mbyllur. Ke telefon Android dhe do ta provosh para të tjerëve? Na dërgo adresën Gmail – pastaj të dërgojmë linkun për ta instaluar.',
      testingBtn: 'Bëhu testues', testingSubject: 'Testues për {app}',
      legal: 'Ligjore', privacy: 'Politika e privatësisë', del: 'Fshi llogarinë', support: 'Ndihma',
      prev: 'Fotoja e mëparshme', next: 'Fotoja tjetër', shot: 'Pamje ekrani'
    },
    del: {
      title: '{app}: fshi llogarinë dhe të dhënat',
      desc: 'Si ta fshish llogarinë e {app} dhe të gjitha të dhënat e saj.',
      lead: 'Llogarinë dhe të gjitha të dhënat mund t’i fshish vetë në çdo kohë. Fshirja është përfundimtare.',
      inApp: 'Në app (menjëherë)',
      steps: ['Hap {app} dhe kyçu.', 'Shko te <b>Cilësimet → Llogaria dhe sinkronizimi</b>.', 'Prek <b>„Fshi llogarinë dhe të gjitha të dhënat“</b> dhe konfirmo.'],
      inAppNote: 'Llogaria, shënimet, fotot dhe anëtarët e familjes hiqen menjëherë nga serverët tanë.',
      byMail: 'Me email (brenda 30 ditëve)',
      byMailText: 'Nuk ke më qasje në app? Na shkruaj nga adresa email e llogarisë sate. E fshijmë llogarinë dhe të gjitha të dhënat brenda 30 ditëve dhe ta konfirmojmë.',
      mailBtn: 'Kërko fshirjen me email', mailSubject: 'Fshirja e llogarisë {app}',
      partial: 'Do të fshish vetëm disa të dhëna? Shënimet dhe fotot mund t’i fshish një nga një në app në çdo kohë.',
      back: 'Kthehu te {app}'
    },
    privacy: {
      title: 'Privatësia', desc: 'Privatësia te Novark dhe në të gjitha app-et e Novark.',
      lead: 'Për ne privatësia nuk është shënim në fund të faqes – është parim themelor.',
      site: 'Kjo faqe interneti',
      siteText: 'Kjo faqe nuk vendos cookies, nuk përdor mjete analize dhe nuk ngarkon përmbajtje nga palë të treta, përveç fonteve nga Google Fonts. Hostuesi (GitHub Pages) përpunon log-et e nevojshme teknike të serverit, p.sh. adresën IP.',
      principles: 'Parimet tona',
      principlesList: ['Pa reklama dhe pa ID reklamash.', 'Pa gjurmues ose SDK analize në app-et tona.', 'Nuk shesim të dhëna – kurrë.', 'Vetëm të dhënat që i duhen app-it për të funksionuar.', 'Fshirja e llogarisë direkt në app, në çdo kohë.'],
      perApp: 'Politikat e privatësisë së app-eve',
      contact: 'Pyetje për privatësinë?'
    },
    appPrivacy: { title: '{app} – Politika e privatësisë', desc: 'Politika e privatësisë së app-it {app} nga Novark.' },
    about: {
      title: 'Rreth Novark', desc: 'Historia pas Novark, një studio e pavarur app-esh.',
      lead: 'Novark është një studio e vogël dhe e pavarur app-esh në Gjermani.',
      p: [
        'Gjithçka nisi me një problem të zakonshëm familjar: një afat anulimi i humbur, një dokument i skaduar dhe askush nuk e mbante mend ku ishte kontrata. Prej këtu lindi FamilyKeep – dhe ideja e Novark.',
        'Ndërtojmë app që zgjidhin një problem konkret të përditshëm, pa shitur vëmendjen ose të dhënat e përdoruesve. Të vogla, të menduara mirë dhe shumëgjuhëshe – sepse shumë familje jetojnë mes disa gjuhëve.',
        'Emri Novark vjen nga „i ri“ (nova) dhe „arka“ (ark): një vend i sigurt për gjërat që i vlejnë një familjeje. Shigjeta në logo tregon lart – drejt një jete të përditshme më të lehtë.'
      ],
      facts: [['2026', 'themeluar'], ['3', 'gjuhë'], ['0', 'gjurmues']]
    },
    support: {
      title: 'Ndihma & kontakti', desc: 'Ndihmë dhe kontakt për të gjitha app-et e Novark.',
      lead: 'Pyetje, mendime ose gjete një gabim? Na shkruaj – zakonisht përgjigjemi brenda dy ditëve pune.',
      mail: 'Dërgo email', faq: 'Pyetje të shpeshta',
      faqs: [
        ['Sa kushtojnë app-et e Novark?', 'FamilyKeep është falas dhe nuk ka reklama.'],
        ['Ku ruhen të dhënat e mia?', 'Te FamilyKeep, në një projekt të sigurt Google Firebase (Google Ireland Limited), të transmetuara të koduara. Detajet janë në politikën e privatësisë së app-it.'],
        ['Si ta fshij llogarinë?', 'Direkt në app te Cilësimet → Llogaria dhe sinkronizimi. Udhëzimin e gjen në faqen „Fshi llogarinë“ të çdo app-i.'],
        ['A ka app-e edhe për iPhone?', 'Për momentin ndërtojmë vetëm për Android.'],
        ['A mund ta testoj një app para se të dalë?', 'Po! Na dërgo adresën Gmail që përdor në telefonin Android.']
      ]
    },
    impressum: {
      title: 'Njoftim ligjor', desc: 'Njoftimi ligjor (Impressum) i Novark.',
      heading: 'Të dhëna sipas § 5 DDG (ligji gjerman)', contact: 'Kontakti', resp: 'Përgjegjës për përmbajtjen',
      note: 'Novark është marka me të cilën personi i mësipërm publikon app-e.'
    },
    notFound: { title: 'Faqja nuk u gjet', text: 'Kjo faqe nuk ekziston (më). Ndoshta të ndihmon një nga këto linqe:', home: 'Te faqja kryesore' }
  }
};
