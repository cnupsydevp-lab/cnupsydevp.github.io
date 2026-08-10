# DPWL 연구실 홈페이지

충남대학교 발달·노화 심리 연구실(DPWL) 공식 홈페이지  
**URL:** https://cnupsydevp-lab.github.io

순수 HTML/CSS/JS 정적 사이트 — GitHub Pages로 자동 배포됩니다. 빌드 도구·프레임워크 없음.

---

## 페이지 목록

| 파일 | 경로 | 설명 |
|------|------|------|
| `index.html` | `/` | 메인(소개) |
| `pi.html` | `/pi.html` | 지도교수 소개 |
| `members.html` | `/members.html` | 구성원 (대학원생 + 학부생) |
| `research.html` | `/research.html` | 연구분야 |
| `activities.html` | `/activities.html` | 연구활동 (논문·학술발표·연구과제) |
| `participation.html` | `/participation.html` | 연구참여 모집 |
| `notices.html` | `/notices.html` | 공지사항 |
| `newsletter.html` | `/newsletter.html` | 소식지 |
| `contact.html` | `/contact.html` | Contact (위치·연락처) |
| `admissions.html` | `/admissions.html` | 대학원 진학 사전 문의 폼 |
| `intern.html` | `/intern.html` | 학부 인턴 문의 폼 |
| `post.html` | `/post.html?page=…&id=…` | 게시글 상세 (공지사항·연구참여 공용) |

---

## 파일 구조

```
homepage/
├── index.html              ← 진입점
├── style.css               ← 전체 디자인 시스템 (색 토큰·질감·컴포넌트)
├── script.js               ← 전 페이지 공통 동작
├── posts.js                ← 모든 콘텐츠 데이터 (공지·소식지·연구활동·연구참여)
├── partials/               ← 내비·푸터 단일 소스 ⚠ 아래 "공용 마크업" 참고
│   ├── nav.html
│   └── footer.html
├── tools/
│   └── sync-partials.py    ← partials를 전 페이지에 반영하는 스크립트
├── papers/                 ← 논문 PDF (27개)
├── presentations/
│   ├── abstracts/          ← 학술발표 초록 PDF
│   └── posters/            ← 학술발표 포스터 PDF
├── images/
│   ├── newsletter/         ← 소식지 사진
│   └── *.jpeg              ← 구성원 사진, og-image
├── favicon.svg
└── *.html                  ← 각 페이지
```

---

## ⚠ 공용 마크업 (내비게이션 · 푸터)

**메뉴와 푸터는 `partials/` 안의 파일만 수정합니다.** 개별 HTML의
`<header class="site-nav">` / `<footer class="site-footer">` 블록을 직접 고치면
다음 동기화 때 덮어써집니다.

```bash
# partials/nav.html 또는 partials/footer.html 수정 후
python3 tools/sync-partials.py
```

현재 페이지의 메뉴 활성 표시는 `script.js`(`initActiveNav`)가 처리하므로
partial에 `class="active"`를 넣지 않습니다.

---

## 색 팔레트

전체 정의와 사용 규칙은 `style.css` 맨 위 `:root` 주석에 있습니다. 아래는 요약입니다.

| 토큰 | 색 | 역할 |
|------|----|------|
| `--paper` | `#EDE8DC` | 지면 — body · `section` · `section-light` |
| `--card` | `#F5F3F0` | 지면 위에 얹힌 종이 — 카드 · 구성원 프로필 카드 · 폴라로이드 · 모달 · 입력면 · 내비 알약 |
| `--blush` | `#E7CCCC` | 교차 밴드(`section-alt`) · 히어로/페이지헤더 상단 워시 · 하이라이터 |
| `--sage` | `#A5B68D` | 강조 '면' — 기본 버튼 · 활성 메뉴 · 폴라로이드 집게 · 푸터 상단 룰 |
| `--moss` | `#C1CFA1` | 부드러운 '면' — 칩 · `badge-muted` |
| `--ink` | `#3D4A33` | '면'과 '선' — 푸터 · 문의버튼 · 테두리 · 그림자 알파 |
| `--text` | `#23281C` | 글자 전용 (세이지와 같은 색상환의 근접 검정) |

규칙 세 가지만 지키면 됩니다.

1. 반투명 값은 hex를 직접 쓰지 않고 `rgba(var(--ink-rgb), 0.14)` 처럼 `--*-rgb` 토큰을 거칩니다.
2. 블러시·세이지·모스는 항상 '면'이고 그 위 글자는 항상 `--text`입니다. 글자색으로 쓰지 않습니다.
3. `section-alt`(블러시 밴드)는 한 페이지에 하나만 둡니다.

### 종이 질감

외부 이미지 없이 SVG `feTurbulence`로 만든 노이즈 두 겹(`--grain` 잔 섬유 · `--pulp` 큰 얼룩)을
`background-blend-mode: multiply`로 얹습니다. 잉크 면(푸터)만 `--grain-ink` + `screen`을 씁니다.
질감을 새 컴포넌트에 적용할 때는 `style.css` 맨 끝 "종이 면 · 질감" 블록의 셀렉터 목록에 추가하세요
(맨 끝에 있어야 각 컴포넌트의 `background` 단축 속성을 덮어씁니다).

---

## 구성원 카드 디자인

사진 아래 **말풍선 카드**(`.member-info-card`). 배경색은 전원 `--card`(`#F5F3F0`) 고정입니다.

구성원마다 색을 달리하면 카드 색이 '과정·소속을 뜻하는 신호'처럼 읽히는데 실제로는 아무 뜻이
없어 오해를 만듭니다. 색은 지면(종이/블러시 밴드)이 맡고 카드는 그 위에 놓인 같은 종이 한 장으로
통일합니다. → HTML의 inline `--postit` 지정은 제거했습니다. 다시 넣지 마세요.

구성원 추가는 `members.html`을 직접 편집합니다(데이터 파일 아님). 내용이 준비된 항목만
카드에 넣고 빈 값에 "—"를 넣지 않습니다 — 파일 안 주석에 사용 가능한 줄이 정리돼 있습니다.

---

## posts.js 데이터 구조

모든 콘텐츠는 `posts.js`의 `POSTS` 객체에서 관리합니다. 섹션은 네 개입니다 —
`notices` · `participation` · `newsletter` · `activities`.

`badge`는 세 종류입니다. `badge-gold` 윤곽선 / `badge-navy` 잉크 채움 / `badge-muted` 모스 워시.

### 공지사항 (`POSTS.notices`)

목록은 `notices.html`, 클릭하면 `post.html?page=notices&id=<id>`로 이동합니다. `id`는 중복 금지.

```js
{
  id: 4,
  date: 'YYYY-MM-DD',
  badge: 'badge-muted',   // 일반 → badge-muted, 모집 → badge-gold
  badgeText: '일반',
  title: '제목',
  body: `<p>본문 HTML</p>`
}
```

### 연구참여 (`POSTS.participation`)

구조는 공지사항과 같고, 링크는 `post.html?page=participation&id=<id>`입니다.

```js
{
  id: 2,
  date: 'YYYY-MM-DD',
  badge: 'badge-navy',
  badgeText: '모집',
  title: '제목',
  body: `<p>본문 HTML</p>`
}
```

### 소식지 (`POSTS.newsletter`)

목록은 **줄에 매달린 폴라로이드**로 표시되고, 클릭하면 모달에 `body`가 열립니다
(`post.html`을 쓰지 않습니다).

```js
{
  id: 3,
  date: 'YYYY-MM-DD',
  title: '제목',                 // 모달 제목 + caption 없을 때 폴라로이드 아래 글
  caption: '짧은 한 줄',          // 선택 — 폴라로이드 아래 여백에 적는 글 (세 줄까지)
  image: 'images/newsletter/파일명.jpeg',   // 선택 — 없으면 빈 인화지 (모노그램만)
  body: `<p>본문 HTML</p>`
}
```

> 사진은 폴라로이드 인화면에 맞춰 **정사각으로 잘립니다**(`object-fit: cover`).
> 잘리면 안 되는 사진은 모달에서 전체가 보이므로 목록용 정사각 이미지를 따로 두지 않아도 됩니다.

### 연구활동 (`POSTS.activities`)

한 배열에 세 종류가 섞여 있고 `type`으로 구분합니다. `id`는 없습니다(상세 페이지 없음).
`year`는 목록 왼쪽에 표시되는 연도이고 `date`는 정렬용입니다 —
정확한 날짜를 모르면 `YYYY-01-01`로 둡니다.

```js
// 논문
{ type: 'publication', year: '2021', date: '2021-01-01',
  badge: 'badge-gold', badgeText: 'KCI',
  title: '논문 제목',
  authors: '문선현, 최원일, 노수림',
  journal: '한국심리학회지: 일반, 40(1), 75–104',
  url: 'https://www.kci.go.kr/...',        // 선택 — 제목에 링크가 걸린다
  pdf: 'papers/Moon_et_al_2021.pdf' },     // 선택 — 다운로드 링크

// 학술발표
{ type: 'presentation', year: '2025', date: '2025-07-03',
  badge: 'badge-muted', badgeText: '국내',   // 국내 | 국제
  title: '발표 제목',
  authors: '이승철, 김미숙, 김혜민, 노수림',
  venue: '한국심리언어학회 정기학술대회, 서울, 대한민국. (구두 발표)',
  abstract: 'presentations/abstracts/Lee_et_al_2025_KPLS.pdf',   // 선택
  poster: 'presentations/posters/Choi_et_al_2025_KPS79.pdf' },   // 선택

// 연구과제
{ type: 'grant', date: '2024-01-01',
  status: '현재 진행',
  title: '한국연구재단 일반연구자지원사업',
  description: '영유아 언어·사회성 발달의 디지털 환경 영향 종단 연구',
  period: '2024–2027' },
```

---

## PDF 추가 방법

| 종류 | 위치 | 파일명 규칙 | 예 |
|------|------|-------------|-----|
| 논문 | `papers/` | `<제1저자 성>_et_al_<연도>.pdf` | `Noh_et_al_2021.pdf` |
| 발표 초록 | `presentations/abstracts/` | `<성>_et_al_<연도>_<학회코드>.pdf` | `Lee_et_al_2025_KPLS.pdf` |
| 발표 포스터 | `presentations/posters/` | 위와 같음 | `Choi_et_al_2025_KPS79.pdf` |

1. 폴더에 PDF 업로드
2. `posts.js`의 `POSTS.activities`에 항목 추가 (`pdf` / `abstract` / `poster` 경로 지정)
3. 커밋 & 푸시

---

## 새 글 알림 도트

메뉴 항목 앞의 붉은 점은 방문자가 아직 못 본 새 글이 있다는 표시입니다.

- 각 섹션의 **최신 `date`를 posts.js에서 자동으로 계산**합니다 (`script.js`의 `NOTIF_LATEST`).
  날짜를 따로 관리할 곳이 없으므로, 글을 추가하면 도트가 자동으로 켜집니다.
- 방문자가 해당 목록 페이지를 열면 `localStorage`의 `dpwl_seen_<섹션>`에 그 날짜를 기록하고
  도트를 끕니다. 브라우저별로 따로 기록되며 서버에 저장되지 않습니다.
- 대상 섹션: `notices` · `newsletter` · `activities` · `participation`
  (공지사항 드롭다운 버튼의 도트는 notices + newsletter를 합쳐서 표시)

---

## script.js가 하는 일

전 페이지 공통 동작만 담고, 목록 렌더링은 각 HTML 하단의 인라인 스크립트가 맡습니다.

| 함수 | 역할 |
|------|------|
| `initActiveNav` | 현재 페이지 메뉴에 `active` 표시 |
| `initDropdowns` | 상단 드롭다운 메뉴 |
| `initNotifBadge` | 새 글 알림 도트 (위 참고) |
| `initMobileNav` | 햄버거 · 모바일 전체화면 메뉴 |
| `initBackToTop` | 맨 위로 버튼 |
| `initRipple` | 버튼 클릭 물결 효과 |
| `initScrollReveal` | 스크롤 진입 시 카드 페이드업 (`prefers-reduced-motion` 존중) |
| `initNavScroll` | 스크롤 시 로고·홈 버튼 숨김 |

> `initScrollReveal`은 DOMContentLoaded 시점의 요소만 대상으로 합니다.
> 인라인 스크립트가 나중에 그리는 목록(공지·소식지 등)에는 적용되지 않습니다.

---

## 수정 방법

```bash
# 1. 파일 편집 (style.css, *.html, posts.js 등)

# 2. 내비·푸터를 고쳤다면 동기화
python3 tools/sync-partials.py

# 3. 커밋 & 푸시
git add <파일명>
git commit -m "변경 내용 요약"
git push origin main

# → GitHub Pages가 자동으로 배포 (보통 1~2분 소요)
```

> `git add -A` 대신 파일을 명시해서 임시 파일이 딸려 올라가지 않도록 주의

---

## 문의 폼 연동

`admissions.html`, `intern.html` 두 폼 모두 `https://growingmind.ppai-lab.com/api/contact`로
`fetch` 전송합니다(각 파일의 `CONTACT_API` 상수). ageart 서버의 Contact API가 이메일 전송을 처리합니다.
