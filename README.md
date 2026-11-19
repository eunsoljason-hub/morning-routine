# 지우의 아침 준비 · Morning Routine

지우(6세)의 아침 등원 준비를 놀이처럼 따라 하는 PWA 대시보드. 기본 출발 시각 08:30, 8단계 카드, 소리 놀이터 포함. 단일 `index.html`(정적 파일)로 동작합니다.

- Live: Vercel
- Made with Pickle

## 안드로이드 태블릿 전체화면(PWA)
- `manifest.webmanifest` — `display: fullscreen`, 아이콘 192/512(any·maskable)
- `sw.js` — 서비스 워커(설치 가능 조건 충족, 문서는 네트워크 우선)
- Chrome ⋮ 메뉴 → **앱 설치 / 홈 화면에 추가** 후 홈 아이콘으로 실행하면 주소창 없는 전체화면
- 일반 탭에서도 헤더 우측 **전체화면** 버튼으로 바로 전환 가능
