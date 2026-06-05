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

## 구성원 카드 디자인

대학원생·학부생 모두 **포스트잇 + 마스킹 테이프** 디자인 사용.  
각 카드는 개인별 고정 색상이며, CSS 변수(`--postit`, `--postit-lo`, `--postit-ink` 등)로 제어.

### 대학원생 색상 (inline style로 지정)

두 그리드로 분리되어 nth-child 순서가 어긋나므로, 각 `member-info-card`에 inline style로 직접 지정.

| 이름 | 역할 | 색상 | `--postit` |
|------|------|------|-----------|
| 이승철 | 박사 과정 | 하늘색 | `#C8E8F5` |
| 김민주 | 석사 과정 | 초록색 | `#C0E0C0` |
| 김혜민 | 석사 과정 | 파란색 | `#BDD0E8` |
| 원정하 | 석사 과정 | 주황색 | `#F5C894` |

### 학부생 색상 (`style.css` ~850번째 줄, nth-child로 지정)

| nth-child | 색상 테마 | `--postit` |
|-----------|----------|-----------|
| 4n+1 | 테라코타 블러시 | `#F2C8C2` |
| 4n+2 | 더스티 세이지 | `#C6DBC8` |
| 4n+3 | 더스티 모브 | `#D4CAE0` |
| 4n+4 | 크림 오프화이트 | `#F5F3F0` |

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

```js
{
  id: 3,
  date: 'YYYY-MM-DD',
  title: '제목',
  image: 'images/파일명.jpg',   // 선택 — 없으면 텍스트 카드
  body: `<p>본문 HTML</p>`
}
```

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
