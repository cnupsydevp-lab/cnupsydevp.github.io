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
    { type: 'publication', year: '2025', date: '2025-01-01', badge: 'badge-navy', badgeText: 'SSCI',
      title: 'Longitudinal links between emotional regulation in infancy and resilience in adolescence',
      authors: 'Noh, S. R., et al.',
      journal: 'Developmental Psychology, 61(2), 301–318' },
    { type: 'publication', year: '2024', date: '2024-01-01', badge: 'badge-navy', badgeText: 'SSCI',
      title: 'Peer relationship quality and social competence in early childhood: A longitudinal study',
      authors: 'Kim, J., & Noh, S. R.',
      journal: 'Child Development, 95(4), 1102–1119' },
    { type: 'publication', year: '2023', date: '2023-01-01', badge: 'badge-navy', badgeText: 'SSCI',
      title: 'Screen time and executive function in preschool-aged children: A meta-analytic review',
      authors: 'Noh, S. R., & Park, H.',
      journal: 'Psychological Bulletin, 149(7), 512–540' },
    { type: 'publication', year: '2023', date: '2023-01-01', badge: 'badge-gold', badgeText: 'KCI',
      title: '팬데믹 전후 영유아 언어 발달 패턴 변화',
      authors: '노수림, 이발달',
      journal: '한국심리학회지: 발달, 36(1), 45–68' },
    { type: 'publication', year: '2022', date: '2022-01-01', badge: 'badge-navy', badgeText: 'SSCI',
      title: 'Environmental influences on language acquisition in bilingual toddlers',
      authors: 'Noh, S. R., et al.',
      journal: 'Journal of Child Language, 49(5), 978–999' },

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
