(() => {
  "use strict";

  const app = window.Portfolio;
  const snapshots = [];
  const cachePrefix = "portfolio-github:";

  function relativeTime(date) {
    const locale = app.localeTags[app.state.language];
    const seconds = Math.round((date.getTime() - Date.now()) / 1000);
    const intervals = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60], ["second", 1]];
    const chosen = intervals.find((entry) => Math.abs(seconds) >= entry[1]) || intervals[intervals.length - 1];
    const amount = Math.round(seconds / chosen[1]);
    return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(amount, chosen[0]);
  }

  function setLiveData(index, payload, cacheState) {
    snapshots[index] = { payload, cacheState };
    const card = app.$('[data-project-index="' + index + '"]');
    if (!card) return;

    const stars = app.$(".live-stars", card);
    const updated = app.$(".live-updated", card);
    const status = app.$(".live-status", card);
    const message = (key) => app.i18n.message(key);
    if (stars) stars.textContent = payload && Number.isFinite(payload.stargazers_count)
      ? app.i18n.formatNumber(payload.stargazers_count) : "-";

    if (updated && payload && payload.updated_at && !Number.isNaN(Date.parse(payload.updated_at))) {
      const date = new Date(payload.updated_at);
      updated.textContent = relativeTime(date);
      updated.title = new Intl.DateTimeFormat(app.localeTags[app.state.language], { dateStyle: "medium", timeStyle: "short" }).format(date);
      updated.dateTime = date.toISOString();
      if (status) status.textContent = cacheState === "cached" ? message("projects.cached") : message("projects.timestampLabel");
    } else {
      if (updated) {
        updated.textContent = message("projects.unavailable");
        updated.removeAttribute("title");
      }
      if (status) status.textContent = message("projects.unavailable");
    }
  }

  async function refresh() {
    const projects = app.content[app.state.language].projects.items;
    for (let index = 0; index < projects.length; index += 1) {
      const project = projects[index];
      const cacheKey = cachePrefix + project.repository;
      let cached = null;
      try {
        const raw = app.safeGet(cacheKey);
        cached = raw ? JSON.parse(raw) : null;
      } catch (_) { /* Ignore invalid or unavailable cache data. */ }

      if (cached && cached.data && Date.now() - cached.savedAt < 12 * 60 * 60 * 1000) {
        setLiveData(index, cached.data, "cached");
        continue;
      }

      const controller = typeof AbortController === "function" ? new AbortController() : null;
      const timeout = controller ? window.setTimeout(() => controller.abort(), 8000) : null;
      try {
        const response = await fetch(project.api, {
          headers: { Accept: "application/vnd.github+json" },
          ...(controller ? { signal: controller.signal } : {})
        });
        if (!response.ok) throw new Error("GitHub API returned " + response.status);
        const data = await response.json();
        setLiveData(index, data, "live");
        app.safeSet(cacheKey, JSON.stringify({ data, savedAt: Date.now() }));
      } catch (_) {
        if (cached && cached.data) setLiveData(index, cached.data, "cached");
        else setLiveData(index, null, "unavailable");
      } finally {
        if (timeout !== null) window.clearTimeout(timeout);
      }
    }
  }

  function rerender() {
    snapshots.forEach((snapshot, index) => {
      if (snapshot) setLiveData(index, snapshot.payload, snapshot.cacheState);
    });
  }

  app.github = { refresh, rerender, setLiveData };
  app.onLanguageChange(rerender);
})();
