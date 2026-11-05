// Service worker: chạy offline sau lần mở đầu tiên có mạng
const V = 'htt-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
const CDN = [
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5.0/dist/hanzi-writer.min.js'
];
const CDN_HOSTS = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(V);
    await c.addAll(SHELL);
    await Promise.all(CDN.map(async (u) => {
      try { const req = new Request(u); await c.put(req, await fetch(req)); } catch (err) {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== V) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const keep = (res) => {
    if (res && (res.ok || res.type === 'opaque')) { const cp = res.clone(); caches.open(V).then((c) => c.put(r, cp)); }
    return res;
  };
  if (CDN_HOSTS.includes(u.hostname)) {
    // thư viện và dữ liệu nét bút: ưu tiên bản đã lưu
    e.respondWith(caches.match(r).then((m) => m || fetch(r).then(keep)));
  } else if (u.origin === location.origin) {
    // file của ứng dụng: dùng bản đã lưu, cập nhật ngầm
    e.respondWith(caches.match(r, { ignoreSearch: true }).then((m) => {
      const net = fetch(r).then(keep).catch(() => m || (r.mode === 'navigate' ? caches.match('index.html') : undefined));
      return m || net;
    }));
  }
});
