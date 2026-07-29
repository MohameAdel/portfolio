import { projects } from '../data/projects.js';
import { renderProjectCard } from '../components/ProjectCard.js';

export function renderHome() {
  const customCode = projects.filter(p => p.category === 'Custom Code');
  const shopify = projects.filter(p => p.category === 'Shopify');
  const salla = projects.filter(p => p.category === 'Salla');
  const wordpress = projects.filter(p => p.category === 'Wordpress');
  const easyOrder = projects.filter(p => p.category === 'EasyOrder');

  const renderSection = (title, list) => {
    if (list.length === 0) return '';
    return `
      <div class="platform-section">
        <div class="section-header">
          <h3 class="platform-title">${title}</h3>
          <div class="carousel-nav">
            <button class="nav-btn prev" aria-label="Previous">←</button>
            <button class="nav-btn next" aria-label="Next">→</button>
          </div>
        </div>
        <div class="project-list-grid">
          ${list.map(p => renderProjectCard(p)).join('')}
        </div>
      </div>
    `;
  };

  return `
    <div id="home-view">
      <!-- Hero Section -->
      <section id="hero">
        <div class="hero-content">
          <div class="hero-status-badge">
            <span class="status-dot"></span>
            <span>Available for New Projects</span>
          </div>
          <h1>Hey, I’m <span class="highlight">Mohamed Adel</span></h1>
          <p class="subtitle">
            Front-End Developer specializing in building <strong>high-converting e-commerce stores</strong> & performance-driven web experiences.
          </p>
          
          <div class="hero-actions">
            <a href="#work" class="hero-btn primary-hero-btn">
              <span>Explore My Work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </a>
            <a href="./Mohamed_Adel_CV.pdf" download="Mohamed_Adel_CV.pdf" target="_blank" class="hero-btn secondary-hero-btn">
              <span>Download CV</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </a>
          </div>

          <div class="hero-stats">
            <div class="stat-pill">
              <strong>4+ Years</strong>
              <span>Experience</span>
            </div>
            <div class="stat-pill-divider"></div>
            <div class="stat-pill">
              <strong>30+ Stores</strong>
              <span>Delivered</span>
            </div>
            <div class="stat-pill-divider"></div>
            <div class="stat-pill">
              <strong>Shopify, Salla & WordPress</strong>
              <span>Specialist</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Work Section -->
      <section id="work">
        <h2 class="section-title">My latest work</h2>
        ${renderSection('Custom Code', customCode)}
        ${renderSection('Shopify', shopify)}
        ${renderSection('Salla', salla)}
        ${renderSection('Wordpress', wordpress)}
        ${renderSection('EasyOrder', easyOrder)}
      </section>

      <!-- About Section -->
      <section id="about">
        <div class="about-container">
          <h2 class="section-title">About Me</h2>
          
          <div class="about-grid">
            <!-- Bio Card -->
            <div class="about-card bio-card">
              <div class="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h3>Background</h3>
              <p>I’m <strong>Mohamed Adel</strong>, a Front-End Developer with <strong>4+ years of experience</strong> building high-converting e-commerce stores and websites.</p>
              <p>I’ve worked with industry leaders including <span class="company-badge">Rubix</span> and <span class="company-badge">Bany for Business (Saudi Arabia)</span>, creating clean, scalable, and mobile-first digital experiences.</p>
            </div>

            <!-- What I Do Card -->
            <div class="about-card do-card">
              <div class="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <h3>What I Do</h3>
              <p>I build <strong>end-to-end websites and stores</strong> — from setup and structure to full launch — with a focus on performance, clear user flow, and conversions. Every project is designed to grow with your brand and connect with your audience.</p>
            </div>

            <!-- Specialization Card -->
            <div class="about-card spec-card">
              <div class="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3>Specialization</h3>
              <div class="spec-list">
                <div class="spec-item">
                  <strong>Shopify</strong>
                  <span>Liquid, theme customization, storefront optimization</span>
                </div>
                <div class="spec-item">
                  <strong>WordPress</strong>
                  <span>WordPress & Elementor customization</span>
                </div>
                <div class="spec-item">
                  <strong>Salla & Easy Order</strong>
                  <span>Full store setup, custom CSS & conversion UX</span>
                </div>
              </div>
            </div>

            <!-- Skills Card -->
            <div class="about-card skills-card">
              <div class="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3>Skills & Tech Stack</h3>
              <div class="skill-pills">
                <span class="skill-tag">HTML</span>
                <span class="skill-tag">CSS</span>
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">Liquid</span>
                <span class="skill-tag">Flutter</span>
                <span class="skill-tag">FlutterFlow</span>
                <span class="skill-tag">Dart</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section / Footer -->
      <section id="contact">
        <div class="contact-container">
          <div class="contact-card">
            <div class="contact-header">
              <span class="contact-badge">✦ Let’s Work Together</span>
              <h2>Have a project in mind?</h2>
              <p>Whether you need a brand-new e-commerce store, theme customization, or storefront optimization — let’s build something extraordinary.</p>
            </div>

            <div class="contact-methods">
              <a href="mailto:midoadel9618@gmail.com" class="contact-method-card">
                <div class="method-icon email-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div class="method-info">
                  <span class="method-label">Email Me</span>
                  <span class="method-val">midoadel9618@gmail.com</span>
                </div>
                <span class="method-arrow">↗</span>
              </a>

              <a href="https://wa.me/201069609505" target="_blank" rel="noopener noreferrer" class="contact-method-card">
                <div class="method-icon whatsapp-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </div>
                <div class="method-info">
                  <span class="method-label">WhatsApp</span>
                  <span class="method-val">+20 106 960 9505</span>
                </div>
                <span class="method-arrow">↗</span>
              </a>

              <a href="https://www.facebook.com/mohamed.adel.676020/" target="_blank" rel="noopener noreferrer" class="contact-method-card">
                <div class="method-icon facebook-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
                <div class="method-info">
                  <span class="method-label">Facebook</span>
                  <span class="method-val">Mohamed Adel</span>
                </div>
                <span class="method-arrow">↗</span>
              </a>
            </div>

            <footer class="footer-bottom">
              <p>&copy; 2026 Mohamed Adel. All rights reserved.</p>
              <div class="footer-tagline">Designed & Built with Precision.</div>
            </footer>
          </div>
        </div>
      </section>
    </div>
  `;
}
