// posts.js의 데이터에서 각 섹션의 최신 날짜를 자동으로 가져옴
// activities는 posts.js에 없으므로 수동 관리 (null이면 비활성)
function _latestDate(arr) {
  if (!arr?.length) return null;
  return arr.reduce((max, p) => (p.date > max ? p.date : max), '');
}
const NOTIF_LATEST = {
  notices:       _latestDate(typeof POSTS !== 'undefined' ? POSTS.notices       : null),
  newsletter:    _latestDate(typeof POSTS !== 'undefined' ? POSTS.newsletter    : null),
  activities:    null,
  participation: _latestDate(typeof POSTS !== 'undefined' ? POSTS.participation : null),
};

document.addEventListener('DOMContentLoaded', () => {
  initDropdowns();
  initNotifBadge();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  initScrollReveal();
  initNavScroll();
});

function initScrollReveal() {
  document.querySelectorAll('.card-grid, .steps-grid, .info-grid, .member-grid, .stats-grid, .notice-list')
    .forEach(g => g.classList.add('stagger'));

  const targets = document.querySelectorAll(
    '.card, .step, .info-card, .member-card, .notice-item, ' +
    '.list-block, .about-visual, .map-placeholder, .ornament, ' +
    '.stats-grid > div, .profile-grid'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  targets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

function initNavScroll() {
  const nav = document.querySelector('.site-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
}

function initDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  const page = window.location.pathname.split('/').pop() || 'index.html';

  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.nav-dropdown-btn');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // 다른 드롭다운 닫기
      dropdowns.forEach(d => {
        if (d !== dropdown) {
          d.classList.remove('open');
          d.querySelector('.nav-dropdown-btn').setAttribute('aria-expanded', 'false');
        }
      });
      const isOpen = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    // 현재 페이지가 드롭다운 하위 페이지이면 버튼 + 해당 링크 active
    dropdown.querySelectorAll('a').forEach(a => {
      if (a.getAttribute('href') === page) {
        btn.classList.add('active');
        a.classList.add('active');
      }
    });
  });

  // 외부 클릭 시 모두 닫기
  document.addEventListener('click', () => {
    dropdowns.forEach(d => {
      d.classList.remove('open');
      d.querySelector('.nav-dropdown-btn').setAttribute('aria-expanded', 'false');
    });
  });

  // ESC 키로 모두 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(d => {
        d.classList.remove('open');
        d.querySelector('.nav-dropdown-btn').setAttribute('aria-expanded', 'false');
      });
    }
  });
}

function initNotifBadge() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  // 해당 목록 페이지 방문 시 읽음 처리
  const markSeen = { 'notices.html': 'notices', 'newsletter.html': 'newsletter',
                     'activities.html': 'activities', 'participation.html': 'participation' };
  const section = markSeen[page];
  if (section && NOTIF_LATEST[section]) {
    localStorage.setItem(`dpwl_seen_${section}`, NOTIF_LATEST[section]);
  }

  // 공지사항 드롭다운 도트 (notices + newsletter)
  const noticeDot = document.querySelector('.nav-notif-dot:not([data-notif])');
  if (noticeDot) noticeDot.hidden = !(isUnseen('notices') || isUnseen('newsletter'));

  // 연구활동 / 연구참여 개별 도트
  document.querySelectorAll('.nav-notif-dot[data-notif]').forEach(dot => {
    dot.hidden = !isUnseen(dot.dataset.notif);
  });
}

function isUnseen(section) {
  const latest = NOTIF_LATEST[section];
  if (!latest) return false;
  const seen = localStorage.getItem(`dpwl_seen_${section}`);
  return !seen || latest > seen;
}
