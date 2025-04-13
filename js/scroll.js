document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    function checkScroll() {
        if (hero) {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            if (window.scrollY > heroBottom - header.offsetHeight) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // 監聽滾動事件
    window.addEventListener('scroll', checkScroll);
    // 初始檢查
    checkScroll();
}); 