// js/projects.js
(function () {
  'use strict';

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const data = (window.SITE_DATA && window.SITE_DATA.projects) || window.PROJECTS || [];
  const grid = document.getElementById('projects-grid');
  if (!grid || !data.length) return;

 const renderCard = (project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('role', 'listitem');
    card.id = project.id || `project-${index}`;

   const header = document.createElement('button');
    header.type = 'button';
    header.className = 'project-card__header';
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('aria-controls', `${card.id}-body`);

  const topline = document.createElement('div');
    topline.className = 'project-card__topline';

  const tag = document.createElement('span');
    tag.className = 'project-card__tag';
    tag.textContent = project.tag || project.status || 'Project';

    const chevron = document.createElement('span');
    chevron.className = 'project-card__chevron';
    chevron.setAttribute('aria-hidden', 'true');

    topline.append(tag, chevron);

    const title = document.createElement('h3');
    title.className = 'project-card__title';
    title.textContent = project.title || 'Untitled project';

    header.append(topline, title);

    const body = document.createElement('div');
    body.className = 'project-card__body';
    body.id = `${card.id}-body`;

    if (project.description) {
      const desc = document.createElement('p');
      desc.className = 'project-card__description';
      desc.textContent = project.description;
      body.appendChild(desc);
    }

    if (project.status) {
      const statusWrap = document.createElement('div');
      statusWrap.className = 'project-card__status';

      const statusLabel = document.createElement('span');
      statusLabel.className = 'project-card__status-label';
      statusLabel.textContent = 'Current status';

      const statusText = document.createElement('span');
      statusText.className = 'project-card__status-text';
      statusText.textContent = project.status;

      statusWrap.append(statusLabel, statusText);
      body.appendChild(statusWrap);
    }

    const setExpanded = (expanded) => {
      card.classList.toggle('is-open', expanded);
      header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      if (expanded) {
        body.style.maxHeight = `${body.scrollHeight}px`;
      } else {
        body.style.maxHeight = '0px';
      }
    };

    header.addEventListener('click', () => {
      const expanded = header.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });
   card.append(header, body);
    return card;
  };

  data.slice(0, 9).forEach((project, index) => {
    grid.appendChild(renderCard(project, index));
  });

 window.addEventListener('resize', () => {
    document.querySelectorAll('.project-card.is-open .project-card__body').forEach((body) => {
      body.style.maxHeight = `${body.scrollHeight}px`;
    });
  });
})();
