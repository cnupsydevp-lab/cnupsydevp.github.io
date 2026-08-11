공지사항에 올릴 이미지·PDF 폴더.

- 이곳에 올린 파일은 `notice-files/<파일명>` 경로로 참조한다.
- 공지 내용은 `posts.js` 의 `POSTS.notices` 안 `body` 에 HTML 로 쓴다. 예:
  - 이미지 — `<img src="notice-files/2026-08-11_대학원모집.jpg" alt="대학원 모집 안내 포스터">`
  - PDF — `<a href="notice-files/2026-08-11_대학원모집.pdf" target="_blank" rel="noopener">모집 안내 (PDF)</a>`
- 파일명은 `YYYY-MM-DD_<주제>.<확장자>`. 날짜를 앞에 두면 목록이 시간순으로 정렬된다.
  띄어쓰기·괄호·따옴표는 주소에서 깨지므로 밑줄로 대신한다.
- 이미지와 PDF 를 한 폴더에 함께 둔다 — 공지 하나에 딸린 자료를 한자리에서 찾게 하려고.
  같은 파일을 두 곳에 두지 않는다. 다른 자료의 자리는 따로 있다:
  - 논문 PDF → `papers/`
  - 학회 발표자료 → `presentations/`
  - 첫 화면 팝업 포스터 → `images/popup/`
  - 소식지 사진 → `images/newsletter/`
  - 로고 → `images/logo/`
- 본문에 넣은 이미지는 글 폭에 맞춰 자동으로 줄어든다(`style.css` 의 `.post-body img`).
  원본이 크더라도 가로 1600px 이하로 올리는 편이 좋다 — 휴대폰에서 내려받는 양이 준다.
- 이 파일은 빈 폴더를 git 에 유지하는 역할도 한다. 파일이 들어와도 위 규칙 때문에 남겨 둔다.
