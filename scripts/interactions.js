(() => {
  "use strict";

  const app = window.Portfolio;
  const { $, $$, make } = app;
  const message = (key) => app.i18n.message(key);
  const paletteDialog = $("#command-dialog");
  const paletteSearch = $("#palette-search");
  const paletteList = $("#palette-list");
  const terminalDialog = $("#terminal-dialog");
  const terminalForm = $("#terminal-form");
  const terminalInput = $("#terminal-input");
  const terminalOutput = $("#terminal-output");
  let visibleCommands = [];

  function setTheme(nextTheme, event) {
    if (nextTheme !== "dark" && nextTheme !== "light") return;
    app.state.theme = nextTheme;
    app.safeSet("portfolio-theme-v2", nextTheme);
    const apply = () => { document.documentElement.dataset.theme = nextTheme; };

    if (event && typeof document.startViewTransition === "function") {
      const x = event.clientX == null ? window.innerWidth / 2 : event.clientX;
      const y = event.clientY == null ? 0 : event.clientY;
      document.documentElement.style.setProperty("--theme-x", x + "px");
      document.documentElement.style.setProperty("--theme-y", y + "px");
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  function openDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function renderPalette(query = "") {
    if (!paletteList) return;
    const normalized = query.trim().toLocaleLowerCase(app.localeTags[app.state.language]);
    const commands = app.content[app.state.language].palette.commands;
    visibleCommands = commands.filter((command) => (command.label + " " + command.group)
      .toLocaleLowerCase(app.localeTags[app.state.language]).includes(normalized));
    paletteList.replaceChildren();

    if (!visibleCommands.length) {
      paletteList.append(make("p", "palette-empty", message("palette.empty")));
      return;
    }

    let previousGroup = "";
    visibleCommands.forEach((command, index) => {
      if (command.group !== previousGroup) {
        paletteList.append(make("p", "palette-group", command.group));
        previousGroup = command.group;
      }
      const button = make("button", "palette-item");
      button.type = "button";
      button.dataset.commandIndex = String(index);
      const iconText = command.kind === "section" ? "↘" : command.kind === "link" ? "↗" : command.kind === "theme" ? "◐" : "文";
      const icon = make("span", "palette-item-icon", iconText);
      const copy = make("span", "palette-item-copy");
      const hint = command.kind === "section" ? "#" + command.target
        : command.kind === "language" ? command.target.toUpperCase()
          : command.kind === "link" ? "github.com" : "";
      copy.append(make("strong", "", command.label), make("small", "", hint));
      button.append(icon, copy, make("span", "palette-enter", "↵"));
      button.addEventListener("click", () => executePaletteCommand(command, button));
      paletteList.append(button);
    });
  }

  function executePaletteCommand(command, source) {
    if (command.kind === "section") {
      closeDialog(paletteDialog);
      const target = $("#" + command.target);
      if (target) target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    } else if (command.kind === "theme") {
      setTheme(app.state.theme === "dark" ? "light" : "dark");
    } else if (command.kind === "language") {
      if (paletteSearch) paletteSearch.value = "";
      app.setLanguage(command.target);
      if (paletteSearch) paletteSearch.focus();
    } else if (command.kind === "link") {
      const anchor = document.createElement("a");
      anchor.href = command.target;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.click();
      closeDialog(paletteDialog);
    }

    if (command.kind !== "section" && command.kind !== "link") {
      renderPalette(paletteSearch ? paletteSearch.value : "");
      const next = $(".palette-item", paletteList);
      if (next) next.focus();
    }
    if (source && command.kind === "section") source.blur();
  }

  function openPalette() {
    renderPalette("");
    openDialog(paletteDialog);
    window.setTimeout(() => paletteSearch && paletteSearch.focus(), 0);
  }

  function appendTerminalLine(text, className) {
    if (!terminalOutput) return;
    const line = make("p", "terminal-line" + (className ? " " + className : ""), text);
    terminalOutput.append(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function fillTemplate(template, substitutions) {
    return template.replace(/\{([a-zA-Z]+)\}/g, (_, key) => substitutions[key] == null ? "" : String(substitutions[key]));
  }

  function runTerminalCommand(rawCommand) {
    const command = rawCommand.trim();
    if (!command) return;
    appendTerminalLine(message("terminal.prompt") + " " + command, "terminal-echo");
    const normalized = command.toLowerCase();
    const args = normalized.split(/\s+/);
    if (normalized === "clear") {
      terminalOutput.replaceChildren();
      return;
    }
    if (normalized === "lang de" || normalized === "lang en") {
      app.setLanguage(args[1]);
      appendTerminalLine(message(args[1] === "de" ? "terminal.languageUpdated" : "terminal.languageEnglish"));
      return;
    }
    if (normalized === "theme") {
      setTheme(app.state.theme === "dark" ? "light" : "dark");
      appendTerminalLine(fillTemplate(message("terminal.themeUpdated"), { theme: message("terminal.themes." + app.state.theme) }));
      return;
    }
    if (normalized === "help") {
      appendTerminalLine(message("terminal.help"));
    } else if (normalized === "about") {
      appendTerminalLine(message("terminal.about"));
    } else if (normalized === "projects") {
      const projects = app.content[app.state.language].projects.items;
      if (!projects.length) {
        appendTerminalLine(message("terminal.noProjects"));
      } else {
        const project = projects[0];
        const category = new Intl.PluralRules(app.localeTags[app.state.language]).select(projects.length);
        const templates = app.content[app.state.language].terminal.projects;
        const template = app.valueAt(templates, category) || app.valueAt(templates, "other");
        appendTerminalLine(fillTemplate(template, {
          count: app.i18n.formatNumber(projects.length), title: project.title, url: project.url
        }));
      }
    } else if (normalized === "contact") {
      const links = app.content[app.state.language].contact.links;
      appendTerminalLine(fillTemplate(message("terminal.contact"), {
        github: links[0] ? links[0].value : "", email: links[1] ? links[1].value : ""
      }));
    } else if (normalized === "date") {
      appendTerminalLine(fillTemplate(message("terminal.date"), {
        date: new Intl.DateTimeFormat(app.localeTags[app.state.language], { dateStyle: "full", timeStyle: "short" }).format(new Date())
      }));
    } else {
      appendTerminalLine(fillTemplate(message("terminal.unknown"), { command }));
    }
  }

  function init() {
    if (paletteSearch) paletteSearch.addEventListener("input", () => renderPalette(paletteSearch.value));
    if (paletteList) paletteList.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      const items = $$(".palette-item", paletteList);
      if (!items.length) return;
      event.preventDefault();
      const activeIndex = items.indexOf(document.activeElement);
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1
        : (activeIndex + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items[nextIndex].focus();
    });
    const paletteButton = $("#palette-open");
    if (paletteButton) paletteButton.addEventListener("click", openPalette);

    const terminalButton = $("#terminal-open");
    if (terminalButton) terminalButton.addEventListener("click", () => {
      openDialog(terminalDialog);
      if (terminalOutput && !terminalOutput.childElementCount) appendTerminalLine(message("terminal.welcome"));
      window.setTimeout(() => terminalInput && terminalInput.focus(), 0);
    });
    if (terminalForm) terminalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      runTerminalCommand(terminalInput.value);
      terminalInput.value = "";
    });

    $$('[data-close-dialog]').forEach((button) => {
      button.addEventListener("click", () => closeDialog($("#" + button.dataset.closeDialog)));
    });
    [paletteDialog, terminalDialog].forEach((dialog) => {
      if (dialog) dialog.addEventListener("click", (event) => {
        if (event.target === dialog) closeDialog(dialog);
      });
    });
    $$('[data-language]').forEach((button) => {
      button.addEventListener("click", () => app.setLanguage(button.dataset.language));
    });
    const themeButton = $("#theme-toggle");
    if (themeButton) themeButton.addEventListener("click", (event) => setTheme(app.state.theme === "dark" ? "light" : "dark", event));

    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (paletteDialog && paletteDialog.open) closeDialog(paletteDialog);
        else openPalette();
      }
    });
    renderPalette("");
  }

  app.interactions = { init, setTheme, renderPalette, runTerminalCommand };
  app.onLanguageChange(() => renderPalette(paletteSearch ? paletteSearch.value : ""));
})();
