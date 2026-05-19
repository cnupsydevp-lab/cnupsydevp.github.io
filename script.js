document.addEventListener('DOMContentLoaded', () => {
  // 현재 페이지 active 네비 링크
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // prefers-reduced-motion 이면 애니메이션 전부 건너뜀
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  initScrollReveal();
  initNavScroll();
});

function initScrollReveal() {
  // 그리드 컨테이너에 stagger 클래스 — CSS transition-delay로 순차 표시
  document.querySelectorAll('.card-grid, .steps-grid, .info-grid, .member-grid, .stats-grid, .notice-list')
    .forEach(g => g.classList.add('stagger'));

  // 뷰포트 진입 시 reveal 처리할 대상들
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
