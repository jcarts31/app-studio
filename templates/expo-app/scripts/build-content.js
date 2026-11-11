// Turns content/*.yaml into src/content/generated.json, which the app reads.
// Run: npm run content          (once)
//      npm run content -- --watch   (keeps it up to date while you edit; `npm start` does this)
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const root = path.join(__dirname, '..');
const contentDir = path.join(root, 'content');
const outFile = path.join(root, 'src', 'content', 'generated.json');

function build() {
  const out = {};
  for (const file of fs.readdirSync(contentDir).sort()) {
    if (!file.endsWith('.yaml')) continue;
    const key = file.replace(/\.yaml$/, '');
    try {
      out[key] = YAML.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
    } catch (err) {
      console.error(`\n  Problem in content/${file}: ${err.message}\n`);
      process.exitCode = 1;
      return false;
    }
  }
  const json = JSON.stringify(out, null, 2) + '\n';
  if (!fs.existsSync(outFile) || fs.readFileSync(outFile, 'utf8') !== json) {
    fs.writeFileSync(outFile, json);
    console.log('content updated');
  }
  return true;
}

build();

if (process.argv.includes('--watch')) {
  console.log('watching content/ for changes');
  let timer;
  fs.watch(contentDir, () => {
    clearTimeout(timer);
    timer = setTimeout(build, 150);
  });
}
