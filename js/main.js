/* ========================================
   SUMMER KISSES - MAIN JAVASCRIPT
   ======================================== */

// ===== GLOBAL VARIABLES =====
// 注意：header 和 hero 變數已在 scroll.js 中定義，避免重複定義

// ===== HEADER SCROLL EFFECT =====
/**
 * 當滾動超過 hero 區塊時，為 header 添加背景色
 * 注意：此功能已移至 scroll.js 統一處理
 */
function initHeaderScrollEffect() {
    // 此功能已移至 scroll.js 統一處理
    console.log('Header scroll effect 已移至 scroll.js 處理');
}

// ===== BOOTSTRAP NAVIGATION MENU =====
/**
 * 初始化 Bootstrap 導航選單功能
 */
function initBootstrapNavigation() {
    console.log('初始化 Bootstrap 導航選單...');
    
    // 獲取選單元素
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const menuCloseBtn = document.querySelector('.menu-close-btn');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // 監聽 Bootstrap 選單狀態變化
    if (navbarCollapse) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (navbarCollapse.classList.contains('show')) {
                        // 選單開啟時防止背景滾動
                        document.body.classList.add('menu-open');
                    } else {
                        // 選單關閉時恢復滾動
                        document.body.classList.remove('menu-open');
                    }
                }
            });
        });
        
        observer.observe(navbarCollapse, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    // 綁定關閉按鈕事件
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', () => {
            closeBootstrapMenu(navbarCollapse, navbarToggler);
        });
    }
    
    // 綁定導航連結點擊事件 - 點擊連結後關閉選單
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // 延遲關閉，讓連結有時間跳轉
            setTimeout(() => {
                closeBootstrapMenu(navbarCollapse, navbarToggler);
            }, 100);
        });
    });
    
    // 點擊選單外部區域關閉選單
    document.addEventListener('click', (e) => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            // 檢查點擊是否在選單外部
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                closeBootstrapMenu(navbarCollapse, navbarToggler);
            }
        }
    });
    
    // ESC 鍵關閉選單
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarCollapse && navbarCollapse.classList.contains('show')) {
            closeBootstrapMenu(navbarCollapse, navbarToggler);
        }
    });
    
    console.log('Bootstrap 導航選單初始化完成');
}

/**
 * 關閉 Bootstrap 選單
 * @param {Element} navbarCollapse - 選單容器
 * @param {Element} navbarToggler - 漢堡按鈕
 */
function closeBootstrapMenu(navbarCollapse, navbarToggler) {
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // 移除 show 類別
        navbarCollapse.classList.remove('show');
        
        // 更新漢堡按鈕狀態
        if (navbarToggler) {
            navbarToggler.classList.add('collapsed');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
        
        // 恢復背景滾動
        document.body.classList.remove('menu-open');
    }
}

// ===== NAVIGATION MENU =====
/**
 * 初始化導航菜單功能
 */
function initNavigationMenu() {
    console.log('初始化菜單...');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const navOverlay = document.querySelector('.nav-overlay');
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    
    // 調試輸出菜單結構
    logMenuStructure(dropdowns);
    
    // 綁定事件監聽器
    bindMenuEventListeners(menuToggle, navContainer, navOverlay, dropdowns);
}

/**
 * 輸出菜單結構的調試信息
 * @param {NodeList} dropdowns - 下拉菜單元素列表
 */
function logMenuStructure(dropdowns) {
    console.log('菜單項數量:', dropdowns.length);
    
    dropdowns.forEach((dropdown, i) => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = menu ? menu.querySelectorAll('li') : [];
        
        console.log(`菜單項 ${i+1}:`, link ? link.textContent : '無鏈接');
        console.log(`子菜單項數量:`, items.length);
    });
}

/**
 * 綁定菜單相關的事件監聽器
 * @param {Element} menuToggle - 菜單切換按鈕
 * @param {Element} navContainer - 導航容器
 * @param {Element} navOverlay - 導航覆蓋層
 * @param {NodeList} dropdowns - 下拉菜單列表
 */
function bindMenuEventListeners(menuToggle, navContainer, navOverlay, dropdowns) {
    // 菜單切換按鈕事件
    menuToggle.addEventListener('click', () => {
        toggleMenu(navContainer, navOverlay, dropdowns);
    });
    
    // 覆蓋層點擊關閉菜單
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            closeMenu(navContainer, navOverlay, dropdowns);
        });
    }
    
    // 下拉菜單事件
    bindDropdownEvents(dropdowns, navContainer, navOverlay);
    
    // 下拉菜單連結點擊事件
    bindDropdownLinkEvents(navContainer, navOverlay, dropdowns);
    
    // 窗口大小調整事件
    window.addEventListener('resize', () => {
        handleWindowResize(navContainer, navOverlay, dropdowns);
    });
}

/**
 * 切換菜單開關狀態
 * @param {Element} navContainer - 導航容器
 * @param {Element} navOverlay - 導航覆蓋層
 * @param {NodeList} dropdowns - 下拉菜單列表
 */
function toggleMenu(navContainer, navOverlay, dropdowns) {
    navContainer.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // 重置所有下拉菜單
    resetDropdowns(dropdowns);
}

/**
 * 關閉菜單
 * @param {Element} navContainer - 導航容器
 * @param {Element} navOverlay - 導航覆蓋層
 * @param {NodeList} dropdowns - 下拉菜單列表
 */
function closeMenu(navContainer, navOverlay, dropdowns) {
    navContainer.classList.remove('active');
    navOverlay.classList.remove('active');
    resetDropdowns(dropdowns);
}

/**
 * 重置所有下拉菜單狀態
 * @param {NodeList} dropdowns - 下拉菜單列表
 */
function resetDropdowns(dropdowns) {
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

/**
 * 綁定下拉菜單事件
 * @param {NodeList} dropdowns - 下拉菜單列表
 * @param {Element} navContainer - 導航容器
 * @param {Element} navOverlay - 導航覆蓋層
 */
function bindDropdownEvents(dropdowns, navContainer, navOverlay) {
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        if (link) {
            link.addEventListener('click', (e) => {
                handleDropdownClick(e, dropdown, dropdowns);
            });
        }
    });
}

/**
 * 處理下拉菜單點擊事件
 * @param {Event} e - 點擊事件
 * @param {Element} dropdown - 當前下拉菜單
 * @param {NodeList} dropdowns - 所有下拉菜單列表
 */
function handleDropdownClick(e, dropdown, dropdowns) {
    // 僅在移動設備上處理
    if (window.innerWidth <= 900) {
        e.preventDefault();
        e.stopPropagation();
        
        // 關閉其他下拉菜單
        closeOtherDropdowns(dropdown, dropdowns);
        
        // 切換當前下拉菜單
        dropdown.classList.toggle('active');
    }
}

/**
 * 關閉其他下拉菜單
 * @param {Element} currentDropdown - 當前下拉菜單
 * @param {NodeList} dropdowns - 所有下拉菜單列表
 */
function closeOtherDropdowns(currentDropdown, dropdowns) {
    dropdowns.forEach(item => {
        if (item !== currentDropdown) {
            item.classList.remove('active');
        }
    });
}

/**
 * 綁定下拉菜單連結點擊事件
 * @param {Element} navContainer - 導航容器
 * @param {Element} navOverlay - 導航覆蓋層
 * @param {NodeList} dropdowns - 下拉菜單列表
 */
function bindDropdownLinkEvents(navContainer, navOverlay, dropdowns) {
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu(navContainer, navOverlay, dropdowns);
        });
    });
}

/**
 * 處理窗口大小調整事件
 * @param {Element} navContainer - 導航容器
 * @param {Element} navOverlay - 導航覆蓋層
 * @param {NodeList} dropdowns - 下拉菜單列表
 */
function handleWindowResize(navContainer, navOverlay, dropdowns) {
    if (window.innerWidth > 900) {
        closeMenu(navContainer, navOverlay, dropdowns);
    }
}

// ===== SMOOTH SCROLLING =====
/**
 * 初始化平滑滾動功能
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

/**
 * 處理平滑滾動事件
 * @param {Event} e - 點擊事件
 */
function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    
    // 跳過空連結
    if (href === '#') return;
    
    const target = document.querySelector(href);
    
    if (target) {
        e.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// ===== INTERSECTION OBSERVER =====
/**
 * 初始化交點觀察器動畫效果
 */
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // 觀察需要動畫的元素
    const animatedElements = document.querySelectorAll('.service-card, .work-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== INITIALIZATION =====
/**
 * 當 DOM 加載完成後初始化所有功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化各個功能模組
    // initHeaderScrollEffect(); // 已移至 scroll.js 統一處理
    initBootstrapNavigation(); // 新增 Bootstrap 選單初始化
    initNavigationMenu();
    initSmoothScrolling();
    initIntersectionObserver();
    
    console.log('Summer Kisses 網站初始化完成');
}); 