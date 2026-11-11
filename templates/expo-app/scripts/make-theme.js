// Turns docs/design/tokens.json (the locked design) into src/ui/tokens.generated.ts.
// Run: npm run theme   (whenever tokens.json changes)
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const tokens = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'design', 'tokens.json'), 'utf8'));
const out = {
  color: { light: tokens.color.light, dark: tokens.color.dark },
  typeScale: tokens.typeScale,
  space: tokens.space,
  radius: tokens.radius,
  size: tokens.size,
  motion: tokens.motion,
};
const file =
  '// Generated from docs/design/tokens.json by scripts/make-theme.js. Do not edit by hand.\n' +
  `export const tokens = ${JSON.stringify(out, null, 2)} as const;\n`;
fs.writeFileSync(path.join(root, 'src', 'ui', 'tokens.generated.ts'), file);
console.log('wrote src/ui/tokens.generated.ts');
