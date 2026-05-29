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
| `members.html` | `/members.html` | 구성원 |
| `research.html` | `/research.html` | 연구분야 |
| `activities.html` | `/activities.html` | 연구활동 |
| `participation.html` | `/participation.html` | 연구참여 모집 |
| `notices.html` | `/notices.html` | 공지사항 |
| `newsletter.html` | `/newsletter.html` | 소식지 |
| `contact.html` | `/contact.html` | Contact |
| `admissions.html` | `/admissions.html` | 대학원 진학 문의 폼 |
| `intern.html` | `/intern.html` | 학부 인턴 문의 폼 |
| `post.html` | `/post.html` | 게시글 상세 |

---

## 주요 파일

```
homepage/
├── index.html          ← 진입점
├── style.css           ← 전체 디자인 시스템 (CSS 변수, 컴포넌트)
├── script.js           ← 네비게이션, 드롭다운, 폼 동작
├── posts.js            ← 공지·소식지 게시글 데이터 (JS 배열)
└── *.html              ← 각 페이지
```

---

## 수정 방법

```bash
# 1. 파일 편집 (style.css, *.html 등)

# 2. 커밋 & 푸시
git add <파일명>
git commit -m "변경 내용 요약"
git push origin main

# → GitHub Pages가 자동으로 배포 (보통 1~2분 소요)
```

> `git add -A` 대신 파일을 명시해서 임시 파일이 딸려 올라가지 않도록 주의

---

## 미완성 항목

- **대학원 진학 / 인턴 문의 폼 이메일 연동** (`admissions.html`, `intern.html`)  
  현재 `action="#"` 플레이스홀더 상태. Formspree 연동 필요:
  1. [formspree.io](https://formspree.io) 가입 (srnoh@cnu.ac.kr)
  2. New Form 생성 → Form ID 확인 (예: `xpzgdkvw`)
  3. 두 파일의 `action="#"` → `action="https://formspree.io/f/FORM_ID"` 로 교체
