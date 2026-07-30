export function renderProjectCard(project) {
  const tags = [];
  tags.push(`<span class="project-tag platform-tag">${project.platform || project.category}</span>`);
  if (project.technologies) {
    project.technologies.slice(0, 3).forEach(tech => {
      tags.push(`<span class="project-tag">${tech}</span>`);
    });
  }

  return `
    <div class="project-card-wrapper">
      <div class="project-card">
        <div class="project-image-container">
          <img src="${project.coverImage || ''}" alt="${project.title}" loading="lazy" decoding="async" class="project-card-img">
          <div class="project-image-overlay"></div>
        </div>
        <div class="project-info">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.shortDescription || ''}</p>
          <div class="project-tags">
            ${tags.join('')}
          </div>
          <div class="project-card-buttons">
            ${project.hasCaseStudy ? `
              <a href="#/projects/${project.slug}" class="card-btn btn-case-study">
                <span>View Case Study</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            ` : ''}
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="card-btn btn-live-demo">
                <span>Live Website</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}
