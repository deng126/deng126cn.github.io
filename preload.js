// Đọc dữ liệu nét bút từ gói hanzi-writer-data cục bộ (dùng offline)
const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');
contextBridge.exposeInMainWorld('hanziData', (ch) => {
  if (typeof ch !== 'string' || [...ch].length !== 1 || !/[\u4e00-\u9fff]/.test(ch)) throw new Error('invalid');
  const f = path.join(__dirname, 'node_modules', 'hanzi-writer-data', ch + '.json');
  return JSON.parse(fs.readFileSync(f, 'utf8'));
});
