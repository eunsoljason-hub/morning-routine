/* 지우 루틴 PWA 서비스 워커
   - 안드로이드 Chrome이 '홈 화면에 추가'를 진짜 앱(전체화면)으로 설치하려면
     fetch 핸들러가 있는 서비스 워커가 필요합니다.
   - 문서(HTML)는 항상 네트워크 우선 → 새로고침하면 최신 버전이 바로 반영됩니다.
   - 네트워크가 끊기면 마지막으로 받은 화면을 보여 줍니다. */
const CACHE = "jiwoo-routine-v1";
const ASSETS = ["/", "/index.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", "/favicon.ico"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;

  const isDoc = req.mode === "navigate" || url.pathname === "/" || url.pathname.endsWith("/index.html");
  if (isDoc) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put("/", copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match("/").then((hit) => hit || caches.match("/index.html")).then((hit) => hit || Response.error()))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return res;
      });
    })
  );
});
