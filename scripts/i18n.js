(() => {
  "use strict";

  const app = window.Portfolio;
  const { content, localeTags, state, $, $$ } = app;

  function message(path, locale = state.language) {
    let value = app.valueAt(content[locale], path);
    if (value === undefined) {
      const fallbackLocale = locale === "de" ? "en" : "de";
      value = app.valueAt(content[fallbackLocale], path);
      console.warn("Missing translation key \"" + path + "\" in " + locale + "; using " + fallbackLocale + " fallback.");
    }
    return value == null ? "" : String(value);
  }

  function apply(root = document) {
    const selector = "[data-i18n], [data-i18n-aria], [data-i18n-title], [data-i18n-placeholder], [data-i18n-content]";
    const nodes = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.matches(selector)) nodes.push(root);
    nodes.push(...$$(selector, root));

    nodes.forEach((node) => {
      if (node.hasAttribute("data-i18n")) node.textContent = message(node.getAttribute("data-i18n"));
      if (node.hasAttribute("data-i18n-aria")) node.setAttribute("aria-label", message(node.getAttribute("data-i18n-aria")));
      if (node.hasAttribute("data-i18n-title")) node.setAttribute("title", message(node.getAttribute("data-i18n-title")));
      if (node.hasAttribute("data-i18n-placeholder")) node.setAttribute("placeholder", message(node.getAttribute("data-i18n-placeholder")));
      if (node.hasAttribute("data-i18n-content")) node.setAttribute("content", message(node.getAttribute("data-i18n-content")));
    });

    document.documentElement.lang = state.language;
    document.title = message("meta.title");
    const description = $("meta[name='description']");
    if (description) description.content = message("meta.description");

    const structured = $("#structured-data");
    if (structured) {
      structured.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: content[state.language].hero.firstName + " " + content[state.language].hero.lastName,
        url: "https://swifteridu.me/",
        jobTitle: content[state.language].hero.role,
        sameAs: content[state.language].contact.links.filter((link) => link.kind === "external").map((link) => link.url)
      });
    }

    $$("[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.language === state.language ? "true" : "false");
    });
  }

  function formatNumber(value) {
    return new Intl.NumberFormat(localeTags[state.language]).format(value);
  }

  app.i18n = { message, apply, formatNumber };
  app.onLanguageChange(() => apply());
})();
