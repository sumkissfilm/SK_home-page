/* ===== Variables and Constants ===== */
const scrollThreshold = 100;
const animationDelay = 200;
const fadeInOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

/* ===== DOM Elements ===== */
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const imageItems = document.querySelectorAll('.body004 .image-item');
const instagramGrid = document.querySelector('.instagram-grid');
const dropdowns = document.querySelectorAll('.dropdown');
const hero = document.querySelector('.hero');

const instagramPosts = [
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed',
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed',
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed'
];

/* ===== Functions ===== */
function handleScroll() {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMenuOnClick() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function handleImageAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

function loadInstagramPosts() {
    if (!instagramGrid) return;
    
    instagramPosts.forEach((postUrl, index) => {
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'instagram-media';
        blockquote.setAttribute('data-instgrm-permalink', postUrl);
        blockquote.setAttribute('data-instgrm-version', '14');
        instagramGrid.appendChild(blockquote);
    });
}

function initializeInstagram() {
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }
}

function handleDropdownClick(e) {
    if (window.innerWidth <= 900) {
        e.preventDefault();
        const dropdown = e.currentTarget;
        dropdown.classList.toggle('active');
    }
}

function handleHeaderScroll() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

/* ===== Event Listeners ===== */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化漢堡選單
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // 初始化導航連結
    if (navLinksItems) {
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMenuOnClick);
        });
    }

    // 初始化下拉選單
    if (dropdowns) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', handleDropdownClick);
        });
    }

    // 初始化滾動事件
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleHeaderScroll);

    // 初始化 Instagram
    loadInstagramPosts();
    initializeInstagram();
});