const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const PAGE = 'hoc-tieng-trung.html';
const open = (win, page) => win.loadFile(path.join(__dirname, page));

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1100, height: 800, title: 'Học Tiếng Trung',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, sandbox: false }
  });
  open(win, PAGE);
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'Ứng dụng', submenu: [ { role: 'quit', label: 'Thoát' } ] },
    { label: 'Xem', submenu: [
      { role: 'reload' }, { role: 'togglefullscreen' },
      { role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'resetZoom' } ] }
  ]));
  app.on('window-all-closed', () => app.quit());
});
