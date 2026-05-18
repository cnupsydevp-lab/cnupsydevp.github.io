document.addEventListener('DOMContentLoaded', () => {
    // 현재 페이지 URL 확인
    const currentLocation = window.location.pathname.split("/").pop();
    const menuItems = document.querySelectorAll('.nav-links a');

    menuItems.forEach(item => {
        const itemLocation = item.getAttribute('href');
        // 현재 페이지와 메뉴 링크가 일치하면 active 클래스 추가
        if (itemLocation === currentLocation || (currentLocation === "" && itemLocation === "index.html")) {
            item.classList.add("active");
        }
    });
});
