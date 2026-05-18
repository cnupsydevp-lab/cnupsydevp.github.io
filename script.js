document.addEventListener('DOMContentLoaded', () => {
    // 현재 페이지 URL을 확인하여 네비게이션 메뉴에 active 클래스 추가
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-links a');
    const menuLength = menuItems.length;

    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].href === currentLocation) {
            menuItems[i].classList.add("active");
        }
    }
});
