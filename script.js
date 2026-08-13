// posts.js의 데이터에서 각 섹션의 최신 날짜를 자동으로 가져옴.
// 네 섹션(공지·소식지·연구활동·연구참여) 모두 posts.js 에서 읽는다 — 수동 관리는 없다.
// 배열이 비었거나 posts.js 가 아직 안 실렸으면 null 이 되고, 그 섹션의 알림 도트는 뜨지 않는다.
// (2026-08-13: 'activities 는 수동 관리' 라고 적혀 있던 주석을 고쳤다 — 실제로는 아래 10번째 줄에서
//  POSTS.activities 를 읽는다. 연구활동 글을 추가하면 알림 도트도 함께 따라온다.)
function _latestDate(arr) {
  if (!arr?.length) return null;
  return arr.reduce((max, p) => (p.date > max ? p.date : max), '');
}
const NOTIF_LATEST = {
  notices:       _latestDate(typeof POSTS !== 'undefined' ? POSTS.notices       : null),
  newsletter:    _latestDate(typeof POSTS !== 'undefined' ? POSTS.newsletter    : null),
  activities:    _latestDate(typeof POSTS !== 'undefined' ? POSTS.activities    : null),
  participation: _latestDate(typeof POSTS !== 'undefined' ? POSTS.participation : null),
};

document.addEventListener('DOMContentLoaded', () => {
  initActiveNav();
  initDropdowns();
  initNotifBadge();
  initMobileNav();
  initBackToTop();
  initRipple();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  initScrollReveal();
  initNavScroll();
});

// 현재 페이지에 해당하는 상단 메뉴 링크에 active 표시
// (내비 마크업이 partials/nav.html 단일 소스라 페이지별 하드코딩 대신 JS가 처리)
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > li > a, .nav-home').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

function initScrollReveal() {
  document.querySelectorAll('.card-grid, .info-grid, .member-grid, .notice-list')
    .forEach(g => g.classList.add('stagger'));

  const targets = document.querySelectorAll(
    '.card, .info-card, .member-card, .notice-item, .about-visual, .profile-grid'
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
  if (noticeDot) setNotifDot(noticeDot, isUnseen('notices') || isUnseen('newsletter'));

  // 연구활동 / 연구참여 개별 도트
  document.querySelectorAll('.nav-notif-dot[data-notif]').forEach(dot => {
    setNotifDot(dot, isUnseen(dot.dataset.notif));
  });
}

// 도트 표시 — 붉은 점만 띄운다 (텍스트 라벨 없음)
function setNotifDot(dot, show) {
  dot.hidden = !show;
}

// 메뉴 라벨은 첫 텍스트 노드만 쓴다 — 앞에 붙은 도트 span 과 화살표 SVG 를 건너뛰기 위함.
function navLabel(el) {
  const first = [...el.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
  return (first ? first.textContent : el.textContent).trim();
}

// 데스크톱 내비의 도트 상태를 모바일 메뉴로 복제 (숨겨진 상태면 null)
function cloneNotifDot(sourceDot) {
  if (!sourceDot || sourceDot.hidden) return null;
  const dot = document.createElement('span');
  dot.className = 'nav-notif-dot';
  if (sourceDot.dataset.notif) dot.dataset.notif = sourceDot.dataset.notif;
  return dot;
}

function isUnseen(section) {
  const latest = NOTIF_LATEST[section];
  if (!latest) return false;
  const seen = localStorage.getItem(`dpwl_seen_${section}`);
  return !seen || latest > seen;
}

function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  if (!hamburger) return;

  const siteNav = document.querySelector('.site-nav');
  const desktopLinks = document.querySelectorAll('.nav-links > li');
  const page = window.location.pathname.split('/').pop() || 'index.html';

  const overlay = document.createElement('div');
  overlay.className = 'nav-mobile-overlay';
  overlay.id = 'nav-mobile-overlay';

  const ul = document.createElement('ul');
  ul.className = 'nav-mobile-links';

  // 홈 버튼(.nav-home)은 nav-links 밖에 있어 아래 desktopLinks 루프에 안 잡히므로 수동 추가
  const homeBtn = document.querySelector('.nav-home');
  if (homeBtn) {
    const mLi = document.createElement('li');
    const mA = document.createElement('a');
    mA.href = homeBtn.getAttribute('href');
    mA.textContent = '홈';
    if (mA.getAttribute('href') === page) mA.classList.add('active');
    mA.addEventListener('click', closeMenu);
    mLi.appendChild(mA);
    ul.appendChild(mLi);
  }

  desktopLinks.forEach(li => {
    const mLi = document.createElement('li');

    if (li.classList.contains('nav-dropdown')) {
      const desktopBtn = li.querySelector('.nav-dropdown-btn');
      const desktopItems = li.querySelectorAll('.nav-dropdown-menu a');

      const mBtn = document.createElement('button');
      mBtn.className = 'nav-mobile-section-btn';
      mBtn.innerHTML = `<span class="nav-mobile-label"></span> <svg class="nav-mobile-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
      const mBtnLabel = mBtn.querySelector('.nav-mobile-label');
      mBtnLabel.textContent = navLabel(desktopBtn);
      const btnDot = cloneNotifDot(desktopBtn.querySelector('.nav-notif-dot'));
      if (btnDot) mBtnLabel.prepend(btnDot);

      const mSub = document.createElement('ul');
      mSub.className = 'nav-mobile-sub';

      let childActive = false;
      desktopItems.forEach(a => {
        const href = a.getAttribute('href');
        const mSubLi = document.createElement('li');
        const mA = document.createElement('a');
        mA.href = href;
        mA.textContent = navLabel(a);
        const subDot = cloneNotifDot(a.querySelector('.nav-notif-dot'));
        if (subDot) mA.prepend(subDot);
        if (href === page) { mA.classList.add('active'); childActive = true; }
        mA.addEventListener('click', closeMenu);
        mSubLi.appendChild(mA);
        mSub.appendChild(mSubLi);
      });

      if (childActive) { mBtn.classList.add('open'); mSub.classList.add('open'); }

      mBtn.addEventListener('click', () => {
        const isOpen = mBtn.classList.toggle('open');
        mSub.classList.toggle('open', isOpen);
      });

      mLi.appendChild(mBtn);
      mLi.appendChild(mSub);
    } else {
      const a = li.querySelector('a');
      const href = a.getAttribute('href');
      const mA = document.createElement('a');
      mA.href = href;
      const mLabel = document.createElement('span');
      mLabel.className = 'nav-mobile-label';
      mLabel.textContent = navLabel(a);
      const linkDot = cloneNotifDot(a.querySelector('.nav-notif-dot'));
      if (linkDot) mLabel.prepend(linkDot);
      mA.appendChild(mLabel);
      if (href === page) mA.classList.add('active');
      mA.addEventListener('click', closeMenu);
      mLi.appendChild(mA);
    }
    ul.appendChild(mLi);
  });

  overlay.appendChild(ul);
  document.body.appendChild(overlay);

  // Tab 포커스를 오버레이 안에 가둠 (열려 있는 동안)
  overlay.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const items = overlay.querySelectorAll('a, button, input');
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  function updateTop() {
    overlay.style.top = siteNav.getBoundingClientRect().height + 'px';
  }
  updateTop();
  window.addEventListener('resize', updateTop, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      // 첫 메뉴 항목으로 포커스 이동 (검색 입력은 제외 — 키보드 자동 팝업 방지)
      const first = ul.querySelector('a, button');
      if (first) first.focus();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) closeMenu();
  });

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.focus();   // 포커스를 연 곳으로 복귀
  }
}

function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', '맨 위로');
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 320);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initRipple() {
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
      this.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
    });
  });
}

