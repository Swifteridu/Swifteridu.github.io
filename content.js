window.PORTFOLIO_CONTENT = {
  de: {
    meta: {
      title: "Zakaria Sbihi - Spieleentwickler & Junior-Softwareentwickler",
      description: "Portfolio und interaktiver Lebenslauf von Zakaria Sbihi, Spieleentwickler / Junior-Softwareentwickler.",
      ogLocale: "de_DE",
      ogImageAlt: "Porträt von Zakaria Sbihi neben seiner Vorstellung als Spieleentwickler und Junior-Softwareentwickler"
    },
    a11y: { skip: "Zum Inhalt springen", close: "Dialog schließen" },
    brand: { mark: "ZS", name: "Zur Startseite von Zakaria Sbihi" },
    languages: { de: "DE", en: "EN" },
    header: {
      languageLabel: "Sprache wählen",
      themeLabel: "Farbschema wechseln",
      paletteLabel: "Befehlspalette öffnen",
      terminalLabel: "Mini-Terminal öffnen",
      shortcut: "STRG K"
    },
    nav: { label: "Hauptnavigation", about: "Profil", skills: "Skills", projects: "Projekte", journey: "Werdegang", contact: "Kontakt" },
    hero: {
      eyebrow: "Portfolio · Spieleentwicklung",
      firstName: "Zakaria",
      lastName: "Sbihi",
      role: "Spieleentwickler / Junior-Softwareentwickler",
      pitch: "Ich baue interaktive Systeme, die sich direkt und nachvollziehbar anfühlen - von Unity-Projekten bis zu Tools für Content Creator.",
      projectsButton: "Projekte ansehen",
      contactButton: "Kontakt aufnehmen",
      terminalButton: "Terminal öffnen",
      proof: "Lernen durch Bauen. Bauen mit Neugier.",
      artLabel: "Rundes Porträt der Karikatur von Zakaria Sbihi",
      artBottom: "SPIEL · SYSTEM · SOFTWARE",
      available: "OFFEN FÜR CHANCEN",
      scrollLabel: "Zum Profil scrollen",
      scrollText: "WEITER ENTDECKEN"
    },
    about: {
      index: "ÜBER MICH",
      titleFirst: "Gute Software",
      titleSecond: "fühlt sich klar an.",
      lead: "Ich verbinde technisches Denken mit Freude an interaktiven Erlebnissen.",
      body: "Mein Schwerpunkt liegt auf Spieleentwicklung und Software Engineering. Ich lerne, indem ich Ideen in funktionierende Projekte verwandle - mit besonderem Interesse an Spielmechanik, Entwicklungswerkzeugen und den Systemen dahinter.",
      factLocationLabel: "STANDORT",
      factLocation: "Köln, Deutschland",
      factFocusLabel: "FOKUS",
      factFocus: "Spiele & Software",
      factStatusLabel: "AKTUELL",
      factStatus: "Auf Jobsuche"
    },
    skills: {
      index: "WERKZEUGE",
      title: "Skills & Stack",
      note: "Werkzeuge, mit denen ich Ideen zum Laufen bringe.",
      groups: [
        { title: "Programmierung", items: ["C#", "Python", "Java", "Web-Programmierung"] },
        { title: "Systeme & Laufzeit", items: ["Unity", "Linux Shell", "Docker"] },
        { title: "Daten & Vernetzung", items: ["Datenbanken", "Networking"] }
      ]
    },
    projects: {
      index: "AUSGEWÄHLTE ARBEITEN",
      title: "Projekte",
      note: "KONZEPT → CODE → ITERATION",
      count: { one: "{count} PROJEKT", other: "{count} PROJEKTE" },
      featured: "AUSGEWÄHLTES PROJEKT",
      openProject: "Projekt auf GitHub öffnen",
      repository: "REPOSITORY",
      stack: "TECH-STACK",
      focus: "WAS ES MACHT",
      liveLabel: "ÖFFENTLICHE GITHUB-DATEN",
      stars: "Stars",
      updated: "Letztes Update",
      unavailable: "Live-Daten gerade nicht verfügbar",
      cached: "Gespeicherter GitHub-Stand",
      timestampLabel: "GitHub-Repository zuletzt aktualisiert am",
      nextKicker: "ALS NÄCHSTES",
      nextTitle: "Weitere Projekte kommen später",
      nextBody: "Dieses Feld ist für die nächsten fertigen Arbeiten reserviert.",
      items: [
        {
          title: "Steam Achievement Overlay",
          summary: "Ein Echtzeit-Tracker für Steam-Erfolge in OBS Studio. Verfolge deinen Weg zu 100 % und teile den Fortschritt live mit deinem Publikum.",
          detail: "Eine lokale Python-Hilfsanwendung synchronisiert Steam-Erfolge und stellt den Spiel- und Abschlussfortschritt als Browser-Quelle in OBS dar.",
          stack: ["Python", "OBS Studio", "Steam Web API"],
          url: "https://github.com/Swifteridu/Steam-Achievement-Overlay",
          repository: "Swifteridu / Steam-Achievement-Overlay",
          api: "https://api.github.com/repos/Swifteridu/Steam-Achievement-Overlay"
        }
      ],
      empty: "Weitere Projekte kommen später dazu."
    },
    journey: {
      index: "AUSBILDUNG & WERDEGANG",
      title: "Der Weg bis hierher",
      note: "Schritt für Schritt, mit Neugier.",
      current: "INFORMATIK",
      items: [
        {
          period: "2022 - 2026",
          title: "Staatlich geprüfter Informatiker",
          organization: "bib International College",
          location: "Deutschland",
          description: "Berufliche Ausbildung im Bereich Informatik am bib International College."
        }
      ]
    },
    contact: {
      index: "KONTAKT",
      titleFirst: "Lass uns etwas",
      titleSecond: "Gutes bauen.",
      body: "Offen für Gespräche über Spiele, Software und spannende Einstiegsgelegenheiten.",
      links: [
        { label: "GitHub", value: "github.com/Swifteridu", url: "https://github.com/Swifteridu", kind: "external" },
        { label: "E-Mail", value: "swifteridu@gmail.com", url: "mailto:swifteridu@gmail.com", kind: "email" },
        { label: "Discord", value: "swifteridu", url: "https://discord.com/users/285717309061070849", kind: "external" }
      ]
    },
    footer: { note: "ENTWORFEN & GEBAUT VON ZAKARIA SBIHI", backTop: "ZURÜCK NACH OBEN" },
    palette: {
      kicker: "SCHNELLZUGRIFF",
      title: "Was möchtest du tun?",
      searchLabel: "Befehlspalette durchsuchen",
      searchPlaceholder: "Abschnitt, Aktion oder Link suchen …",
      hint: "Mit den Pfeiltasten navigieren und mit Enter auswählen.",
      empty: "Keine passenden Befehle.",
      footer: "ESC zum Schließen",
      commands: [
        { id: "home", kind: "section", target: "top", label: "Zur Startseite", group: "NAVIGATION" },
        { id: "about", kind: "section", target: "about", label: "Zum Profil springen", group: "NAVIGATION" },
        { id: "skills", kind: "section", target: "skills", label: "Skills ansehen", group: "NAVIGATION" },
        { id: "projects", kind: "section", target: "projects", label: "Projekte ansehen", group: "NAVIGATION" },
        { id: "journey", kind: "section", target: "journey", label: "Werdegang ansehen", group: "NAVIGATION" },
        { id: "contact", kind: "section", target: "contact", label: "Kontakt öffnen", group: "NAVIGATION" },
        { id: "theme", kind: "theme", label: "Farbschema wechseln", group: "EINSTELLUNGEN" },
        { id: "lang-de", kind: "language", target: "de", label: "Sprache: Deutsch", group: "EINSTELLUNGEN" },
        { id: "lang-en", kind: "language", target: "en", label: "Sprache: Englisch", group: "EINSTELLUNGEN" },
        { id: "github", kind: "link", target: "https://github.com/Swifteridu", label: "GitHub-Profil öffnen", group: "LINKS" }
      ]
    },
    terminal: {
      kicker: "VERSTECKTES DETAIL · INTERAKTIVE SHELL",
      title: "Mini-Terminal",
      prompt: "zakaria@portfolio:~$",
      chrome: "portfolio - 80 × 24",
      inputLabel: "Terminalbefehl eingeben",
      inputPlaceholder: "help eingeben …",
      footnote: "Eine kleine, harmlose Shell - probiere help aus.",
      welcome: "Willkommen. Gib help ein, um die verfügbaren Befehle zu sehen.",
      help: "Verfügbare Befehle: help · about · projects · contact · date · theme · lang de · lang en · clear",
      about: "Zakaria Sbihi - Spieleentwickler / Junior-Softwareentwickler. Ausbildung zum staatlich geprüften Informatiker am bib International College in Deutschland.",
      projects: {
        one: "{count} Projekt: {title} - {url}",
        other: "{count} Projekte: {title} - {url}"
      },
      noProjects: "Noch sind keine Projekte eingetragen.",
      contact: "GitHub: {github} · E-Mail: {email}",
      date: "Lokales Datum und Uhrzeit: {date}",
      themeUpdated: "Farbschema auf {theme} gestellt.",
      languageUpdated: "Sprache auf Deutsch gestellt.",
      languageEnglish: "Sprache auf Englisch gestellt.",
      unknown: "Befehl nicht gefunden: {command}. Gib help ein.",
      themes: { dark: "Dunkel", light: "Hell" }
    }
  },
  en: {
    meta: {
      title: "Zakaria Sbihi - Game Developer & Junior Software Engineer",
      description: "Portfolio and interactive résumé of Zakaria Sbihi, Game Developer / Junior Software Engineer.",
      ogLocale: "en_US",
      ogImageAlt: "Portrait of Zakaria Sbihi alongside his Game Developer and Junior Software Engineer introduction"
    },
    a11y: { skip: "Skip to content", close: "Close dialog" },
    brand: { mark: "ZS", name: "Back to Zakaria Sbihi's home page" },
    languages: { de: "DE", en: "EN" },
    header: {
      languageLabel: "Choose language",
      themeLabel: "Switch colour theme",
      paletteLabel: "Open command palette",
      terminalLabel: "Open mini terminal",
      shortcut: "CTRL K"
    },
    nav: { label: "Main navigation", about: "Profile", skills: "Skills", projects: "Projects", journey: "Journey", contact: "Contact" },
    hero: {
      eyebrow: "Portfolio · Game Development",
      firstName: "Zakaria",
      lastName: "Sbihi",
      role: "Game Developer / Junior Software Engineer",
      pitch: "I build interactive systems that feel direct and understandable - from Unity projects to tools for creators.",
      projectsButton: "Explore projects",
      contactButton: "Get in touch",
      terminalButton: "Open terminal",
      proof: "Learn by building. Build with curiosity.",
      artLabel: "Round portrait of Zakaria Sbihi's cartoon illustration",
      artBottom: "PLAY · SYSTEM · SOFTWARE",
      available: "OPEN TO OPPORTUNITIES",
      scrollLabel: "Scroll to profile",
      scrollText: "SCROLL TO EXPLORE"
    },
    about: {
      index: "ABOUT ME",
      titleFirst: "Good software",
      titleSecond: "feels clear.",
      lead: "I bring technical thinking together with a love of interactive experiences.",
      body: "My focus is game development and software engineering. I learn by turning ideas into working projects, with a particular interest in gameplay, tools, and the systems behind them.",
      factLocationLabel: "LOCATION",
      factLocation: "Cologne, Germany",
      factFocusLabel: "FOCUS",
      factFocus: "Games & software",
      factStatusLabel: "CURRENTLY",
      factStatus: "Looking for work"
    },
    skills: {
      index: "TOOLKIT",
      title: "Skills & stack",
      note: "Tools I use to bring ideas to life.",
      groups: [
        { title: "Programming", items: ["C#", "Python", "Java", "Web programming"] },
        { title: "Systems & runtime", items: ["Unity", "Linux shell", "Docker"] },
        { title: "Data & connectivity", items: ["Databases", "Networking"] }
      ]
    },
    projects: {
      index: "SELECTED WORK",
      title: "Projects",
      note: "CONCEPT → CODE → ITERATION",
      count: { one: "{count} PROJECT", other: "{count} PROJECTS" },
      featured: "FEATURED PROJECT",
      openProject: "Open project on GitHub",
      repository: "REPOSITORY",
      stack: "TECH STACK",
      focus: "WHAT IT DOES",
      liveLabel: "PUBLIC GITHUB DATA",
      stars: "Stars",
      updated: "Last update",
      unavailable: "Live data is temporarily unavailable",
      cached: "Saved GitHub snapshot",
      timestampLabel: "GitHub repository last updated on",
      nextKicker: "UP NEXT",
      nextTitle: "[More projects coming soon]",
      nextBody: "This space is reserved for the next finished pieces of work.",
      items: [
        {
          title: "Steam Achievement Overlay",
          summary: "A real-time Steam achievement tracker for OBS Studio. Track your 100% completion journey and share your progress with viewers.",
          detail: "A local Python helper syncs Steam achievements and presents game and completion progress as an OBS browser source.",
          stack: ["Python", "OBS Studio", "Steam Web API"],
          url: "https://github.com/Swifteridu/Steam-Achievement-Overlay",
          repository: "Swifteridu / Steam-Achievement-Overlay",
          api: "https://api.github.com/repos/Swifteridu/Steam-Achievement-Overlay"
        }
      ],
      empty: "More projects will be added later."
    },
    journey: {
      index: "EDUCATION & JOURNEY",
      title: "The path so far",
      note: "One step at a time, with curiosity.",
      current: "COMPUTER SCIENCE",
      items: [
        {
          period: "2022 - 2026",
          title: "State-certified IT specialist (staatlich geprüfter Informatiker)",
          organization: "bib International College",
          location: "Germany",
          description: "Vocational training in information technology at bib International College."
        }
      ]
    },
    contact: {
      index: "CONTACT",
      titleFirst: "Let's build",
      titleSecond: "something good.",
      body: "Open to conversations about games, software, and exciting early-career opportunities.",
      links: [
        { label: "GitHub", value: "github.com/Swifteridu", url: "https://github.com/Swifteridu", kind: "external" },
        { label: "Email", value: "swifteridu@gmail.com", url: "mailto:swifteridu@gmail.com", kind: "email" },
        { label: "Discord", value: "swifteridu", url: "https://discord.com/users/285717309061070849", kind: "external" }
      ]
    },
    footer: { note: "DESIGNED & BUILT BY ZAKARIA SBIHI", backTop: "BACK TO TOP" },
    palette: {
      kicker: "QUICK ACCESS",
      title: "What would you like to do?",
      searchLabel: "Search the command palette",
      searchPlaceholder: "Search a section, action, or link …",
      hint: "Use the arrow keys to navigate and Enter to select.",
      empty: "No matching commands.",
      footer: "ESC TO CLOSE",
      commands: [
        { id: "home", kind: "section", target: "top", label: "Go to home", group: "NAVIGATION" },
        { id: "about", kind: "section", target: "about", label: "Jump to profile", group: "NAVIGATION" },
        { id: "skills", kind: "section", target: "skills", label: "View skills", group: "NAVIGATION" },
        { id: "projects", kind: "section", target: "projects", label: "View projects", group: "NAVIGATION" },
        { id: "journey", kind: "section", target: "journey", label: "View journey", group: "NAVIGATION" },
        { id: "contact", kind: "section", target: "contact", label: "Open contact", group: "NAVIGATION" },
        { id: "theme", kind: "theme", label: "Switch colour theme", group: "PREFERENCES" },
        { id: "lang-de", kind: "language", target: "de", label: "Switch language to German", group: "PREFERENCES" },
        { id: "lang-en", kind: "language", target: "en", label: "Switch language to English", group: "PREFERENCES" },
        { id: "github", kind: "link", target: "https://github.com/Swifteridu", label: "Open GitHub profile", group: "LINKS" }
      ]
    },
    terminal: {
      kicker: "EASTER EGG · INTERACTIVE SHELL",
      title: "Mini terminal",
      prompt: "zakaria@portfolio:~$",
      chrome: "portfolio - 80 × 24",
      inputLabel: "Enter a terminal command",
      inputPlaceholder: "Type help …",
      footnote: "A small, harmless shell - try help.",
      welcome: "Welcome. Type help to see the available commands.",
      help: "Available commands: help · about · projects · contact · date · theme · lang de · lang en · clear",
      about: "Zakaria Sbihi - Game Developer / Junior Software Engineer. Training as a state-certified IT specialist (staatlich geprüfter Informatiker) at bib International College in Germany.",
      projects: {
        one: "{count} project: {title} - {url}",
        other: "{count} projects: {title} - {url}"
      },
      noProjects: "No projects have been added yet.",
      contact: "GitHub: {github} · Email: {email}",
      date: "Local date and time: {date}",
      themeUpdated: "Theme set to {theme}.",
      languageUpdated: "Language set to German.",
      languageEnglish: "Language set to English.",
      unknown: "Command not found: {command}. Type help.",
      themes: { dark: "dark", light: "light" }
    }
  }
};
