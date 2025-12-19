const fs = require('fs');
const path = require('path');

const sizeKb = 1600; // 1600 KB (~1.56 MB)
const sizeBytes = sizeKb * 1024;
const filePath = path.join(__dirname, '..', 'public', 'large_dummy.bin');

// Ensure directory exists
fs.mkdirSync(path.dirname(filePath), { recursive: true });

// Allocate and write buffer
const buffer = Buffer.alloc(sizeBytes, 'A');
fs.writeFileSync(filePath, buffer);
console.log(`Wrote ${buffer.length} bytes to ${filePath}`);
