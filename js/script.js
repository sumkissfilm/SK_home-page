/* ========================================
   SUMMER KISSES - SCRIPT JAVASCRIPT
   ======================================== */

// ===== CONSTANTS =====
const SCROLL_THRESHOLD = 100;
const NAVBAR_SCROLL_THRESHOLD = 50;
const ANIMATION_DELAY = 200;
const MOBILE_BREAKPOINT = 900;
const HEADER_OFFSET = 100;

// ===== CONFIGURATION =====
const FADE_IN_OPTIONS = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const INSTAGRAM_POSTS = [
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed',
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed',
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed'
];

// ===== DOM ELEMENTS =====
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const imageItems = document.querySelectorAll('.body004 .image-item');
const instagramGrid = document.querySelector('.instagram-grid');
const dropdowns = document.querySelectorAll('.dropdown');
const hero = document.querySelector('.hero');
const navbar = document.querySelector('.navbar');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

// ===== SCROLL EFFECTS =====

/**
 * 處理頁首滾動效果
 * 注意：此功能已移至 scroll.js 統一處理
 */
function handleHeaderScroll() {
    // 此功能已移至 scroll.js 統一處理
}

/**
 * 處理導航欄滾動效果
 */
function handleNavbarScroll() {
    if (window.scrollY > NAVBAR_SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * 處理 Hero 區塊的滾動效果
 * 注意：此功能已移至 scroll.js 統一處理
 */
function handleHeroScroll() {
    // 此功能已移至 scroll.js 統一處理
}

// ===== NAVIGATION MENU =====

/**
 * 切換菜單開關狀態
 */
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

/**
 * 關閉菜單
 */
function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
}

/**
 * 處理下拉菜單點擊事件
 * @param {Event} e - 點擊事件
 */
function handleDropdownClick(e) {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
        e.preventDefault();
        const dropdown = e.currentTarget;
        dropdown.classList.toggle('active');
    }
}

// ===== SMOOTH SCROLLING =====

/**
 * 處理平滑滾動到錨點
 * @param {Event} e - 點擊事件
 */
function handleSmoothScroll(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // 在移動設備上關閉導航菜單
        closeMobileMenu();
    }
}

/**
 * 關閉移動設備上的導航菜單
 */
function closeMobileMenu() {
    if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarCollapse.classList.remove('show');
    }
}

// ===== ANIMATION EFFECTS =====

/**
 * 處理圖片動畫效果
 * @param {IntersectionObserverEntry[]} entries - 觀察器條目
 * @param {IntersectionObserver} observer - 觀察器實例
 */
function handleImageAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

/**
 * 初始化圖片動畫觀察器
 */
function initImageAnimation() {
    const imageObserver = new IntersectionObserver(handleImageAnimation, FADE_IN_OPTIONS);
    
    imageItems.forEach(item => {
        imageObserver.observe(item);
    });
}

// ===== INSTAGRAM INTEGRATION =====

/**
 * 載入 Instagram 貼文
 */
function loadInstagramPosts() {
    if (!instagramGrid) return;
    
    INSTAGRAM_POSTS.forEach((postUrl, index) => {
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'instagram-media';
        blockquote.setAttribute('data-instgrm-permalink', postUrl);
        blockquote.setAttribute('data-instgrm-version', '14');
        
        instagramGrid.appendChild(blockquote);
    });
}

/**
 * 初始化 Instagram 嵌入功能
 */
function initializeInstagram() {
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }
}

// ===== EVENT LISTENERS =====

/**
 * 綁定導航菜單事件
 */
function bindNavigationEvents() {
    // 漢堡選單切換
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // 導航連結點擊關閉菜單
    if (navLinksItems) {
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 下拉選單處理
    if (dropdowns) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', handleDropdownClick);
        });
    }
}

/**
 * 綁定滾動事件
 * 注意：Header 和 Hero 滾動效果已移至 scroll.js 統一處理
 */
function bindScrollEvents() {
    // handleHeaderScroll 已移至 scroll.js 統一處理
    window.addEventListener('scroll', handleNavbarScroll);
    // handleHeroScroll 已移至 scroll.js 統一處理
}

/**
 * 綁定平滑滾動事件
 */
function bindSmoothScrollEvents() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

/**
 * 初始化滾動狀態
 */
function initScrollState() {
    // 初始檢查導航欄滾動狀態
    if (window.scrollY > NAVBAR_SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
    }
    
    // 初始檢查頁首滾動狀態
    if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('scrolled');
    }
}

// ===== INITIALIZATION =====

/**
 * 當 DOM 加載完成後初始化所有功能
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('初始化 Summer Kisses 腳本...');
    
    // 初始化各個功能模組
    bindNavigationEvents();
    bindScrollEvents();
    bindSmoothScrollEvents();
    initScrollState();
    initImageAnimation();
    
    // 初始化 Instagram 功能
    loadInstagramPosts();
    initializeInstagram();
    
    console.log('Summer Kisses 腳本初始化完成');
});