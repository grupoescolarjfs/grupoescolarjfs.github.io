// Service worker do Portal e da Sala JFS (app na tela inicial).
// NÃO guarda dados de ninguém: só responde às páginas deste site; os pedidos ao Google passam direto.
// Sem internet, mostra um aviso no lugar da página.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.mode !== 'navigate' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(fetch(r).catch(function () {
    return new Response('<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sem internet</title>' +
      '<style>body{font-family:system-ui,sans-serif;background:#062653;color:#eef4ff;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center;padding:24px}button{margin-top:18px;padding:12px 18px;border:0;border-radius:10px;background:#075DB5;color:#fff;font-size:16px;font-weight:700}</style></head>' +
      '<body><main><h1>Sem internet</h1><p>O Portal precisa de internet para abrir.<br>Confira o Wi-Fi ou os dados móveis e tente de novo.</p><button onclick="location.reload()">Tentar de novo</button></main></body></html>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
