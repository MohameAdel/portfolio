import './style.css'
import * as THREE from 'three'

// Constants
const HERO_CANVAS_ID = 'hero-canvas'

// State
let scene, camera, renderer, shape;
let mouseX = 0;
let mouseY = 0;

// Init
function init() {
  const canvas = document.getElementById(HERO_CANVAS_ID);

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Objects (Materializing Shape)
  // Using a higher detail Icosahedron for smoother deformation
  const geometry = new THREE.IcosahedronGeometry(2, 5);

  // Custom Shader Material for the "Materializing/Liquid" effect
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.8,
    wireframe: true, // Keep wireframe for the techy/graphical look
    flatShading: false
  });

  shape = new THREE.Mesh(geometry, material);
  scene.add(shape);

  // Store original positions for deformation reference
  shape.geometry.userData.originalPositions = shape.geometry.attributes.position.array.slice();

  // Particles (Add some noise/floating dots)
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 800;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20; // Spread them out more
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x888888,
    transparent: true,
    opacity: 0.6
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Lights - Essential for MeshStandardMaterial
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(2, 2, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x4444ff, 2, 20); // Blueish tint
  pointLight.position.set(-5, -2, 5);
  scene.add(pointLight);

  // Events
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);

  // Menu Trigger
  const menuTrigger = document.querySelector('.menu-trigger');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-item');

  menuTrigger.addEventListener('click', () => {
    navOverlay.classList.toggle('active');
    menuTrigger.textContent = navOverlay.classList.contains('active') ? 'Close' : 'Menu';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('active');
      menuTrigger.textContent = 'Menu';
    });
  });

  // Mobile Project Card Animation
  if (window.innerWidth <= 768) {
    const mobileObserverOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when card is in the middle 60% of the viewport
      threshold: 0.1
    };

    const mobileObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mobile-active');
        } else {
          entry.target.classList.remove('mobile-active');
        }
      });
    }, mobileObserverOptions);

    document.querySelectorAll('.project-card').forEach(card => {
      mobileObserver.observe(card);
    });
  }

  // Carousel Navigation
  document.querySelectorAll('.carousel-nav').forEach(nav => {
    const section = nav.closest('.platform-section');
    const list = section.querySelector('.project-list-grid');
    const prevBtn = nav.querySelector('.prev');
    const nextBtn = nav.querySelector('.next');
    const scrollAmount = 350; // Scroll by one card width + gap approx

    if (prevBtn && nextBtn && list) {
      prevBtn.addEventListener('click', () => {
        list.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        list.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });

  // Remove preloader
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      animate(); // Start animation loop after load
    }, 500);
  }, 1500);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Animation Loop
let time = 0;
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;

  // Rotate shape
  if (shape) {
    shape.rotation.x += 0.002;
    shape.rotation.y += 0.003;

    // Interactive Tilt
    shape.rotation.x += mouseY * 0.02;
    shape.rotation.y += mouseX * 0.02;

    // Vertex Distortion (Wave effect)
    const positionAttribute = shape.geometry.attributes.position;
    const originalPositions = shape.geometry.userData.originalPositions;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = originalPositions[i * 3];
      const y = originalPositions[i * 3 + 1];
      const z = originalPositions[i * 3 + 2];

      // Create a wave based on position and time
      const waveX = Math.sin(y * 2 + time * 3) * 0.2;
      const waveY = Math.cos(z * 1.5 + time * 2) * 0.2;
      const waveZ = Math.sin(x * 2 + time) * 0.2;

      // Apply distortion + slight mouse influence
      positionAttribute.setXYZ(
        i,
        x + waveX + (mouseX * 0.5),
        y + waveY + (mouseY * 0.5),
        z + waveZ
      );
    }
    positionAttribute.needsUpdate = true;
  }

  renderer.render(scene, camera);
}

// Start

// Scroll Animation Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Select elements to animate
// We wait a bit to ensure elements are rendered
setTimeout(() => {
  document.querySelectorAll('.project-card, .section-title, .text-block p, .contact-link').forEach(el => {
    el.classList.add('fade-in-section');
    observer.observe(el);
  });
}, 100);

// Start
init();
