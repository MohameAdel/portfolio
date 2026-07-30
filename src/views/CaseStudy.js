import { projects } from '../data/projects.js';

function renderList(title, items, iconColor = '#38bdf8') {
  if (!items || items.length === 0) return '';
  return `
    <div class="case-study-card improvements-card">
      <h3 dir="auto" class="improvements-card-title">
        <span class="title-indicator" style="background: ${iconColor};"></span>
        ${title}
      </h3>
      <ul class="styled-list">
        ${items.map(item => `
          <li dir="auto">
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

export function renderCaseStudy(project) {
  const currentIndex = projects.findIndex(p => p.id === project.id);
  let nextProject = projects[currentIndex + 1];
  if (!nextProject) nextProject = projects[0];

  const improvementsHtml = `
    <div class="case-study-section-wrapper">
      <h2 dir="auto" class="cs-section-heading">Key Improvements</h2>
      <div class="improvements-grid">
        ${renderList('Design', project.improvements?.design, '#c084fc')}
        ${renderList('User Experience', project.improvements?.userExperience, '#38bdf8')}
        ${renderList('Performance', project.improvements?.performance, '#4ade80')}
        ${renderList('Conversion', project.improvements?.conversion, '#fbbf24')}
      </div>
    </div>
  `;

  const hasImprovements = project.improvements && (
    (project.improvements.design?.length > 0) ||
    (project.improvements.userExperience?.length > 0) ||
    (project.improvements.performance?.length > 0) ||
    (project.improvements.conversion?.length > 0)
  );

  const galleryHtml = project.gallery && project.gallery.length > 0 ? `
    <div class="case-study-section-wrapper">
      <h2 dir="auto" class="cs-section-heading">Project Gallery</h2>
      <div class="gallery-grid">
        ${project.gallery.map((img, index) => `
          <div class="gallery-card" onclick="window.openLightbox(${index}, '${project.slug}')">
            <img src="${img}" alt="${project.title} screenshot ${index + 1}" loading="lazy" class="gallery-img">
            <div class="gallery-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const beforeAfterHtml = project.beforeAfter && project.beforeAfter.length > 0 ? `
    <div class="case-study-section-wrapper">
      <h2 dir="auto" class="cs-section-heading">Before & After</h2>
      <div class="before-after-container">
        ${project.beforeAfter.map(item => `
          <div class="before-after-card">
            <div class="ba-col">
              <span class="ba-badge before-badge">Before</span>
              <img src="${item.before}" alt="Before" loading="lazy">
            </div>
            <div class="ba-col">
              <span class="ba-badge after-badge">After</span>
              <img src="${item.after}" alt="After" loading="lazy">
            </div>
            ${item.note ? `<p dir="auto" class="ba-note">${item.note}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const perfObj = project.performance;
  const performanceHtml = perfObj && Object.keys(perfObj).length > 0 && perfObj.after && Object.keys(perfObj.after).length > 0 ? `
    <div class="case-study-section-wrapper">
      <h2 dir="auto" class="cs-section-heading">Performance Results</h2>
      <div class="performance-stats-grid">
        ${Object.entries(perfObj.after).map(([key, val]) => `
          <div class="kpi-card">
            <div class="kpi-value">${val}</div>
            <div class="kpi-label">${key.replace(/([A-Z])/g, ' $1').trim()}</div>
          </div>
        `).join('')}
      </div>
      ${perfObj.notes && perfObj.notes.length > 0 ? `
        <div class="case-study-card" style="margin-top: 1rem;">
          <ul class="styled-list">
            ${perfObj.notes.map(note => `
              <li dir="auto">
                <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${note}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  ` : '';

  return `
    <article class="case-study-page visible">
      
      <!-- Hero Header -->
      <div class="case-study-header">
        <a href="#/projects" class="cs-back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span>Back to Projects</span>
        </a>
        
        <h1 dir="auto" class="cs-hero-title">${project.title}</h1>
        <p dir="auto" class="cs-hero-subtitle">${project.fullDescription || project.shortDescription}</p>
        
        <div class="cs-meta-grid">
          ${project.category ? `
            <div class="cs-meta-card">
              <span class="cs-meta-label">Platform</span>
              <span class="cs-meta-val">${project.platform || project.category}</span>
            </div>
          ` : ''}
          ${project.year ? `
            <div class="cs-meta-card">
              <span class="cs-meta-label">Year</span>
              <span class="cs-meta-val">${project.year}</span>
            </div>
          ` : ''}
          ${project.role && project.role.length > 0 ? `
            <div class="cs-meta-card cs-meta-wide">
              <span class="cs-meta-label">My Role</span>
              <div class="cs-role-list">
                ${project.role.map(r => `<div dir="auto" class="cs-role-item">• ${r}</div>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        ${project.liveUrl ? `
          <div class="cs-hero-actions">
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="card-btn btn-case-study cs-primary-btn">
              <span>Visit Live Website</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        ` : ''}

        ${project.coverImage ? `
          <div class="cs-hero-banner">
            <img src="${project.coverImage}" alt="${project.title}" loading="lazy">
          </div>
        ` : ''}
      </div>

      <!-- Content Sections -->
      <div class="cs-body-content">
        ${project.challenge && project.challenge.length > 0 ? `
          <div class="case-study-section-wrapper">
            <h2 dir="auto" class="cs-section-heading">The Challenge</h2>
            <div class="case-study-card">
              <ul class="styled-list">
                ${project.challenge.map(c => `
                  <li dir="auto">
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    <span>${c}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        ` : ''}

        ${project.role && project.role.length > 0 ? `
          <div class="case-study-section-wrapper">
            <h2 dir="auto" class="cs-section-heading">My Role & Responsibilities</h2>
            <div class="case-study-card">
              <ul class="styled-list">
                ${project.role.map(r => `
                  <li dir="auto">
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>${r}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        ` : ''}

        ${hasImprovements ? improvementsHtml : ''}
        ${beforeAfterHtml}
        ${performanceHtml}
        ${galleryHtml}

        ${project.result ? `
          <div class="case-study-section-wrapper">
            <h2 dir="auto" class="cs-section-heading">Final Result & Impact</h2>
            <div class="case-study-card highlight-card">
              <p dir="auto" class="cs-result-text">${project.result}</p>
            </div>
          </div>
        ` : ''}

        <!-- Client Reviews Section -->
        <div class="case-study-section-wrapper" style="margin-top: 1.75rem;">
          <section id="reviews" style="padding: 0;">
            <div class="reviews-container">
              <div class="reviews-header">
                <div class="reviews-header-top">
                  <span class="reviews-badge">✦ Client Testimonials & Feedback</span>
                  <div class="reviews-carousel-nav">
                    <button class="review-nav-btn prev" id="reviews-prev" aria-label="Previous Review">←</button>
                    <button class="review-nav-btn next" id="reviews-next" aria-label="Next Review">→</button>
                  </div>
                </div>
                <h2 class="reviews-title">What My Clients Say</h2>
                <p class="reviews-subtitle">Real feedback and chat testimonials from store owners, brand managers, and clients I’ve worked with.</p>
              </div>

              <div class="reviews-slider-track-wrapper">
                <div class="reviews-slider-track" id="reviews-slider-track">
                  <!-- Review 1 -->
                  <div class="review-card" onclick="openReviewLightbox(0)">
                    <div class="review-card-header">
                      <div class="stars-rating">★★★★★ <span>5.0</span></div>
                      <span class="review-verified-badge">Verified Client 🟢</span>
                    </div>
                    <div class="review-image-wrapper">
                      <img src="./rev1.png" alt="Client Review Screenshot 1" loading="lazy" decoding="async" class="review-img">
                      <div class="review-zoom-overlay">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                        <span>Click to Expand</span>
                      </div>
                    </div>
                    <div class="review-card-footer">
                      <span class="review-tag">Store Feedback</span>
                      <span class="review-click-hint">View Screenshot ↗</span>
                    </div>
                  </div>

                  <!-- Review 2 -->
                  <div class="review-card" onclick="openReviewLightbox(1)">
                    <div class="review-card-header">
                      <div class="stars-rating">★★★★★ <span>5.0</span></div>
                      <span class="review-verified-badge">Verified Client 🟢</span>
                    </div>
                    <div class="review-image-wrapper">
                      <img src="./rev2.png" alt="Client Review Screenshot 2" loading="lazy" decoding="async" class="review-img">
                      <div class="review-zoom-overlay">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                        <span>Click to Expand</span>
                      </div>
                    </div>
                    <div class="review-card-footer">
                      <span class="review-tag">E-Commerce Client</span>
                      <span class="review-click-hint">View Screenshot ↗</span>
                    </div>
                  </div>

                  <!-- Review 3 -->
                  <div class="review-card" onclick="openReviewLightbox(2)">
                    <div class="review-card-header">
                      <div class="stars-rating">★★★★★ <span>5.0</span></div>
                      <span class="review-verified-badge">Verified Client 🟢</span>
                    </div>
                    <div class="review-image-wrapper">
                      <img src="./rev3.png" alt="Client Review Screenshot 3" loading="lazy" decoding="async" class="review-img">
                      <div class="review-zoom-overlay">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                        <span>Click to Expand</span>
                      </div>
                    </div>
                    <div class="review-card-footer">
                      <span class="review-tag">Custom Storefront</span>
                      <span class="review-click-hint">View Screenshot ↗</span>
                    </div>
                  </div>

                  <!-- Review 4 -->
                  <div class="review-card" onclick="openReviewLightbox(3)">
                    <div class="review-card-header">
                      <div class="stars-rating">★★★★★ <span>5.0</span></div>
                      <span class="review-verified-badge">Verified Client 🟢</span>
                    </div>
                    <div class="review-image-wrapper">
                      <img src="./rev4.png" alt="Client Review Screenshot 4" loading="lazy" decoding="async" class="review-img">
                      <div class="review-zoom-overlay">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                        <span>Click to Expand</span>
                      </div>
                    </div>
                    <div class="review-card-footer">
                      <span class="review-tag">Client Feedback</span>
                      <span class="review-click-hint">View Screenshot ↗</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="reviews-dots" id="reviews-dots">
                <span class="dot active" data-index="0"></span>
                <span class="dot" data-index="1"></span>
                <span class="dot" data-index="2"></span>
                <span class="dot" data-index="3"></span>
              </div>
            </div>
          </section>
        </div>

        <!-- CTA Section -->
        <div class="cs-footer-cta">
          <h2>Need a similar website?</h2>
          <p>Let’s build a fast, responsive, and conversion-focused digital experience for your brand.</p>
          <div class="cs-cta-btns">
            <a href="#contact" class="card-btn btn-case-study cs-primary-btn">
              <span>Start Project</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#/projects/${nextProject.slug}" class="card-btn btn-live-demo">
              <span>View Next Project</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>

    </article>
  `;
}

export function renderNotFound() {
  return `
    <div class="not-found-page">
      <h1>Project Not Found</h1>
      <p>The project you are looking for does not exist or has been removed.</p>
      <div class="not-found-btns">
        <a href="#/" class="card-btn btn-case-study">Back to Portfolio</a>
        <a href="#/projects" class="card-btn btn-live-demo">View Projects</a>
      </div>
    </div>
  `;
}
