/* ========================================
   SUMMER KISSES - SCROLL JAVASCRIPT
   ======================================== */

/*
    本檔案負責 header 導覽列的滾動監聽與背景變色互動：
    - 當頁面滾動超過 hero 區塊底部時，為 header 加上 .scrolled 類別（由 CSS 控制背景色）
    - 主要搭配 css/header-navigation.css 及 index.html header 結構
    - 不更動 header 內容，只負責 class 切換
*/

// ===== GLOBAL VARIABLES =====
let header, hero;

// ===== SCROLL EFFECTS =====

/**
 * 檢查滾動位置並更新頁首樣式
 * 當滾動超過 hero 區塊底部時，為頁首添加背景色
 */
function checkScroll() {
    if (!hero || !header) {
        console.warn('找不到必要的 DOM 元素:', { header: !!header, hero: !!hero });
        return;
    }
    
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollThreshold = heroBottom - header.offsetHeight;
    const currentScrollY = window.scrollY;
    
    console.log('滾動檢查:', {
        heroBottom,
        scrollThreshold,
        currentScrollY,
        shouldAddBackground: currentScrollY > scrollThreshold
    });
    
    if (currentScrollY > scrollThreshold) {
        if (!header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
            console.log('添加 scrolled 類別');
        }
    } else {
        if (header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
            console.log('移除 scrolled 類別');
        }
    }
}

// ===== INITIALIZATION =====

/**
 * 當 DOM 加載完成後初始化滾動效果
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 載入完成，初始化滾動效果...');
    
    // 選取 DOM 元素
    header = document.querySelector('header');
    hero = document.querySelector('.hero');
    
    console.log('DOM 元素選擇結果:', { header: !!header, hero: !!hero });
    
    if (!header || !hero) {
        console.error('找不到必要的 DOM 元素');
        return;
    }
    
    // 綁定滾動事件監聽器
    window.addEventListener('scroll', checkScroll);
    
    // 初始檢查滾動狀態
    checkScroll();
    
    console.log('滾動效果初始化完成');
}); 