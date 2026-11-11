// Makes every app icon and splash image from assets/brand/logo.svg and brand.json.
// Run: npm run brand   (re-run whenever the logo or brand colors change)
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const root = path.join(__dirname, '..');
const brandDir = path.join(root, 'assets', 'brand');
const outDir = path.join(root, 'assets', 'images');
const brand = JSON.parse(fs.readFileSync(path.join(brandDir, 'brand.json'), 'utf8'));
const logoSvg = fs.readFileSync(path.join(brandDir, brand.logo), 'utf8');

// The logo's inner content, without the outer <svg> tag, so it can be placed on a canvas.
const inner = logoSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

function dropIds(svgInner, ids) {
  let out = svgInner;
  for (const id of ids) {
    out = out.replace(new RegExp(`<[^>]*id="${id}"[^>]*/>`, 'g'), '');
  }
  return out;
}

function recolor(svgInner, color) {
  return svgInner.replace(/fill="#[0-9A-Fa-f]{3,8}"/g, `fill="${color}"`);
}

// Place the 100x100 logo centered on a size x size canvas, scaled to `fraction` of it.
function compose({ size, fraction, background, content }) {
  const scale = (size * fraction) / 100;
  const offset = (size - size * fraction) / 2;
  const bg = background ? `<rect width="${size}" height="${size}" fill="${background}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${bg}<g transform="translate(${offset} ${offset}) scale(${scale})">${content}</g></svg>`;
}

function write(name, svg, size) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  fs.writeFileSync(path.join(outDir, name), png);
  console.log('wrote', name);
}

const pad = 1 - (brand.icon.padding_percent * 2) / 100;
const safe = brand.adaptive.safe_zone_percent / 100;
const leaveOut = brand.adaptive_monochrome.leave_out || [];

write('icon.png', compose({ size: 1024, fraction: pad, background: brand.icon.background, content: inner }), 1024);
write('android-icon-foreground.png', compose({ size: 1024, fraction: safe * 0.9, content: inner }), 1024);
write('android-icon-background.png', compose({ size: 1024, fraction: 1, background: brand.adaptive.background_color, content: '' }), 1024);
write(
  'android-icon-monochrome.png',
  compose({ size: 1024, fraction: safe * 0.9, content: recolor(dropIds(inner, leaveOut), brand.adaptive_monochrome.color) }),
  1024,
);
write('splash-icon.png', compose({ size: 512, fraction: 1, content: inner }), 512);
write('favicon.png', compose({ size: 48, fraction: 0.9, background: brand.favicon.background, content: inner }), 48);
