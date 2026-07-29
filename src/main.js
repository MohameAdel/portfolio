import './style.css'
import * as THREE from 'three'
import { renderHome } from './views/Home.js'
import { renderCaseStudy, renderNotFound } from './views/CaseStudy.js'
import { projects } from './data/projects.js'

// Constants
const HERO_CANVAS_ID = 'hero-canvas'

// State
let scene, camera, renderer, shape;
let mouseX = 0;
let mouseY = 0;
let animationId = null;
let isThreeInitialized = false;

// SEO Defaults
const defaultTitle = "Mohamed Adel";
const defaultMetaDesc = "Portfolio of Mohamed Adel, Front-End Developer specializing in Shopify, WordPress, and e-commerce stores.";

// Init Three.js
let heroObserver = null;

function initThree() {
  if (isThreeInitialized) return;
  const canvas = document.getElementById(HERO_CANVAS_ID);
  if (!canvas) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false, // Turn off antialias for performance gain on high-DPI screens
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit pixel ratio to 1.5 max for performance

  // Reduced geometry detail level from 5 to 3 for 70% fewer vertex loop calculations per frame
  const geometry = new THREE.IcosahedronGeometry(2, 3);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.8,
    wireframe: true,
    flatShading: false
  });

  shape = new THREE.Mesh(geometry, material);
  scene.add(shape);
  shape.geometry.userData.originalPositions = shape.geometry.attributes.position.array.slice();

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 400; // Reduced particle count for performance
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x888888,
    transparent: true,
    opacity: 0.5
  });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
  directionalLight.position.set(2, 2, 5);
  scene.add(directionalLight);

  window.addEventListener('resize', onWindowResize, { passive: true });
  
  // Throttle mousemove listener
  let mouseMoveTimeout;
  document.addEventListener('mousemove', (e) => {
    if (!mouseMoveTimeout) {
      mouseMoveTimeout = setTimeout(() => {
        onMouseMove(e);
        mouseMoveTimeout = null;
      }, 30);
    }
  }, { passive: true });

  isThreeInitialized = true;
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

let time = 0;
function animateThree() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderer.render(scene, camera);
    return;
  }
  
  animationId = requestAnimationFrame(animateThree);
  time += 0.01;

  if (shape) {
    shape.rotation.x += 0.002;
    shape.rotation.y += 0.003;

    const positionAttribute = shape.geometry.attributes.position;
    const originalPositions = shape.geometry.userData.originalPositions;
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = originalPositions[i * 3];
      const y = originalPositions[i * 3 + 1];
      const z = originalPositions[i * 3 + 2];
      const waveX = Math.sin(y * 2 + time * 3) * 0.15;
      const waveY = Math.cos(z * 1.5 + time * 2) * 0.15;
      const waveZ = Math.sin(x * 2 + time) * 0.15;
      positionAttribute.setXYZ(i, x + waveX + (mouseX * 0.3), y + waveY + (mouseY * 0.3), z + waveZ);
    }
    positionAttribute.needsUpdate = true;
  }
  renderer.render(scene, camera);
}

function startThree() {
  if (!isThreeInitialized) initThree();
  if (!animationId) animateThree();
  const canvas = document.getElementById(HERO_CANVAS_ID);
  if (canvas) canvas.style.display = 'block';
}

function stopThree() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  const canvas = document.getElementById(HERO_CANVAS_ID);
  if (canvas) canvas.style.display = 'none';
}

// Router & UI Initialization
let globalUIInitialized = false;

function initGlobalUI() {
  if (globalUIInitialized) return;
  globalUIInitialized = true;

  const menuTrigger = document.querySelector('.menu-trigger');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-item');

  if (menuTrigger && navOverlay) {
    menuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      navOverlay.classList.toggle('active');
      menuTrigger.textContent = navOverlay.classList.contains('active') ? 'Close' : 'Menu';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navOverlay) navOverlay.classList.remove('active');
      if (menuTrigger) menuTrigger.textContent = 'Menu';
    });
  });

  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 300);
    }
  }, 300);
}

function setupHeroAutoPause() {
  const heroEl = document.getElementById('hero');
  if (!heroEl) return;
  
  if (heroObserver) heroObserver.disconnect();
  
  heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startThree();
      } else {
        stopThree(); // Instantly pause Three.js GPU loop when scrolling down to projects!
      }
    });
  }, { threshold: 0.05 });
  
  heroObserver.observe(heroEl);
}

let contactFabObserver = null;

function setupContactFabObserver() {
  const contactEl = document.getElementById('contact');
  const fabBtn = document.getElementById('floating-contact-btn');
  if (!contactEl || !fabBtn) return;
  
  if (contactFabObserver) contactFabObserver.disconnect();
  
  contactFabObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fabBtn.classList.add('hidden');
      } else {
        fabBtn.classList.remove('hidden');
      }
    });
  }, { threshold: 0.15 });
  
  contactFabObserver.observe(contactEl);
}

function initHomeInteractions() {
  setupHeroAutoPause();
  setupContactFabObserver();

  // Mobile Observers
  if (window.innerWidth <= 768) {
    const mobileObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('mobile-active');
        else entry.target.classList.remove('mobile-active');
      });
    }, { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0.1 });
    
    document.querySelectorAll('.project-card-wrapper').forEach(card => mobileObserver.observe(card));
  }

  // Carousel Navigation Buttons
  document.querySelectorAll('.carousel-nav').forEach(nav => {
    const section = nav.closest('.platform-section');
    const list = section.querySelector('.project-list-grid');
    const prevBtn = nav.querySelector('.prev');
    const nextBtn = nav.querySelector('.next');
    if (prevBtn && nextBtn && list) {
      prevBtn.addEventListener('click', () => list.scrollBy({ left: -360, behavior: 'smooth' }));
      nextBtn.addEventListener('click', () => list.scrollBy({ left: 360, behavior: 'smooth' }));
    }
  });

  // Fade In Observer with unobserve optimization
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, { threshold: 0.05 });
  
  setTimeout(() => {
    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
  }, 50);
}

function updateMetadata(project) {
  document.title = project.title + " | Mohamed Adel";
  let descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.content = project.shortDescription;
  
  // NOTE: Real per-project SEO requires static HTML pages, SSG, or SSR.
  // Hash routing updates are for browser context and dynamic preview tools only.
}

function resetMetadata() {
  document.title = defaultTitle;
  let descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.content = defaultMetaDesc;
}

let currentView = null;

function handleRoute() {
  const hash = window.location.hash || '#hero';
  const app = document.getElementById('app');

  if (hash.startsWith('#/projects/')) {
    const slug = hash.replace('#/projects/', '');
    const project = projects.find(p => p.slug === slug);
    stopThree();
    if (project) {
      app.innerHTML = renderCaseStudy(project);
      updateMetadata(project);
    } else {
      app.innerHTML = renderNotFound();
      resetMetadata();
    }
    window.scrollTo(0, 0);
    currentView = 'case-study';
    setTimeout(() => {
      document.querySelectorAll('.fade-in-section').forEach(el => el.classList.add('visible'));
    }, 50);
  } else {
    const isHomeAlreadyLoaded = (currentView === 'home');
    
    if (!isHomeAlreadyLoaded) {
      app.innerHTML = renderHome();
      startThree();
      resetMetadata();
      initHomeInteractions();
      currentView = 'home';
    }

    let targetId = '';
    if (hash === '#work' || hash === '#/projects') targetId = 'work';
    else if (hash === '#about') targetId = 'about';
    else if (hash === '#contact') targetId = 'contact';
    else if (hash === '#hero' || hash === '#/') targetId = 'hero';

    if (targetId) {
      setTimeout(() => {
        const sec = document.getElementById(targetId);
        if (sec) {
          sec.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, isHomeAlreadyLoaded ? 10 : 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// Lightbox State
let currentLightboxImages = [];
let currentLightboxIndex = 0;

window.openLightbox = function(index, slug) {
  const project = projects.find(p => p.slug === slug);
  if (!project || !project.gallery) return;
  currentLightboxImages = project.gallery;
  currentLightboxIndex = index;
  updateLightboxImage();
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'flex';
  
  // Disable body scroll
  document.body.style.overflow = 'hidden';
};

function updateLightboxImage() {
  const img = document.getElementById('lightbox-img');
  if (img && currentLightboxImages.length > 0) {
    img.src = currentLightboxImages[currentLightboxIndex];
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

function nextLightbox() {
  if (currentLightboxImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
  updateLightboxImage();
}

function prevLightbox() {
  if (currentLightboxImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
  updateLightboxImage();
}

// App Initialization
window.addEventListener('hashchange', handleRoute);
document.addEventListener('DOMContentLoaded', () => {
  initGlobalUI();
  handleRoute();

  // Bind Lightbox
  const lbClose = document.getElementById('lightbox-close');
  const lbNext = document.getElementById('lightbox-next');
  const lbPrev = document.getElementById('lightbox-prev');
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbNext) lbNext.addEventListener('click', nextLightbox);
  if (lbPrev) lbPrev.addEventListener('click', prevLightbox);
  
  // Keyboard nav for lightbox
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    }
  });
});

// Since Vite injects module script after DOMContentLoaded, we also call it directly
initGlobalUI();
handleRoute();

// Bind Lightbox (immediate)
const lbClose = document.getElementById('lightbox-close');
const lbNext = document.getElementById('lightbox-next');
const lbPrev = document.getElementById('lightbox-prev');
if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lbNext) lbNext.addEventListener('click', nextLightbox);
if (lbPrev) lbPrev.addEventListener('click', prevLightbox);

