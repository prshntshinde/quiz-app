const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        processDir(fullPath);
      }
    } else if (file.endsWith('.test.ts') || file.endsWith('.test.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/\bjest\./g, 'vi.');
      fs.writeFileSync(fullPath, content);
      console.log('Processed:', fullPath);
    }
  }
}

processDir('.');
console.log('Done!');