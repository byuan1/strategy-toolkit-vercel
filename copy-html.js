const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname);
const destDir = path.join(__dirname, 'public');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.html'));
files.forEach(file => {
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  console.log(`Copied ${file} to public/`);
}); 