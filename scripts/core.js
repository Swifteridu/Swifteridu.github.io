(() => {
  "use strict";

  const content = window.PORTFOLIO_CONTENT;
  if (!content || !content.de || !content.en) {
    console.error("Portfolio content could not be loaded.");
    return;
  }

  const localeTags = { de: "de-DE", en: "en-US" };
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  const savedLanguage = safeGet("portfolio-language");
  const browserLanguage = ((navigator.languages && navigator.languages[0]) || navigator.language || "en")
    .toLowerCase().startsWith("de") ? "de" : "en";
  const initialLanguage = queryLanguage === "de" || queryLanguage === "en"
    ? queryLanguage
    : savedLanguage === "de" || savedLanguage === "en" ? savedLanguage : browserLanguage;
  const state = {
    language: initialLanguage,
    theme: safeGet("portfolio-theme-v2") === "dark" ? "dark" : "light"
  };
  const languageListeners = [];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (_) { return null; }
  }

  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (_) { /* Storage is optional. */ }
  }

  function valueAt(object, path) {
    return path.split(".").reduce((value, key) => value == null ? undefined : value[key], object);
  }

  function make(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function translated(tagName, className, key) {
    const element = make(tagName, className);
    element.dataset.i18n = key;
    element.textContent = window.Portfolio.i18n.message(key);
    return element;
  }

  function externalLink(url, label, className) {
    const anchor = make("a", className, label);
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    return anchor;
  }

  function onLanguageChange(listener) {
    languageListeners.push(listener);
  }

  function setLanguage(nextLanguage, updateUrl = true) {
    if (nextLanguage !== "de" && nextLanguage !== "en") return;
    const currentScroll = window.scrollY;
    state.language = nextLanguage;
    safeSet("portfolio-language", state.language);

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", state.language);
      window.history.replaceState({}, "", url);
    }

    languageListeners.forEach((listener) => listener());
    window.scrollTo(0, currentScroll);
  }

  window.Portfolio = {
    content,
    localeTags,
    state,
    $, $$,
    safeGet,
    safeSet,
    valueAt,
    make,
    translated,
    externalLink,
    onLanguageChange,
    setLanguage
  };
})();
