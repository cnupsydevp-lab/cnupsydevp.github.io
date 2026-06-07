// 게시글 데이터
// 새 글 추가: 해당 배열에 객체 추가 (id는 순서대로 증가)
// body: HTML 문자열 (단락은 <p>, 줄바꿈은 <br>, 목록은 <ul><li>)

const POSTS = {

  notices: [
    {
      id: 1,
      date: '2026-03-02',
      badge: 'badge-muted',
      badgeText: '일반',
      title: '2026학년도 1학기 랩 세미나 일정 안내',
      body: `<p>내용을 준비 중입니다.</p>`
    },
    {
      id: 2,
      date: '2025-11-20',
      badge: 'badge-gold',
      badgeText: '모집',
      title: '2026학년도 대학원 신입생 모집 일정 안내 (석·박사 통합)',
      body: `<p>내용을 준비 중입니다.</p>`
    },
    {
      id: 3,
      date: '2026-05-27',
      badge: 'badge-muted',
      badgeText: '일반',
      title: '2026학년도 하계 방학 중 연구실 운영 안내',
      body: `<p>하계 방학 기간(7월 14일 ~ 8월 22일) 중 연구실은 정상 운영됩니다.</p><p>문의 사항은 이메일로 연락 주시기 바랍니다.</p>`
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
      authors: 'Kyung Ji Moon, Myung Chul Lee, Upyong Hong, Soo Rim Noh, Chang Hoon Park, Kyung Hun Han',
      journal: 'The Asian Journal of Kinesiology, 23(3), 11–19',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002742492',
      pdf: 'papers/KCI_FI002742492.pdf' },
    { type: 'publication', year: '2021', date: '2021-06-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '어휘력과 작업기억이 청년과 노인의 문장 읽기 효율성에 미치는 영향',
      authors: '노수림, 문선현',
      journal: '한국자료분석학회지, 23(3), 1343–1353',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002730870',
      pdf: 'papers/Noh_et_al_2021.pdf' },
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
      url: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE10059620',
      pdf: 'papers/Bae_et_al_2016.pdf' },

    { type: 'publication', year: '2025', date: '2025-06-30', badge: 'badge-gold', badgeText: 'KCI',
      title: '중고령자의 외로움이 스트레스에 미치는 영향: 사회적 상호작용 불안과 자기통제력의 이중 매개효과',
      authors: '이승철, 최원일, 윤소영, 노수림',
      journal: 'STRESS, 33(2), 93–102',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003218455',
      pdf: 'papers/Lee_et_al_2025.pdf' },

    { type: 'publication', year: '2024', date: '2024-12-31', badge: 'badge-gold', badgeText: 'KCI',
      title: 'Exploring the Applicability of Digital Neuropsychological Assessments: A Comparative Study of CANTAB and CERAD-K in Elderly Koreans',
      authors: '이승철, 조성근, 심예린, 윤소영, 노수림',
      journal: '한국자료분석학회지, 26(6), 1721–1738',
      url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003154347',
      pdf: 'papers/Lee_et_al_2024.pdf' },

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
    { type: 'presentation', year: '2025', date: '2025-01-01', badge: 'badge-muted', badgeText: '국제',
      title: 'SRCD Biennial Meeting — "Resilience trajectories across adolescence: A 10-year longitudinal study" (구두 발표, Washington D.C.)' },
    { type: 'presentation', year: '2025', date: '2025-01-01', badge: 'badge-muted', badgeText: '국내',
      title: '한국발달심리학회 연차학술대회 — 영유아 언어 발달과 디지털 미디어 노출의 상호작용 (포스터, 서울)' },
    { type: 'presentation', year: '2024', date: '2024-01-01', badge: 'badge-muted', badgeText: '국제',
      title: 'ISSBD 28th Biennial Meeting — "Executive function development and digital media use in Korean preschoolers" (포스터, Lisbon)' },
    { type: 'presentation', year: '2024', date: '2024-01-01', badge: 'badge-muted', badgeText: '국내',
      title: '한국심리학회 연차학술대회 — 팬데믹 전후 영유아 사회·정서 발달 비교 (구두 발표, 부산)' },

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
    // 소식지 추가 시 이 배열에 객체 추가
    // image 있으면 피드에 사진 표시, 없으면 텍스트 카드 표시
    // {
    //   id: 2,
    //   date: 'YYYY-MM-DD',
    //   title: '제목',
    //   image: 'images/파일명.jpg',   // 선택 — 없으면 텍스트 카드
    //   body: `<p>내용</p>`
    // }
    {
      id: 1,
      date: '2026-05-27',
      title: 'Health & Society 학술대회 포스터 발표',
      image: 'images/HealthSociety_Seungcheol.jpeg',
      body: `<p>승철 연구원이 Health &amp; Society 학술대회에서 포스터 발표를 진행했습니다.</p>`
    },
    {
      id: 2,
      date: '2026-05-20',
      title: '연구실 신입 구성원 소개',
      image: 'images/Seungcheol.jpeg',
      body: `<p>새로운 연구실 구성원을 소개합니다.</p>`
    }
  ]

};
