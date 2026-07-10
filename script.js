// posts.js의 데이터에서 각 섹션의 최신 날짜를 자동으로 가져옴
// activities는 posts.js에 없으므로 수동 관리 (null이면 비활성)
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
  initDropdowns();
  initNotifBadge();
  initMobileNav();
  initSearch();
  initBackToTop();
  initRipple();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  initScrollReveal();
  initNavScroll();
});

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

// 도트 표시 + 스크린리더용 텍스트 라벨 (색상만으로 정보 전달 방지)
function setNotifDot(dot, show) {
  dot.hidden = !show;
  if (show && !dot.querySelector('.sr-only')) {
    const label = document.createElement('span');
    label.className = 'sr-only';
    label.textContent = '(새 글)';
    dot.appendChild(label);
  }
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

  desktopLinks.forEach(li => {
    const mLi = document.createElement('li');

    if (li.classList.contains('nav-dropdown')) {
      const desktopBtn = li.querySelector('.nav-dropdown-btn');
      const desktopItems = li.querySelectorAll('.nav-dropdown-menu a');

      const mBtn = document.createElement('button');
      mBtn.className = 'nav-mobile-section-btn';
      const label = desktopBtn.childNodes[0].textContent.trim();
      mBtn.innerHTML = `${label} <svg class="nav-mobile-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

      const mSub = document.createElement('ul');
      mSub.className = 'nav-mobile-sub';

      let childActive = false;
      desktopItems.forEach(a => {
        const href = a.getAttribute('href');
        const mSubLi = document.createElement('li');
        const mA = document.createElement('a');
        mA.href = href;
        mA.textContent = a.textContent.trim();
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
      mA.textContent = a.childNodes[0]?.textContent?.trim() || a.textContent.trim();
      if (href === page) mA.classList.add('active');
      mA.addEventListener('click', closeMenu);
      mLi.appendChild(mA);
    }
    ul.appendChild(mLi);
  });

  // 모바일 검색 — 오버레이 상단에 배치, initSearch가 데스크톱 검색과 함께 초기화
  const searchForm = document.createElement('form');
  searchForm.className = 'nav-search nav-search--mobile';
  searchForm.setAttribute('role', 'search');
  searchForm.setAttribute('autocomplete', 'off');
  searchForm.innerHTML =
    '<svg class="nav-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
    '<input type="search" class="nav-search-input" placeholder="검색" aria-label="사이트 검색">' +
    '<ul class="nav-search-results" role="listbox" hidden></ul>';
  overlay.appendChild(searchForm);
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

function initSearch() {
  // 데스크톱 내비 검색 + 모바일 오버레이 검색(initMobileNav가 생성) 모두 초기화
  document.querySelectorAll('.nav-search').forEach(setupSearchForm);
}

function setupSearchForm(form) {
  const input = form.querySelector('.nav-search-input');
  const results = form.querySelector('.nav-search-results');
  if (!input || !results) return;

  // WAI-ARIA 콤보박스 패턴: input(combobox) ↔ 결과 목록(listbox/option) 연결
  setupSearchForm._seq = (setupSearchForm._seq || 0) + 1;
  const listId = results.id || (results.id = 'nav-search-results-' + setupSearchForm._seq);
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', listId);
  input.setAttribute('aria-autocomplete', 'list');

  // 사이트 주요 페이지 인덱스 (라벨 + 검색 키워드 + 이동 경로)
  const INDEX = [
    { label: '소개',        url: 'index.html',         kw: 'about 소개 홈 메인 dpwl 연구실' },
    { label: '지도교수',     url: 'pi.html',            kw: 'pi professor 교수 지도교수' },
    { label: '구성원',       url: 'members.html',       kw: 'members 구성원 연구원 팀원 대학원생' },
    { label: '연구분야',     url: 'research.html',      kw: 'research 연구 분야 논문 publications 성과' },
    { label: '연구활동',     url: 'activities.html',    kw: 'activities 연구활동 활동 세미나 학회' },
    { label: '연구참여',     url: 'participation.html', kw: 'participation 연구참여 참여 실험 모집' },
    { label: '공지사항',     url: 'notices.html',       kw: 'notices 공지사항 공지 알림' },
    { label: '소식지',       url: 'newsletter.html',    kw: 'newsletter 소식지 뉴스레터 소식' },
    { label: 'Contact',     url: 'contact.html',       kw: 'contact 연락처 문의 위치 오시는길 이메일 지도' },
    { label: '대학원 진학',  url: 'admissions.html',    kw: 'admissions 대학원 진학 입학 지원' },
    { label: '인턴',         url: 'intern.html',        kw: 'intern 인턴 인턴십' },
  ];

  let items = [];
  let activeIdx = -1;

  function close() {
    results.hidden = true;
    results.innerHTML = '';
    items = [];
    activeIdx = -1;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }

  function setActive(i) {
    items.forEach(a => {
      a.classList.remove('active');
      a.parentElement.setAttribute('aria-selected', 'false');
    });
    activeIdx = i;
    if (items[i]) {
      items[i].classList.add('active');
      const li = items[i].parentElement;
      li.setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', li.id);
    }
  }

  function render() {
    const q = input.value.trim().toLowerCase();
    if (!q) { close(); return; }
    const matches = INDEX
      .filter(e => e.label.toLowerCase().includes(q) || e.kw.toLowerCase().includes(q))
      .slice(0, 8);

    results.innerHTML = '';
    if (!matches.length) {
      const li = document.createElement('li');
      li.className = 'nav-search-empty';
      li.setAttribute('role', 'option');
      li.setAttribute('aria-disabled', 'true');
      li.textContent = '검색 결과가 없습니다';
      results.appendChild(li);
      results.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      input.removeAttribute('aria-activedescendant');
      items = [];
      activeIdx = -1;
      return;
    }
    matches.forEach((m, i) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.id = listId + '-opt-' + i;
      const a = document.createElement('a');
      a.href = m.url;
      a.textContent = m.label;
      li.appendChild(a);
      results.appendChild(li);
    });
    items = Array.from(results.querySelectorAll('a'));
    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    setActive(0);
  }

  input.addEventListener('input', render);
  input.addEventListener('focus', () => { if (input.value.trim()) render(); });

  input.addEventListener('keydown', (e) => {
    if (results.hidden || !items.length) return;
    if (e.key === 'ArrowDown')      { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
    else if (e.key === 'Escape')    { close(); input.blur(); }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = items[activeIdx] || items[0];
    if (target) window.location.href = target.getAttribute('href');
  });

  document.addEventListener('click', (e) => {
    if (!form.contains(e.target)) close();
  });
}
