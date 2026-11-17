(() => {
  "use strict";

  const app = window.Portfolio;
  const { content, state, $, make, translated, externalLink, valueAt } = app;
  const message = (key) => app.i18n.message(key);

  function renderSkills() {
    const root = $("#skill-groups");
    if (!root) return;
    root.replaceChildren();

    content[state.language].skills.groups.forEach((group, groupIndex) => {
      const card = make("article", "skill-group");
      card.append(make("span", "skill-group-index", String(groupIndex + 1).padStart(2, "0")));
      card.append(make("h3", "skill-group-title", group.title));
      const list = make("ul", "skill-list");
      group.items.forEach((item) => list.append(make("li", "skill-chip", item)));
      card.append(list);
      root.append(card);
    });
  }

  function projectCount(count) {
    const locale = app.localeTags[state.language];
    const category = new Intl.PluralRules(locale).select(count);
    const key = valueAt(content[state.language].projects.count, category) !== undefined
      ? "projects.count." + category : "projects.count.other";
    return message(key).replace("{count}", app.i18n.formatNumber(count));
  }

  function renderProjects() {
    const root = $("#project-grid");
    const counter = $("#project-count");
    if (!root || !counter) return;

    const projects = content[state.language].projects.items;
    root.replaceChildren();
    counter.textContent = projectCount(projects.length);
    if (!projects.length) {
      root.append(make("p", "empty-projects", message("projects.empty")));
      return;
    }

    projects.forEach((project, index) => {
      const card = make("article", "project-card");
      card.dataset.projectIndex = String(index);
      const top = make("div", "project-card-top");
      top.append(make("span", "project-featured", message("projects.featured")));
      top.append(make("span", "project-number", "0" + (index + 1)));

      const detail = make("div", "project-detail");
      detail.append(make("span", "micro-label", message("projects.focus")));
      detail.append(make("p", "", project.detail));

      const stack = make("div", "project-stack");
      stack.append(make("span", "micro-label", message("projects.stack")));
      const tags = make("ul", "tag-list");
      project.stack.forEach((tag) => tags.append(make("li", "tag", tag)));
      stack.append(tags);

      const link = externalLink(project.url, message("projects.openProject"), "project-link");
      link.append(make("span", "link-url", project.repository), make("span", "link-arrow", "↗"));
      link.setAttribute("aria-label", message("projects.openProject"));

      const live = make("div", "live-data");
      live.append(make("span", "micro-label", message("projects.liveLabel")));
      const metrics = make("div", "live-metrics");
      const stars = make("div", "live-metric");
      stars.append(make("span", "", message("projects.stars")), make("strong", "live-stars", "-"));
      const updated = make("div", "live-metric");
      updated.append(make("span", "", message("projects.updated")), make("time", "live-updated", message("projects.unavailable")));
      const status = make("span", "sr-only live-status", message("projects.unavailable"));
      metrics.append(stars, updated);
      live.append(metrics, status);

      card.append(top, make("h3", "project-title", project.title), make("p", "project-summary", project.summary), detail, stack, link, live);
      root.append(card);
    });

    if (projects.length === 1) {
      const next = make("aside", "project-next");
      next.append(make("span", "project-next-mark", "＋"));
      next.append(translated("span", "micro-label", "projects.nextKicker"));
      next.append(translated("h3", "", "projects.nextTitle"));
      next.append(translated("p", "", "projects.nextBody"));
      root.append(next);
    }
  }

  function renderTimeline() {
    const root = $("#timeline");
    if (!root) return;
    root.replaceChildren();

    content[state.language].journey.items.forEach((item, index, items) => {
      const entry = make("article", "timeline-entry");
      const marker = make("div", "timeline-marker");
      marker.append(make("span", "timeline-dot"));
      if (index < items.length - 1) marker.append(make("span", "timeline-line"));

      const heading = make("div", "timeline-title-row");
      heading.append(make("h3", "", item.title), make("span", "timeline-current", message("journey.current")));
      const body = make("div", "timeline-body");
      body.append(heading);
      body.append(make("p", "timeline-organization", item.organization + " · " + item.location));
      body.append(make("p", "timeline-description", item.description));
      entry.append(marker, make("p", "timeline-period", item.period), body);
      root.append(entry);
    });
  }

  function renderContacts() {
    const root = $("#contact-links");
    if (!root) return;
    root.replaceChildren();

    content[state.language].contact.links.forEach((item, index) => {
      const anchor = make("a", "contact-link");
      anchor.href = item.url;
      if (item.kind === "external") {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }
      anchor.append(make("span", "contact-link-index", "0" + (index + 1)));
      const copy = make("span", "contact-link-copy");
      copy.append(make("span", "contact-link-label", item.label), make("strong", "", item.value));
      anchor.append(copy);
      const arrow = make("span", "contact-link-arrow", "↗");
      arrow.setAttribute("aria-hidden", "true");
      anchor.append(arrow);
      anchor.setAttribute("aria-label", item.label + ": " + item.value);
      root.append(anchor);
    });
  }

  function renderAll() {
    renderSkills();
    renderProjects();
    renderTimeline();
    renderContacts();
  }

  app.render = { all: renderAll, skills: renderSkills, projects: renderProjects, timeline: renderTimeline, contacts: renderContacts };
  app.onLanguageChange(renderAll);
})();
