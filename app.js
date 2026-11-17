(() => {
  "use strict";

  const app = window.Portfolio;
  if (!app || !app.i18n || !app.render || !app.interactions || !app.github || !app.effects) {
    console.error("Portfolio modules could not be initialized.");
    return;
  }

  document.documentElement.dataset.theme = app.state.theme;
  app.i18n.apply();
  app.render.all();
  app.interactions.init();
  app.github.refresh();
  app.effects.init();
})();
