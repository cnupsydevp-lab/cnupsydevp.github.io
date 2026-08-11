// 게시글 데이터
// 새 글 추가: 해당 배열에 객체 추가 (id는 순서대로 증가)
// body: HTML 문자열 (단락은 <p>, 줄바꿈은 <br>, 목록은 <ul><li>)

const POSTS = {

  notices: [
    {
      id: 1,
      date: '2026-08-11',
      badge: 'badge-gold',
      badgeText: '모집',
      title: '디지털 심리케어 연구실 학부연구생(석사과정 희망자) 수시 모집',
      body: `<p>충남대학교 심리학과 디지털 심리케어 연구실(지도교수: 노수림)에서 석사과정 진학을 희망하는 학부연구생을 모집합니다.</p>
<p>아이트래킹·rPPG 등 멀티모달 측정으로 외로움이 사회적 자극의 주의처리와 인지부하에 미치는 영향을 살펴보는 연구, 그리고 디지털 헬스케어 기업과의 산학협력 rPPG·심리 평가 시스템 개발 프로젝트에 함께 참여합니다. 데이터 분석 도구(Python, R, SPSS)와 통계·머신러닝 기반 분석 역량도 함께 익힐 수 있습니다.</p>
<p>심리학 전공이 아니어도 괜찮습니다 — 대학원에 관심 있는 4학년 이상이면 전공 불문 지원할 수 있습니다. 수시 모집이며, 자세한 내용은 아래 포스터를 확인해 주세요.</p>
<img src="images/popup/2026-08-11_grad-recruit.jpg" alt="충남대학교 심리학과 디지털 심리케어 연구실 학부연구생(석사과정 희망자) 모집 안내 포스터 — 모집 대상, 모집 일정, 연구 내용, 혜택, 지원 절차">
<p>지원·문의: 간단한 자기소개서와 관심 분야를 이메일로 보내 주시면 개별 면담 일정을 조율합니다.<br>
심리학과 노수림 교수 <a href="mailto:srnoh@cnu.ac.kr">srnoh@cnu.ac.kr</a> (이메일 제목: <strong>[대학원 석사과정 문의] 학번_이름_전공</strong>)</p>`
    }
  ],

  participation: [
    {
      id: 1,
      date: '2026-05-15',
      badge: 'badge-navy',
      badgeText: '모집',
      title: '[연구 참여자 모집] 영유아 언어 발달 연구에 참여할 가정을 모십니다.',
      body: `<p>내용을 준비 중입니다.</p>`
    }
  ],

  // ── 연구활동 ─────────────────────────────────────────────
  // type: 'publication' | 'presentation' | 'grant'
  // date: 'YYYY-01-01' 형식 (연도만 알 경우) — 알림 자동화에 사용
  activities: [
    // 논문
    { type: 'publication', year: '2021', date: '2021-01-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '한국어 문장처리에서 청년과 노인의 실시간 인지자원 할당 양상과 읽기수행 비교',
      authors: '문선현, 최원일, 노수림',
      journal: '한국심리학회지: 일반, 40(1), 75–104',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002696637',
      pdf: 'papers/Moon_et_al_2021.pdf' },
    { type: 'publication', year: '2021', date: '2021-09-01', badge: 'badge-gold', badgeText: 'KCI',
      title: 'Physiological Response of Imagery Running with or without an Avatar in 3D Virtual Reality: A Preliminary Study',
      authors: '문경지, 이명철, 홍우평, 노수림, 박창훈, 한경훈',
      journal: '운동학 학술지, 23(3), 11–19',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002742492',
      pdf: 'papers/Moon_et_al_2021b.pdf' },
    { type: 'publication', year: '2021', date: '2021-06-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '어휘력과 작업기억이 청년과 노인의 문장 읽기 효율성에 미치는 영향',
      authors: '노수림, 문선현',
      journal: '한국자료분석학회지, 23(3), 1343–1353',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002730870',
      pdf: 'papers/Noh_et_al_2021.pdf' },
    { type: 'publication', year: '2022', date: '2022-12-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '아이트래킹을 활용한 청년과 노인의 건강정보문해력 차이: 예비연구',
      authors: '김예슬, 김태현, 최원일, 노수림',
      journal: '한국심리학회지: 건강, 27(4), 649–666',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002863702',
      pdf: 'papers/Kim_et_al_2022.pdf' },
    { type: 'publication', year: '2022', date: '2022-06-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '노인의 문장회상발화에서 나타난 언어적 비유창성 분석',
      authors: '노수림, 문선현, 김미숙',
      journal: '한국자료분석학회지, 24(3), 1133–1148',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002850883',
      pdf: 'papers/Noh_et_al_2022.pdf' },
    { type: 'publication', year: '2020', date: '2020-11-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '일상적 창의성과 문제해결능력의 관계에서 공학계열 대학생의 팀워크역량과 자기주도학습력의 이중매개효과 분석',
      authors: '배성아, 옥승용, 노수림',
      journal: '공학교육연구, 23(6), 17–26',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002653626',
      pdf: 'papers/Bae_et_al_2020.pdf' },
    { type: 'publication', year: '2020', date: '2020-01-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '인지욕구와 읽기처리에 관련된 인지능력 및 읽기수행과의 관계',
      authors: '노수림, 김예슬, 김미숙',
      journal: '담화와 인지, 27(1), 103–121',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002561909',
      pdf: 'papers/Noh_et_al_2020.pdf' },
    { type: 'publication', year: '2019', date: '2019-01-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '공과대학생의 팀워크역량이 문제해결능력에 미치는 영향: 창의적 인성의 매개효과',
      authors: '배성아, 옥승용, 노수림',
      journal: '공학교육연구, 22(3), 32–40',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002471330',
      pdf: 'papers/Bae_et_al_2019.pdf' },
    { type: 'publication', year: '2019', date: '2019-10-01', badge: 'badge-gold', badgeText: 'KCI',
      title: 'Adult Age Differences in On-line Sentence Processing of Korean Relative Clauses',
      authors: '김미숙, 노수림',
      journal: '담화와 인지, 26(3), 23–42',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002494479',
      pdf: 'papers/Kim_et_al_2019.pdf' },
    { type: 'publication', year: '2019', date: '2019-06-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '중·노년기 주관적 연령이 주관적 안녕감과 우울에 미치는 영향: 삶의 의미의 매개효과',
      authors: '이은별, 노수림',
      journal: '한국노년학, 39(2), 363–388',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002469627',
      pdf: 'papers/Lee_et_al_2019.pdf' },
    { type: 'publication', year: '2019', date: '2019-12-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '군신체검사를 받은 후기 청소년에서 중증근무력증의 다면적 인성검사 결과',
      authors: '성혜윤, 이종국, 오중근, 서정석, 노수림, 김태현, 남범우',
      journal: '정신신체의학, 27(2), 85–89',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002545683',
      pdf: 'papers/Seong_et_al_2019.pdf' },
    { type: 'publication', year: '2017', date: '2017-01-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '삶의 의미가 미래시간조망에 미치는 영향: 정적 정서와 부적 정서의 매개효과',
      authors: '한경훈, 김병조, 노수림',
      journal: '사회과학연구, 28(1), 41–60',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002194172',
      pdf: 'papers/Han_et_al_2017.pdf' },
    { type: 'publication', year: '2017', date: '2017-06-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '한글문장이해에서 청년과 노인의 심적 모사를 통한 상황모형 표상 비교',
      authors: '노수림, 소요섭, 김미숙',
      journal: '한국심리학회지: 인지 및 생물, 29(2), 189–196',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002222007',
      pdf: 'papers/Noh_et_al_2017.pdf' },
    { type: 'publication', year: '2016', date: '2016-01-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '한국 중·노년의 미래시간조망이 주관적 안녕감에 미치는 영향',
      authors: '한경훈, 노수림',
      journal: '사회과학연구, 27(1), 181–197',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002077361',
      pdf: 'papers/Han_et_al_2016.pdf' },
    { type: 'publication', year: '2016', date: '2016-07-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '만성통증 환자의 불안정애착이 대인관계 문제에 미치는 영향',
      authors: '박유리, 정샛별, 노수림, 김영훈, 조성근',
      journal: '사회과학연구, 27(3), 3–17',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002130540',
      pdf: 'papers/Park_et_al_2016.pdf' },
    { type: 'publication', year: '2016', date: '2016-06-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '대학생의 개인 심리 특성이 안전행동에 미치는 영향 탐색',
      authors: '배성아, 노수림, 옥승용',
      journal: '한국안전학회지, 31(3), 102–108',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002121748',
      pdf: 'papers/Bae_et_al_2016.pdf' },

    { type: 'publication', year: '2026', date: '2026-06-30', badge: 'badge-gold', badgeText: 'KCI',
      title: '한국 중ㆍ고령 성인의 스트레스, 외로움 및 사회적 관계망 간의 종단적 상호관계: 무선절편 교차지연 패널모형(RI-CLPM) 분석',
      authors: '윤소영, 이승철, 노수림',
      journal: 'STRESS, 34(2), 81–93',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003350177',
      pdf: 'papers/Yoon_et_al_2026.pdf' },

    { type: 'publication', year: '2025', date: '2025-12-01', badge: 'badge-gold', badgeText: 'KCI',
      title: 'Quantifier-Spreading in Korean Children and Adults: Evidence from an Eye-Tracking Study',
      authors: '김미숙, 노수림',
      journal: 'Korean Journal of Applied Linguistics, 41(4), 35–67',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003284712',
      pdf: 'papers/Kim_et_al_2025.pdf' },

    { type: 'publication', year: '2025', date: '2025-05-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '메타버스 체험방식이 기억과 몰입감에 미치는 영향',
      authors: '이승철, 홍우평, 한경훈, 노수림',
      journal: 'The Journal of the Convergence on Culture Technology (JCCT), 11(3), 545–559',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003207392',
      pdf: 'papers/Lee_et_al_2025b.pdf' },

    { type: 'publication', year: '2025', date: '2025-06-30', badge: 'badge-gold', badgeText: 'KCI',
      title: '중고령자의 외로움이 스트레스에 미치는 영향: 사회적 상호작용 불안과 자기통제력의 이중 매개효과',
      authors: '이승철, 최원일, 윤소영, 노수림',
      journal: 'STRESS, 33(2), 93–102',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003218455',
      pdf: 'papers/Lee_et_al_2025.pdf' },

    { type: 'publication', year: '2024', date: '2024-03-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '중고령성인의 자기통제력이 외로움에 미치는 영향: 사회적 배제와 좌절된 소속감의 매개효과',
      authors: '노수림, 최원일, 김주현',
      journal: '한국심리학회지: 건강, 29(1), 127–156',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003046980',
      pdf: 'papers/Noh_et_al_2024.pdf' },

    { type: 'publication', year: '2024', date: '2024-12-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '기능성 게임을 활용한 경도인지장애 선별도구에 대한 체계적 고찰',
      authors: '전봄이, 이경주, 노수림, 심예린, 윤대현, 조성근',
      journal: '한국심리학회지: 건강, 29(6), 951–975',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003139874',
      pdf: 'papers/Jeon_et_al_2024.pdf' },

    { type: 'publication', year: '2024', date: '2024-12-31', badge: 'badge-gold', badgeText: 'KCI',
      title: 'Exploring the Applicability of Digital Neuropsychological Assessments: A Comparative Study of CANTAB and CERAD-K in Elderly Koreans',
      authors: '이승철, 조성근, 심예린, 윤소영, 노수림',
      journal: '한국자료분석학회지, 26(6), 1721–1738',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003154347',
      pdf: 'papers/Lee_et_al_2024.pdf' },

    { type: 'publication', year: '2023', date: '2023-09-01', badge: 'badge-gold', badgeText: 'KCI',
      title: 'Validation of the Korean Version of the Awareness of Age-Related Change (AARC) Questionnaire in a Sample of Middle-aged and Older Adults',
      authors: '문선현, 엄진섭, 최원일, Allyson Brothers, 노수림',
      journal: '한국심리학회지: 건강, 28(3), 789–815',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002961090',
      pdf: 'papers/Moon_et_al_2023.pdf' },

    { type: 'publication', year: '2023', date: '2023-06-30', badge: 'badge-gold', badgeText: 'KCI',
      title: 'AI 스피커의 시각적 피드백 제시가 청년 및 중·장년 사용자의 지속사용의도에 미치는 영향: 사용자의 정서경험과 호감도의 이중매개 효과를 중심으로',
      authors: '이승철, 문선현, 노수림',
      journal: '한국자료분석학회지, 25(3), 1161–1175',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002970273',
      pdf: 'papers/Lee_et_al_2023.pdf' },

    { type: 'publication', year: '2024', date: '2024-03-01', badge: 'badge-gold', badgeText: 'KCI',
      title: 'Investigating the Comprehension of Passive Sentences in Korean Children: An Eye-Tracking Study',
      authors: '김미숙, 노수림',
      journal: '한국응용언어학, 40(1), 43–68',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003066637',
      pdf: 'papers/Kim_et_al_2024.pdf' },

    { type: 'publication', year: '2018', date: '2018-01-01', badge: 'badge-gold', badgeText: 'KCI',
      title: 'Predictive Representation for Upcoming Linguistic Input in Younger and Older Adults',
      authors: '윤홍옥, 문선현, 노수림',
      journal: 'Language and Information, 22(2), 1–25',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002371324',
      pdf: 'papers/Yun_et_al_2018.pdf' },

    // 학술발표
    { type: 'presentation', year: '2025', date: '2025-07-03', badge: 'badge-muted', badgeText: '국내',
      title: '아동과 청년의 전칭 양화사 문장 이해: 안구 운동 추적 연구',
      authors: '이승철, 김미숙, 김혜민, 노수림',
      venue: '한국심리언어학회 정기학술대회, 서울, 대한민국. (구두 발표)',
      abstract: 'presentations/abstracts/Lee_et_al_2025_KPLS.pdf' },
    { type: 'presentation', year: '2025', date: '2025-08-21', badge: 'badge-muted', badgeText: '국내',
      title: '청소년 스마트폰 의존의 종단적 변화 궤적 및 잠재 유형 분석: 성장 혼합 모형 적용',
      authors: '최유준, 이승철, 이은빈, 전수영, 노수림',
      venue: '제79차 한국심리학회 연차학술대회, 일산, 대한민국. (포스터 발표)',
      poster: 'presentations/posters/Choi_et_al_2025_KPS79.pdf' },
    { type: 'presentation', year: '2025', date: '2025-08-21', badge: 'badge-muted', badgeText: '국내',
      title: '외로움이 생애주기별 인지 편향(주의, 기억, 표정 해석)에 미치는 영향',
      authors: '이승철, 김혜민, 김민주, 김아중, 노수림',
      venue: '제79차 한국심리학회 연차학술대회, 일산, 대한민국. (포스터 발표)',
      abstract: 'presentations/abstracts/Lee_et_al_2025_KPS79.pdf',
      poster: 'presentations/posters/Lee_et_al_2025_KPS79.pdf' },
    { type: 'presentation', year: '2025', date: '2025-11-01', badge: 'badge-muted', badgeText: '국내',
      title: '디지털 인지검사를 활용한 전통적 신경심리평가 수행 추정: 지역사회 노년층 대상 머신러닝 연구',
      authors: '이승철, 김혜민, 노수림',
      venue: '한국발달심리학회 창립 50주년 학술대회 및 심포지엄, 서울, 대한민국. (포스터 발표)',
      abstract: 'presentations/abstracts/Lee_et_al_2025_KDPA50.pdf',
      poster: 'presentations/posters/Lee_et_al_2025_KDPA50.pdf' },
    { type: 'presentation', year: '2025', date: '2025-11-01', badge: 'badge-muted', badgeText: '국내',
      title: '청소년 스마트폰 의존의 종단적 변화 궤적: 관계적 요인의 예측력과 학업 성과에 미치는 영향',
      authors: '최유준, 이승철, 김민주, 이은빈, 노수림',
      venue: '한국발달심리학회 창립 50주년 학술대회 및 심포지엄, 서울, 대한민국. (포스터 발표)',
      poster: 'presentations/posters/Choi_et_al_2025_KDPA50.pdf' },
    { type: 'presentation', year: '2025', date: '2025-11-01', badge: 'badge-muted', badgeText: '국내',
      title: '중·고령 성인의 사회적 고립과 외로움의 종단적 관계: 자기통제력의 매개효과',
      authors: '서수정, 이승철, 김혜민, 노수림',
      venue: '한국발달심리학회 창립 50주년 학술대회 및 심포지엄, 서울, 대한민국. (포스터 발표)',
      poster: 'presentations/posters/Seo_et_al_2025_KDPA50.pdf' },
    { type: 'presentation', year: '2025', date: '2025-11-01', badge: 'badge-muted', badgeText: '국내',
      title: '중고령 성인의 노화 인식이 삶의 의미에 미치는 영향: 자기혐오와 무망감의 순차적 매개에서 낙관성의 조절된 매개효과',
      authors: '이승철, 김혜민, 노수림',
      venue: '한국건강심리학회 제70차 동계학술대회, 서울, 대한민국. (포스터 발표)',
      abstract: 'presentations/abstracts/Lee_et_al_2025_KHPA70.pdf',
      poster: 'presentations/posters/Lee_et_al_2025_KHPA70.pdf' },
    { type: 'presentation', year: '2025', date: '2025-05-01', badge: 'badge-muted', badgeText: '국내',
      title: '중고령 성인의 외로움이 스트레스에 미치는 영향: 사회적 상호작용 불안과 자기통제력의 순차적 매개효과',
      authors: '이승철, 윤소영, 김혜민, 노수림',
      venue: '한국건강심리학회 제69차 춘계학술대회, 공주, 대한민국. (포스터 발표)',
      abstract: 'presentations/abstracts/Lee_et_al_2025_KHPA69.pdf',
      poster: 'presentations/posters/Lee_et_al_2025_KHPA69.pdf' },
    { type: 'presentation', year: '2024', date: '2024-11-02', badge: 'badge-muted', badgeText: '국내',
      title: '아동과 성인의 전칭 양화사 문장해석에서의 오류 양상: 안구운동 추적 연구',
      authors: '윤소영, 이승철, 김미숙, 노수림',
      venue: '한국발달심리학회 학술대회 및 심포지엄, 서울, 대한민국. (포스터 발표)',
      abstract: 'presentations/abstracts/Yun_et_al_2024_KDPA.pdf' },
    { type: 'presentation', year: '2024', date: '2024-07-21', badge: 'badge-muted', badgeText: '국제',
      title: 'Validity of computerized neuropsychological assessment in healthy middle-aged and elderly Koreans',
      authors: '이승철, 노수림, 조성근, 심예린',
      venue: '33rd International Congress of Psychology, Prague, Czech Republic. (Poster presentation)',
      poster: 'presentations/posters/Lee_et_al_2024_ICP33.pdf' },
    { type: 'presentation', year: '2024', date: '2024-05-01', badge: 'badge-muted', badgeText: '국내',
      title: '중고령 성인의 외로움이 우울에 미치는 영향: 주관적 기억 감퇴의 매개 역할을 중심으로',
      authors: '이승철, 윤소영, 노수림',
      venue: '한국건강심리학회 창립 30주년 기념행사 및 제67차 춘계학술대회, 대전, 대한민국. (포스터 발표)',
      poster: 'presentations/posters/Lee_et_al_2024_KHPA67.pdf' },

    // 연구과제
    { type: 'grant', date: '2024-01-01', status: '현재 진행',
      title: '한국연구재단 일반연구자지원사업',
      description: '영유아 언어·사회성 발달의 디지털 환경 영향 종단 연구',
      period: '2024–2027' },
    { type: 'grant', date: '2023-01-01', status: '현재 진행',
      title: 'BK21 미래인재육성사업',
      description: '아동·청소년 발달심리 인재 양성',
      period: '2023–2027' },
    { type: 'grant', date: '2021-01-01', status: '완료',
      title: '한국연구재단 신진연구자지원사업',
      description: '팬데믹 전후 영유아 발달 패턴 비교 연구',
      period: '2021–2023' },
  ],

  newsletter: [
    // 소식지 추가 시 이 배열에 객체 추가.
    // 목록은 줄에 매달린 폴라로이드로 보이고, 클릭하면 모달에 body 가 열린다.
    // image 있으면 인화면에 사진(정사각으로 잘림), 없으면 빈 인화지.
    // {
    //   id: 2,
    //   date: 'YYYY-MM-DD',           // 게시일. 목록은 이 날짜로 정렬되고 폴라로이드에도 찍힌다
    //                                 // (행사 날짜·사진 촬영일과 달라도 된다)
    //   title: '제목',                 // 모달 제목. caption 이 없으면 폴라로이드 밑에도 이 글이 들어간다
    //   caption: '짧은 한 줄',          // 선택 — 폴라로이드 아래 여백에 적는 글 (세 줄까지, 넘치면 잘림)
    //   image: 'images/newsletter/<촬영일>_<행사코드>_01.jpeg',   // 선택 — 없으면 빈 인화지
    //   body: `<p>내용</p>`
    // }
    //
    // 사진이 여러 장이면 image 대신 images 배열을 쓴다. 폴라로이드에는 첫 장이 걸리고
    // (장수가 인화면 구석에 표시된다), 모달에서 화살표·방향키·손가락으로 넘겨 본다.
    //   images: ['images/newsletter/..._01.jpeg', 'images/newsletter/..._02.jpeg']
    //
    // 사진을 새로 넣을 때: images/newsletter/ 에 넣고 파일명을
    //   <촬영일>_<행사코드>_<번호>.jpeg (예: 2026-07-22_ICAP_01.jpeg) 로 맞춘 뒤
    //   python3 tools/make-newsletter-thumbs.py 를 실행한다.
    //   목록용 정사각 썸네일(thumb/)은 그 스크립트가 만들고 경로는 자동으로 붙으므로
    //   여기에는 image 만 적으면 된다.
    //   ※ 카카오톡 파일명의 날짜는 '전송한 날'이라 촬영일과 다를 수 있다 (스크립트가 EXIF 로 확인해 준다)
    {
      id: 1,
      date: '2026-05-27',        // 소식지를 올린 날 (사진 촬영일과 다르다 — 아래 참고)
      title: 'Health & Society 학술대회 포스터 발표',
      // 사진 촬영일은 2025-12-12, 행사는 한국건강심리학회 제70차 동계학술대회.
      // 'Health & Society' 는 그 학술대회의 주제다 (명찰·포스터로 확인).
      // 날짜가 어긋나 보이지만 맞는 것 — date 는 게시일이므로 고치지 말 것.
      images: [
        'images/newsletter/2025-12-12_KHPA70_01.jpeg',
        'images/newsletter/2025-12-12_KHPA70_02.jpeg'
      ],
      body: `<p>승철 연구원이 Health &amp; Society 학술대회에서 포스터 발표를 진행했습니다.</p>`
    },
    {
      id: 2,
      date: '2026-05-20',
      title: '연구실 신입 구성원 소개',
      body: `<p>새로운 연구실 구성원을 소개합니다.</p>`
    }
  ]

};
