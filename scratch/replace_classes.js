const fs = require('fs');
const path = require('path');

const files = [
  'src/app/analytics/page.tsx',
  'src/app/approval/page.tsx',
  'src/app/intelligence/page.tsx',
  'src/app/perspective/page.tsx',
  'src/app/vault/page.tsx',
  'src/app/login/page.tsx'
];

const replacements = [
  { from: /hover:bg-white\/5/g, to: 'hover:bg-surface-container-low/60' },
  { from: /bg-surface-dim\/50/g, to: 'bg-surface' },
  { from: /border-outline-variant\/10/g, to: 'border-outline-variant/30' },
  { from: /bg-white\/5/g, to: 'bg-surface-container-low/60' },
  { from: /border-white\/5/g, to: 'border-outline-variant/30' },
  { from: /border-white\/10/g, to: 'border-outline-variant/30' },
  { from: /bg-surface-dim(?![\/a-zA-Z0-9])/g, to: 'bg-background' }
];

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    replacements.forEach(rep => {
      content = content.replace(rep.from, rep.to);
    });
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${file}`);
    } else {
      console.log(`No changes: ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
