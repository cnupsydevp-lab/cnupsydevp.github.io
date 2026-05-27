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

  newsletter: [
    // 소식지 추가 시 이 배열에 객체 추가
    // {
    //   id: 1,
    //   date: 'YYYY-MM-DD',
    //   badge: 'badge-gold',
    //   badgeText: '소식지',
    //   title: '제목',
    //   body: `<p>내용</p>`
    // }
  ]

};
