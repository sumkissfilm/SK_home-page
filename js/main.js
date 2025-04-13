// Header Background Change on Scroll
const header = document.querySelector('header');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Navigation Menu
document.addEventListener('DOMContentLoaded', function() {
    console.log('初始化菜單...');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const navOverlay = document.querySelector('.nav-overlay');
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    
    // 調試輸出菜單結構
    console.log('菜單項數量:', dropdowns.length);
    dropdowns.forEach((dropdown, i) => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = menu ? menu.querySelectorAll('li') : [];
        console.log(`菜單項 ${i+1}:`, link ? link.textContent : '無鏈接');
        console.log(`子菜單項數量:`, items.length);
    });
    
    // 開關菜單
    menuToggle.addEventListener('click', function() {
        navContainer.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // 重置所有下拉菜單
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
    
    // 點擊覆蓋層關閉菜單
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            navContainer.classList.remove('active');
            navOverlay.classList.remove('active');
            // 關閉所有已打開的下拉菜單
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    }
    
    // 在移動設備上處理下拉菜單
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // 僅在移動設備上
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 關閉其他下拉菜單
                    dropdowns.forEach(item => {
                        if (item !== dropdown) {
                            item.classList.remove('active');
                        }
                    });
                    
                    // 切換當前下拉菜單
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // 處理下拉菜單中的連結點擊
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', function() {
            // 關閉菜單
            navContainer.classList.remove('active');
            navOverlay.classList.remove('active');
            // 關閉所有下拉菜單
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    });
    
    // 處理窗口調整大小
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            navContainer.classList.remove('active');
            navOverlay.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 動畫效果
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

document.querySelectorAll('.service-card, .work-item').forEach(el => {
    observer.observe(el);
}); 