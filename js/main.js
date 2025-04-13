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

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');
const menuOverlay = document.querySelector('.menu-overlay');
const allNavLinks = document.querySelectorAll('.nav-links a');

document.addEventListener('DOMContentLoaded', function() {
    // 監聽所有導航連結的點擊事件
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是子選單的返回按鈕，不關閉選單
            if (this.parentElement.classList.contains('dropdown-menu')) {
                return;
            }
            
            // 如果是第一層選項且有子選單，不關閉選單
            if (this.parentElement.classList.contains('dropdown')) {
                return;
            }
            
            // 如果是實際的連結，允許跳轉
            if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                // 關閉選單
                navLinks.classList.remove('active');
                menuOverlay.classList.remove('active');
                
                // 重置所有子選單
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                
                // 允許連結跳轉
                return true;
            }
            
            // 其他情況關閉選單
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            
            // 重置所有子選單
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    });

    // 監聽選單按鈕點擊事件
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });

    // 監聽遮罩層點擊事件
    menuOverlay.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // 監聽視窗大小變化
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // 監聽每個主要選項的點擊事件
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                e.stopPropagation();
                
                // 關閉其他打開的子選單
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // 切換當前子選單
                dropdown.classList.toggle('active');
            }
        });
    });

    // 監聽子選單中的連結點擊事件
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                // 如果是實際的連結，允許跳轉
                navLinks.classList.remove('active');
                menuOverlay.classList.remove('active');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                return true;
            }
            
            // 其他情況關閉選單
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation class to elements when they come into view
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

// Observe elements that should be animated
document.querySelectorAll('.service-card, .work-item').forEach(el => {
    observer.observe(el);
}); 