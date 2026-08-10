# DPWL 연구실 홈페이지

충남대학교 발달·노화 심리 연구실(DPWL) 공식 홈페이지  
**URL:** https://cnupsydevp-lab.github.io

순수 HTML/CSS/JS 정적 사이트 — GitHub Pages로 자동 배포됩니다.

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
| `post.html` | `/post.html` | 게시글 상세 |

---

## 주요 파일

```
homepage/
├── index.html          ← 진입점
├── style.css           ← 전체 디자인 시스템 (CSS 변수, 컴포넌트)
├── script.js           ← 네비게이션, 드롭다운, 폼 동작
├── posts.js            ← 모든 콘텐츠 데이터 (공지·소식지·연구활동)
├── papers/             ← 논문 PDF 파일 (Lastname_et_al_YYYY.pdf 형식)
└── *.html              ← 각 페이지
```

---

## 색 팔레트

전체 정의와 사용 규칙은 `style.css` 맨 위 `:root` 주석에 있습니다. 아래는 요약입니다.

| 토큰 | 색 | 역할 |
|------|----|------|
| `--paper` | `#EDE8DC` | 지면 — body · `section` · `section-light` |
| `--card` | `#F5F3F0` | 지면 위에 얹힌 종이 — 카드 · 구성원 프로필 카드 · 모달 · 입력면 · 내비 알약 |
| `--blush` | `#E7CCCC` | 교차 밴드(`section-alt`) · 히어로/페이지헤더 상단 워시 · 하이라이터 |
| `--sage` | `#A5B68D` | 강조 '면' — 기본 버튼 · 활성 메뉴 · 푸터 상단 룰 |
| `--moss` | `#C1CFA1` | 부드러운 '면' — 칩 · `badge-muted` |
| `--ink` | `#3D4A33` | '면'과 '선' — 푸터 · 문의버튼 · 테두리 · 그림자 알파 |
| `--text` | `#23281C` | 글자 전용 |

규칙 세 가지만 지키면 됩니다.

1. 반투명 값은 hex 를 직접 쓰지 않고 `rgba(var(--ink-rgb), 0.14)` 처럼 `--*-rgb` 토큰을 거칩니다.
2. 블러시·세이지·모스는 항상 '면'이고 그 위 글자는 항상 `--text` 입니다. 글자색으로 쓰지 않습니다.
3. `section-alt`(블러시 밴드)는 한 페이지에 하나만 둡니다.

### 종이 질감

외부 이미지 없이 SVG `feTurbulence` 로 만든 노이즈 두 겹(`--grain` 잔 섬유 · `--pulp` 큰 얼룩)을
`background-blend-mode: multiply` 로 얹습니다. 잉크 면(푸터)만 `--grain-ink` + `screen` 을 씁니다.
질감을 새 컴포넌트에 적용할 때는 `style.css` 맨 끝 "종이 면 · 질감" 블록의 셀렉터 목록에 추가하세요
(맨 끝에 있어야 각 컴포넌트의 `background` 단축 속성을 덮어씁니다).

## 구성원 카드 디자인

사진 아래 **말풍선 카드**(`.member-info-card`). 배경색은 전원 `--card`(`#F5F3F0`) 고정입니다.

구성원마다 색을 달리하면 카드 색이 '과정·소속을 뜻하는 신호'처럼 읽히는데 실제로는 아무 뜻이
없어 오해를 만듭니다. 색은 지면(종이/블러시 밴드)이 맡고 카드는 그 위에 놓인 같은 종이 한 장으로
통일합니다. → HTML 의 inline `--postit` 지정은 제거했습니다. 다시 넣지 마세요.

---

## posts.js 데이터 구조

모든 콘텐츠는 `posts.js`의 `POSTS` 객체에서 관리합니다.

### 공지사항 (`POSTS.notices`)

```js
{
  id: 4,
  date: 'YYYY-MM-DD',
  badge: 'badge-muted',   // badge-muted | badge-gold | badge-navy
  badgeText: '일반',       // 일반 | 모집 | 중요 등
  title: '제목',
  body: `<p>본문 HTML</p>`
}
```

### 소식지 (`POSTS.newsletter`)

목록은 **줄에 매달린 폴라로이드**로 표시되고, 클릭하면 모달에 `body`가 열립니다.

```js
{
  id: 3,
  date: 'YYYY-MM-DD',
  title: '제목',                 // 모달 제목 + caption 없을 때 폴라로이드 아래 글
  caption: '짧은 한 줄',          // 선택 — 폴라로이드 아래 여백에 적는 글 (세 줄까지)
  image: 'images/파일명.jpg',    // 선택 — 없으면 빈 인화지 (모노그램만)
  body: `<p>본문 HTML</p>`
}
```

> 사진은 폴라로이드 인화면에 맞춰 **정사각으로 잘립니다**(`object-fit: cover`).
> 잘리면 안 되는 사진은 모달에서 전체가 보이므로 목록용 정사각 이미지를 따로 두지 않아도 됩니다.

### 연구참여 (`POSTS.participation`)

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

### 연구활동 (`POSTS.activities`)

```js
// 논문
{ type: 'publication', year: '2025', date: 'YYYY-MM-DD',
  badge: 'badge-gold', badgeText: 'KCI',
  title: '논문 제목',
  authors: '저자1, 저자2',
  journal: '학술지명, 권(호), 시작쪽–끝쪽',
  url: 'https://...',          // 선택 — KCI 등 링크
  pdf: 'papers/Xxx_et_al_2025.pdf' },  // 선택

// 학술발표
{ type: 'presentation', year: '2025', date: 'YYYY-01-01',
  badge: 'badge-muted', badgeText: '국제',
  title: '학회명 — 발표 제목 (형식, 장소)' },

// 연구과제
{ type: 'grant', date: 'YYYY-01-01', status: '현재 진행',
  title: '과제명',
  description: '세부 설명',
  period: 'YYYY–YYYY' },
```

---

## 논문 PDF 추가 방법

1. `papers/` 폴더에 PDF 업로드 — 파일명: `Lastname_et_al_YYYY.pdf`
2. `posts.js`의 `POSTS.activities`에 `publication` 항목 추가
3. 커밋 & 푸시

> 파일명 규칙: 제1저자 성(영문) + `_et_al_` + 연도 (예: `Noh_et_al_2021.pdf`)

---

## 수정 방법

```bash
# 1. 파일 편집 (style.css, *.html, posts.js 등)

# 2. 커밋 & 푸시
git add <파일명>
git commit -m "변경 내용 요약"
git push origin main

# → GitHub Pages가 자동으로 배포 (보통 1~2분 소요)
```

> `git add -A` 대신 파일을 명시해서 임시 파일이 딸려 올라가지 않도록 주의

---

## 문의 폼 연동

`admissions.html`, `intern.html` 두 폼 모두 `https://growingmind.ppai-lab.com/api/contact`로 `fetch` 전송.  
ageart 서버의 Contact API가 이메일 전송을 처리합니다.
