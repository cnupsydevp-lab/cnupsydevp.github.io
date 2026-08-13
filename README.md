# NOMAD Lab 연구실 홈페이지

충남대학교 발달·노화 심리 연구실(NOMAD Lab) 공식 홈페이지  
**URL:** https://cnupsydevp-lab.github.io/cnupsydevp.github.io/

> 주소 끝의 `/cnupsydevp.github.io/` 를 빼면 404 입니다. 저장소 이름(`cnupsydevp.github.io`)이
> 소유 계정 이름(`cnupsydevp-lab`)과 달라 GitHub Pages 가 사용자 사이트가 아닌
> **프로젝트 사이트**로 배포하기 때문입니다. 링크를 공유할 때는 위 주소를 그대로 쓰세요.

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
| `post.html` | `/post.html?page=…&id=…` | 게시글 상세 (공지사항·연구참여·소식지 공용) |

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
│   ├── sync-partials.py    ← partials를 전 페이지에 반영하는 스크립트
│   ├── make-newsletter-thumbs.py ← 소식지 사진 썸네일 생성
│   ├── make-favicon.py     ← 파비콘(.ico + apple-touch-icon) 생성 ⚠ 그림 교체 시 파일명 번호를 올릴 것
│   ├── make-og-image.py    ← 카톡·SNS 공유 미리보기 이미지 생성
│   └── split-wordmark.py   ← 히어로 이름 로고를 움직일 수 있는 열 겹으로 가름
├── papers/                 ← 논문 PDF (27개)
├── presentations/
│   ├── abstracts/          ← 학술발표 초록 PDF
│   └── posters/            ← 학술발표 포스터 PDF
├── notice-files/           ← 공지에 첨부하는 PDF (모집 요강 등)
├── images/
│   ├── logo/
│   │   ├── wordmark/       ← 첫 화면 로고 열 겹 ⚠ 손으로 고치지 말 것 (README 참고)
│   │   │   └── w800/       ←   같은 열 겹의 좁은 화면용 축소본 (휴대폰 117KB)
│   │   └── README.md       ← 로고 파일 규칙
│   ├── newsletter/         ← 소식지 사진
│   │   └── thumb/          ←   목록용 정사각 썸네일 (make-newsletter-thumbs.py 가 생성)
│   ├── popup/              ← 첫 화면 팝업 이미지
│   ├── og-image-v3.png     ← 카톡·SNS 공유 미리보기 (1200×630)
│   └── *.jpeg / *.JPG      ← 구성원 사진 (파일명 = 이름, members.html·pi.html 이 직접 참조)
├── favicon-v3.ico          ← 파비콘 ⚠ 그림을 바꿀 때는 ?v= 쿼리가 아니라 파일명 번호를 올린다
├── favicon-v3.svg          ←   (브라우저 아이콘 캐시는 쿼리를 무시한다 — 2026-08-13 확인)
├── apple-touch-icon-v3.png ←   iOS 홈 화면 아이콘
├── favicon.ico             ← 위 -v3 판과 같은 그림. HTML 이 가리키지 않지만
├── apple-touch-icon.png    ←   브라우저·iOS 가 파일명 없이 직접 찾아가므로 지우지 말 것
└── *.html                  ← 각 페이지
```

> ⚠ **웹에서 안 쓰이는데 지우면 안 되는 파일이 다섯 개 있습니다** (합 4.9MB).
> 방문자가 내려받지는 않지만 `tools/` 스크립트의 입력이거나 다시 만들 때의 원본입니다.
>
> | 파일 | 왜 필요한가 |
> |---|---|
> | `images/logo/logo-fullname.png` | `split-wordmark.py` 입력 — 히어로 로고 열 겹을 다시 만들 때 |
> | `images/logo/logo-fullname-source.png` | 위 파일로 자르기 전 원본 (1536×1024, 투명) |
> | `images/logo/logo-fullname.webp` | 열 겹으로 가르기 전 원본 한 장 |
> | `images/logo/logo-full.png` | `make-og-image.py` 입력 — 공유 미리보기를 다시 만들 때 |
> | `images/og-image-v3-source.png` | 위 미리보기를 만들기 전 원본 |

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
| `--sage` | `#A5B68D` | 강조 '면' — 기본 버튼 · 활성 메뉴 · 푸터 상단 룰 |
| `--moss` | `#C1CFA1` | 부드러운 '면' — 칩 · `badge-muted` |
| `--ink` | `#3D4A33` | '면'과 '선' — 푸터 · 문의버튼 · 테두리 · 그림자 알파 |
| `--text` | `#23281C` | 글자 전용 (세이지와 같은 색상환의 근접 검정) |

규칙 세 가지만 지키면 됩니다.

1. 반투명 값은 hex를 직접 쓰지 않고 `rgba(var(--ink-rgb), 0.14)` 처럼 `--*-rgb` 토큰을 거칩니다.
2. 블러시·세이지·모스는 항상 '면'이고 그 위 글자는 항상 `--text`입니다. 글자색으로 쓰지 않습니다.
3. `section-alt`(블러시 밴드)는 한 페이지에 하나만 둡니다.

**예외 두 개** — 용도가 못 박혀 있어 다른 곳에 쓰면 안 됩니다.

| 토큰 | 색 | 쓰이는 곳 |
|------|----|-----------|
| `--alert` | `#C2554E` | 새 글 알림 도트 **한 곳** |
| `--wood` / `--wood-dark` | `#CCAE7B` / `#715533` | 소식지의 **노끈과 나무 집게 두 곳** |

노끈과 집게는 '사물'이라 색이 곧 재질입니다(세이지 집게는 플라스틱으로 보입니다). 두 나무색은
종이(H 42°)와 같은 따뜻한 색상 계열의 어두운 쪽이라, `--ink`가 세이지의 어두운 끝인 것과 같은
방식으로 '종이의 제 색이 진해진 것'으로 읽힙니다. 글자색으로는 절대 쓰지 않습니다.

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

목록은 **줄에 매달린 폴라로이드**로 표시되고, 클릭하면 그 자리에서 모달에 `body`가 열립니다
(공지·연구참여처럼 `post.html` 로 넘어가지 않습니다).

> 단 `post.html?page=newsletter&id=<id>` 주소로도 같은 글이 열립니다 — 링크를 공유하거나
> 북마크한 사람을 위한 것입니다. 소식지 글에는 `badge` 가 없어서 그 화면에서는 배지 줄이
> 통째로 빠집니다(`post.html` 안 주석 참고). 배지를 굳이 넣지 않아도 됩니다.

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

**사진 여러 장** — `image` 대신 `images` 배열을 씁니다.

```js
{
  id: 1,
  date: '2026-05-27',
  title: 'Health & Society 학술대회 포스터 발표',
  images: [
    'images/newsletter/2025-12-12_KHPA70_01.jpeg',
    'images/newsletter/2025-12-12_KHPA70_02.jpeg'
  ],
  body: `<p>본문 HTML</p>`
}
```

| | 동작 |
|---|---|
| 폴라로이드 | **첫 장**만 걸리고, 인화면 오른쪽 아래에 `2장` 표시가 붙습니다 |
| 모달 | 사진 아래에 `‹ 1 / 2 ›` 줄이 생깁니다. **방향키(← →)** 와 **손가락 밀기**로도 넘어갑니다 |

> 목록의 폴라로이드는 인화면에 맞춰 **정사각으로 잘립니다**. 모달은 반대로
> **자르지 않습니다** (`object-fit: contain`) — 포스터 사진에서 제목이 잘리면 안 되니까요.
> 무대는 1:1 로 고정돼 가로·세로 사진이 섞여도 넘길 때 화살표가 움직이지 않고,
> 남는 자리는 종이색으로 채워져 사진을 대지에 붙인 것처럼 보입니다.

#### 소식지 사진 넣는 방법

목록은 폴라로이드 인화면이 163~181px 인데 원본은 보통 2~5MB 입니다. 그래서 두 벌을 둡니다.

| 경로 | 용도 | 크기 |
|------|------|------|
| `images/newsletter/<이름>.jpeg` | 모달에 보이는 표시용 | 긴 변 1600px · 200~450KB |
| `images/newsletter/thumb/<이름>.jpeg` | 목록 폴라로이드 썸네일 | 500×500 · 30~75KB |

1. `images/newsletter/` 에 사진을 넣습니다. 파일명은 **`<촬영일>_<행사코드>_<번호>.jpeg`**
   (예: `2026-07-22_ICAP_01.jpeg`). 행사코드는 `presentations/` PDF 와 같은 약칭
   (`KPS79`, `KDPA50`, `KPLS`, `KHPA70`, `ICAP` …), 학회가 아니면 `lab`.
2. ```bash
   python3 tools/make-newsletter-thumbs.py            # 빠진 썸네일 생성 + 점검
   python3 tools/make-newsletter-thumbs.py --shrink   # 큰 사진을 1600px 로 줄이기
   ```
3. `posts.js` 에 `image` (여러 장이면 `images`) 경로만 적습니다. 썸네일 경로는
   `newsletter.html` 이 자동으로 `thumb/` 를 붙여 찾고, 썸네일이 없으면 원본으로 되돌립니다.

> ⚠ **카카오톡 파일명의 날짜는 '전송한 날'입니다.** 촬영일과 다를 수 있어서
> (실제로 5월에 전송된 사진이 전년 12월 촬영이었습니다) 스크립트가 EXIF 촬영일을 읽어
> 파일명과 다르면 알려줍니다. 저장할 때 EXIF 는 지워집니다 — 회전 정보를 사진에 굽고,
> 촬영 위치(GPS)가 공개 저장소에 올라가지 않게 하려는 것입니다.

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
| 공지 첨부 | `notice-files/` | `YYYY-MM-DD_<주제>.pdf` | `2026-08-11_grad-recruit.pdf` |

1. 폴더에 PDF 업로드
2. `posts.js`의 `POSTS.activities`에 항목 추가 (`pdf` / `abstract` / `poster` 경로 지정)
   — 공지 첨부는 `POSTS.notices` 의 `body` 안에 `<a href="notice-files/…">` 로 직접 씁니다
   (자세한 규칙은 `notice-files/README.md`)
3. 커밋 & 푸시

> 올리기 전에 **파일 크기**를 보세요. 지금 있는 PDF 42개의 중간값은 0.7MB 인데
> `presentations/abstracts/Yun_et_al_2024_KDPA.pdf` 한 개만 11MB 남짓입니다 —
> 휴대폰으로 보는 사람이 그만큼을 내려받습니다. 스캔·사진으로 만든 PDF 는
> 올리기 전에 압축하는 편이 좋습니다.

---

## 첫 화면 숫자 (논문 · 진행 중인 연구 · 연구팀원)

홈의 세 숫자는 **HTML 에 적힌 값을 쓰지 않고 매번 계산합니다.** 손으로 고치지 마세요 —
고쳐도 화면에는 계산값이 나오고, 자바스크립트가 막힌 환경에서만 그 숫자가 보여 오히려 어긋납니다.

| 숫자 | 계산 방법 | 늘리려면 |
|------|-----------|----------|
| 논문 | `POSTS.activities` 중 `type: 'publication'` 개수 | `posts.js` 에 논문 항목 추가 |
| 진행 중인 연구 | 같은 목록의 `type: 'grant'` 중 `status: '현재 진행'` 만 (`'완료'` 는 제외) | `posts.js` 의 `status` 수정 |
| 연구팀원 | `members.html` 의 `data-team="current"` 격자 안 `.member-card` 수 **+ 지도교수 1명** | `members.html` 에 카드 추가 |

- 졸업생·인턴 수료생 격자에는 `data-team` 이 없어 세지 않습니다 (현재 팀 인원만 보이게).
- 지도교수는 `pi.html` 에 따로 있어 구성원 페이지에서 셀 수 없으므로 상수 `FACULTY = 1` 로 더합니다.
- 계산에 실패하면 HTML 에 적어 둔 값이 그대로 남습니다 — 빈칸이 보이지 않게 하려는 대비책입니다.
  단 '진행 중인 연구'는 예외로 **0 도 그대로 씁니다**: 과제가 모두 끝났는데 옛 숫자가
  남아 있으면 사실과 달라지기 때문입니다(2026-08-13에 3 → 2 로 어긋나 있던 것을 고쳤습니다).

계산 코드는 `index.html` 아래쪽 "홈 숫자 연동" 인라인 스크립트에 있습니다.

---

## 첫 화면 공지 팝업

홈에 처음 들어올 때만 포스터가 한 번 뜹니다. 마크업과 스크립트가 `index.html` 안에만 있어
다른 메뉴 페이지에서는 아예 실행되지 않습니다.

**내용 바꾸기** — `index.html` 아래쪽 "공지 팝업" 스크립트의 `POPUP` 설정 네 줄만 고칩니다.

```js
const POPUP = {
  id:    'popup-2026-08-11',   // ⚠ 내용을 바꿀 때 이 값도 함께 바꾼다
  image: 'images/popup/2026-08-11_grad-recruit.jpg',
  alt:   '포스터 내용을 글로 옮긴 설명',   // 화면 낭독기·이미지 차단 시 읽히는 글
  link:  'post.html?page=notices&id=1',   // 포스터를 누르면 갈 곳 (비우면 안 눌린다)
};
```

1. 포스터 이미지를 `images/popup/` 에 올립니다.
2. `image` 에 그 경로를, `alt` 에 포스터 내용 설명을 적습니다.
3. `link` 에 그 공지의 글 주소를 적습니다 — 목록에서 그 글을 눌렀을 때의 주소와 같습니다
   (`post.html?page=notices&id=<posts.js 의 그 글 id>`). **포스터를 바꿀 때 id 도 함께 고칩니다** —
   안 고치면 새 포스터를 눌렀는데 옛 공지가 열립니다.
4. **`id` 를 함께 바꿉니다.** 그래야 앞선 공지에서 "하루 동안 보지 않기"를 누른 사람에게도
   새 공지가 바로 보입니다. 안 바꾸면 그 사람들은 새 포스터를 못 봅니다.
5. 공지를 내릴 때는 `image` 를 빈 문자열(`''`)로 둡니다 — 팝업이 아예 뜨지 않습니다.

`link` 는 주소를 보고 탭을 정합니다 — 같은 사이트의 `.html` 페이지는 **이 탭에서** 넘어가고,
바깥 주소(`https://…`)나 `notice-files/*.pdf` 같은 파일은 **새 탭**으로 엽니다(홈을 잃지 않게).
`link` 를 비우면 포스터는 그냥 그림이 됩니다.

| 닫는 방법 | 다시 뜨는가 |
|---|---|
| 닫기 | 새로고침하면 다시 뜹니다 |
| 하루 동안 보지 않기 | 24시간 동안 뜨지 않습니다 (브라우저를 닫아도 유지) |

홈에서 한 번 뜬 뒤에는 다른 메뉴를 둘러보다 돌아와도 다시 뜨지 않습니다(탭을 닫으면 초기화).
상자 폭은 이미지 비율에 맞춰 자동으로 정해지므로 가로·세로 어느 포스터든 그대로 올려도 됩니다.

---

## 파비콘 교체 방법

파비콘은 **세 벌**입니다. 사파리가 SVG 파비콘을 읽지 않아 `.ico` 가, iOS 홈 화면은
둘 다 안 써서 `apple-touch-icon.png` 가 따로 필요합니다.

| 파일 | 누가 읽는가 | 만드는 방법 |
|------|-------------|-------------|
| `favicon-v3.svg` | 크롬·파이어폭스 | **손으로 편집** (도형 한 줄짜리 SVG) |
| `favicon-v3.ico` | 사파리 · 오래된 브라우저 (16·32·48px) | `tools/make-favicon.py` |
| `apple-touch-icon-v3.png` | iOS 홈 화면 (180px) | 같은 스크립트 |

그림을 바꿀 때 순서:

1. `favicon-v3.svg` 를 고칩니다.
2. `tools/make-favicon.py` 의 도형·색 상수를 **SVG 와 같은 모양으로** 맞춥니다
   (스크립트는 SVG 를 읽지 않고 자기 안의 값으로 다시 그립니다 — 여기서 어긋나면
   브라우저마다 다른 아이콘이 보입니다).
3. 스크립트의 `ICO_NAME` · `TOUCH_NAME` 을 `-v4` 로 올리고 실행합니다.
   ```bash
   python3 tools/make-favicon.py
   ```
4. 열두 페이지의 `<head>` 도 같은 번호로 올립니다.
   ```bash
   sed -i -e 's|favicon-v3|favicon-v4|g' \
          -e 's|apple-touch-icon-v3|apple-touch-icon-v4|g' *.html
   ```
5. 번호 없는 `favicon.ico` · `apple-touch-icon.png` 도 새 그림으로 덮어씁니다.
   HTML 이 가리키지 않지만 브라우저와 iOS 가 파일명 없이 그 자리를 직접 찾아갑니다.

> ⚠ **`?v=2` 같은 쿼리로는 캐시가 끊기지 않습니다.** 브라우저는 파비콘을 따로 저장하는데
> 그 저장소가 쿼리를 무시합니다 — 2026-08-13 에 시크릿 창에서도, 서버가 새 아이콘을
> 정상으로 내려 주는 것을 확인한 뒤에도 옛 아이콘이 계속 나왔습니다.
> **파일명의 번호를 올리는 것만이 확실합니다.** 3·4번을 한 번호로 함께 올리세요.

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
`fetch` 전송합니다(각 파일 아래쪽 인라인 스크립트의 `CONTACT_API` 상수).
ageart 서버의 Contact API가 이메일 전송을 처리합니다.

두 페이지의 스크립트는 **글자 하나 다르지 않은 사본**입니다. 한쪽을 고치면 다른 쪽도
같이 고치세요 — 폼 마크업은 `<input type="hidden" name="type">` 값(`admissions` / `intern`)만
다르고 스크립트가 그 값을 폼에서 읽어 함께 보냅니다.

이 홈페이지는 GitHub Pages 정적 사이트라 자체 서버가 없어서, 폼 전송은 브라우저가
**다른 출처로 보내는 요청**이 됩니다. 즉 받는 쪽에서 CORS 를 열어 줘야 전송이 됩니다.

> ⚠ 폼이 실제로 전송되는지는 **브라우저에서 직접 한 건 보내 봐야** 확인됩니다.
> 서버에서 `curl` 로 찔러 보면 Cloudflare 가 403 으로 막습니다(데이터센터 IP 라 그렇습니다).
