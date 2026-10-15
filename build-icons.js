const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 1. Regular Icon SVG (Rounded corners, subtle shadow)
const regularSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7C3AED" />
      <stop offset="50%" stop-color="#9333EA" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="50%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>
    <linearGradient id="bulletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F472B6" />
      <stop offset="40%" stop-color="#EC4899" />
      <stop offset="100%" stop-color="#BE185D" />
    </linearGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#312E81" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>
  </defs>

  <!-- Background rounded squircle -->
  <rect width="512" height="512" rx="115" fill="url(#bgGrad)" />

  <!-- Subtle inner border highlight -->
  <rect x="10" y="10" width="492" height="492" rx="105" fill="none" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="4" />

  <!-- Soft glow circle in center -->
  <circle cx="256" cy="256" r="175" fill="#FFFFFF" fill-opacity="0.09" />

  <!-- Central Graphic: Stylized Lipstick -->
  <g transform="translate(256, 265) rotate(-22) translate(-256, -265)">
    <!-- Base Tube -->
    <rect x="216" y="248" width="80" height="135" rx="14" fill="url(#bodyGrad)" stroke="#4338CA" stroke-width="2" />
    <!-- Tube Highlight Line -->
    <rect x="228" y="254" width="8" height="123" rx="4" fill="#FFFFFF" fill-opacity="0.15" />
    <!-- Gold Middle Ring -->
    <rect x="218" y="226" width="76" height="22" rx="4" fill="url(#goldGrad)" />
    <!-- Inner Holder -->
    <rect x="226" y="200" width="60" height="26" fill="#3730A3" />
    <!-- Lipstick Angled Bullet -->
    <path d="M228,200 L228,150 C228,124 256,110 284,140 L284,200 Z" fill="url(#bulletGrad)" />
    <!-- Gloss Highlight on Bullet -->
    <path d="M232,198 L232,154 C234,136 248,124 260,118 L248,198 Z" fill="#FFFFFF" fill-opacity="0.4" />
  </g>

  <!-- Large Sparkle Top Right -->
  <g transform="translate(365, 135)">
    <path d="M0,-38 Q0,0 38,0 Q0,0 0,38 Q0,0 -38,0 Q0,0 0,-38 Z" fill="#FFFFFF" />
    <circle cx="0" cy="0" r="9" fill="#FDE047" />
  </g>

  <!-- Medium Sparkle Bottom Left -->
  <g transform="translate(135, 360)">
    <path d="M0,-26 Q0,0 26,0 Q0,0 0,26 Q0,0 -26,0 Q0,0 0,-26 Z" fill="#FFFFFF" />
    <circle cx="0" cy="0" r="6" fill="#FDE047" />
  </g>

  <!-- Small Accent Sparkle -->
  <g transform="translate(140, 160)">
    <path d="M0,-16 Q0,0 16,0 Q0,0 0,16 Q0,0 -16,0 Q0,0 0,-16 Z" fill="#FCE7F3" />
  </g>

  <!-- Mini Sparkle Right Bottom -->
  <g transform="translate(385, 370)">
    <path d="M0,-14 Q0,0 14,0 Q0,0 0,14 Q0,0 -14,0 Q0,0 0,-14 Z" fill="#FCE7F3" />
  </g>
</svg>`;

// 2. Maskable Icon SVG (Full bleed square, artwork well within 80% safe circle)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7C3AED" />
      <stop offset="50%" stop-color="#9333EA" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
    <linearGradient id="goldGradM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="50%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>
    <linearGradient id="bulletGradM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F472B6" />
      <stop offset="40%" stop-color="#EC4899" />
      <stop offset="100%" stop-color="#BE185D" />
    </linearGradient>
    <linearGradient id="bodyGradM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#312E81" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>
  </defs>

  <!-- Full Bleed Background -->
  <rect width="512" height="512" fill="url(#maskGrad)" />

  <!-- Safe Area Circle Accent (diameter 380px is ~74% safe area) -->
  <circle cx="256" cy="256" r="160" fill="#FFFFFF" fill-opacity="0.1" />

  <!-- Central Graphic scaled to 82% to guarantee Android safe margin -->
  <g transform="translate(256, 256) scale(0.82) translate(-256, -256)">
    <g transform="translate(256, 265) rotate(-22) translate(-256, -265)">
      <!-- Base Tube -->
      <rect x="216" y="248" width="80" height="135" rx="14" fill="url(#bodyGradM)" stroke="#4338CA" stroke-width="2" />
      <rect x="228" y="254" width="8" height="123" rx="4" fill="#FFFFFF" fill-opacity="0.15" />
      <rect x="218" y="226" width="76" height="22" rx="4" fill="url(#goldGradM)" />
      <rect x="226" y="200" width="60" height="26" fill="#3730A3" />
      <path d="M228,200 L228,150 C228,124 256,110 284,140 L284,200 Z" fill="url(#bulletGradM)" />
      <path d="M232,198 L232,154 C234,136 248,124 260,118 L248,198 Z" fill="#FFFFFF" fill-opacity="0.4" />
    </g>

    <g transform="translate(365, 135)">
      <path d="M0,-38 Q0,0 38,0 Q0,0 0,38 Q0,0 -38,0 Q0,0 0,-38 Z" fill="#FFFFFF" />
      <circle cx="0" cy="0" r="9" fill="#FDE047" />
    </g>

    <g transform="translate(135, 360)">
      <path d="M0,-26 Q0,0 26,0 Q0,0 0,26 Q0,0 -26,0 Q0,0 0,-26 Z" fill="#FFFFFF" />
      <circle cx="0" cy="0" r="6" fill="#FDE047" />
    </g>

    <g transform="translate(140, 160)">
      <path d="M0,-16 Q0,0 16,0 Q0,0 0,16 Q0,0 -16,0 Q0,0 0,-16 Z" fill="#FCE7F3" />
    </g>

    <g transform="translate(385, 370)">
      <path d="M0,-14 Q0,0 14,0 Q0,0 0,14 Q0,0 -14,0 Q0,0 0,-14 Z" fill="#FCE7F3" />
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.join(iconsDir, 'icon.svg'), regularSvg.trim());
fs.writeFileSync(path.join(iconsDir, 'icon-maskable.svg'), maskableSvg.trim());
console.log('Created icon.svg and icon-maskable.svg');

// HTML wrappers for clean Edge headless rasterization
function createHtml(svgContent, size) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: ${size}px;
    height: ${size}px;
    overflow: hidden;
    background: transparent;
  }
  svg {
    width: ${size}px;
    height: ${size}px;
    display: block;
  }
</style>
</head>
<body>
${svgContent}
</body>
</html>`;
}

const targets = [
  { name: 'icon-512.png', svg: regularSvg, size: 512 },
  { name: 'icon-192.png', svg: regularSvg, size: 192 },
  { name: 'icon-maskable-512.png', svg: maskableSvg, size: 512 },
  { name: 'icon-maskable-192.png', svg: maskableSvg, size: 192 },
  { name: 'favicon.png', svg: regularSvg, size: 64 },
];

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

for (const target of targets) {
  const tempHtml = path.join(__dirname, `_temp_${target.size}.html`);
  fs.writeFileSync(tempHtml, createHtml(target.svg, target.size));
  const outputPath = path.join(iconsDir, target.name);

  try {
    const cmd = `"${edgePath}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=${target.size},${target.size} --default-background-color=00000000 --screenshot="${outputPath}" "file://${tempHtml.replace(/\\/g, '/')}"`;
    execSync(cmd, { stdio: 'ignore' });
    console.log(`Rendered ${target.name} (${target.size}x${target.size})`);
  } catch (err) {
    console.error(`Failed to render ${target.name}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);
  }
}
