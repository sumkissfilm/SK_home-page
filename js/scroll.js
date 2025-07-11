/* ========================================
   SUMMER KISSES - SCROLL JAVASCRIPT
   ======================================== */

// ===== DOM ELEMENTS =====
const header = document.querySelector('header');
const hero = document.querySelector('.hero');

// ===== SCROLL EFFECTS =====

/**
 * 檢查滾動位置並更新頁首樣式
 * 當滾動超過 hero 區塊底部時，為頁首添加背景色
 */
function checkScroll() {
    if (!hero || !header) return;
    
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollThreshold = heroBottom - header.offsetHeight;
    
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ===== INITIALIZATION =====

/**
 * 當 DOM 加載完成後初始化滾動效果
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('初始化滾動效果...');
    
    // 綁定滾動事件監聽器
    window.addEventListener('scroll', checkScroll);
    
    // 初始檢查滾動狀態
    checkScroll();
    
    console.log('滾動效果初始化完成');
}); 