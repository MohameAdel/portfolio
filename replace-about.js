import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

const targetContentStart = `<div class="text-block">`;
const targetContentEnd = `</div>\n      </div>\n    </section>\n\n    <!-- Contact Section -->`;

const replacementContent = `<div class="text-block">
          <p>I’m Mohamed Adel, a Front-End Developer with 3+ years of experience building high-converting e-commerce stores and websites. I’ve worked with <strong>Robix</strong> and <strong>Bany for Business (Saudi Arabia)</strong>, creating clean, scalable, and mobile-first digital experiences.</p>

          <h3 class="about-subtitle">Specialization</h3>
          <ul class="skills-list">
            <li><strong>Shopify</strong> (Liquid, theme customization, storefront optimization)</li>
            <li><strong>WordPress & Elementor</strong></li>
            <li><strong>Salla & Easy Order</strong></li>
          </ul>

          <h3 class="about-subtitle">Skills</h3>
          <ul class="skills-list">
            <li>HTML • CSS • JavaScript • Liquid • Flutter • FlutterFlow • Dart</li>
          </ul>

          <h3 class="about-subtitle">What I Do</h3>
          <p>I build end-to-end websites and stores — from setup and structure to full launch — with a focus on performance, clear user flow, and conversions. Every project is designed to grow with your brand and connect with your audience.</p>
        </div>`;

const startIndex = html.indexOf(targetContentStart, html.indexOf('<!-- About Section -->'));
const endIndex = html.indexOf(targetContentEnd, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + replacementContent + html.substring(endIndex);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully updated About Me section');
} else {
    console.log('Could not find the target section to replace.');
}
