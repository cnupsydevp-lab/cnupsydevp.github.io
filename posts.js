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
    { type: 'publication', year: '2022', date: '2022-06-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '노인의 문장회상발화에서 나타난 언어적 비유창성 분석',
      authors: '노수림, 문선현, 김미숙',
      journal: '한국자료분석학회지, 24(3), 1133–1148',
      doi: 'https://doi.org/10.37727/jkdas.2022.24.3.1133',
      pdf: 'papers/Noh_et_al_2022.pdf' },
    { type: 'publication', year: '2019', date: '2019-12-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '군신체검사를 받은 후기 청소년에서 중증근무력증의 다면적 인성검사 결과',
      authors: '성혜윤, 이종국, 오중근, 서정석, 노수림, 김태현, 남범우',
      journal: '정신신체의학, 27(2), 85–89',
      pdf: 'papers/Seong_et_al_2019.pdf' },
    { type: 'publication', year: '2016', date: '2016-06-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '대학생의 개인 심리 특성이 안전행동에 미치는 영향 탐색',
      authors: '배성아, 노수림, 옥승용',
      journal: '한국안전학회지, 31(3), 102–108',
      pdf: 'papers/Bae_et_al_2016.pdf' },

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
