/**
 * ========================================
 * SUMMER KISSES - FOOTER JAVASCRIPT
 * ========================================
 * 
 * 使用說明：
 * 1. 在 HTML 檔案的 </body> 前引入此 JS 檔案
 * 2. 確保已引入 Font Awesome 圖示庫
 * 3. 支援無障礙功能和效能優化
 * 4. 包含動畫效果和互動功能
 */

// ===== FOOTER FUNCTIONALITY =====

class FooterManager {
    constructor() {
        this.footer = document.querySelector('footer');
        this.socialLinks = document.querySelectorAll('.social-links a');
        this.footerLinks = document.querySelectorAll('.footer-section p a');
        this.currentYear = new Date().getFullYear();
        
        this.init();
    }
    
    /**
     * 初始化 Footer 功能
     */
    init() {
        this.updateCopyrightYear();
        this.setupSocialLinks();
        this.setupFooterLinks();
        this.setupAccessibility();
        this.setupAnimations();
        this.setupPerformanceOptimizations();
    }
    
    /**
     * 更新版權年份
     */
    updateCopyrightYear() {
        const copyrightElement = document.querySelector('.footer-bottom p');
        if (copyrightElement) {
            const currentText = copyrightElement.innerHTML;
            const updatedText = currentText.replace(
                /Copyright &copy; \d{4}/,
                `Copyright &copy; ${this.currentYear}`
            );
            copyrightElement.innerHTML = updatedText;
        }
    }
    
    /**
     * 設定社群媒體連結功能
     */
    setupSocialLinks() {
        this.socialLinks.forEach(link => {
            // 添加點擊追蹤（可選）
            link.addEventListener('click', (e) => {
                this.trackSocialClick(e.target.closest('a').getAttribute('aria-label'));
            });
            
            // 添加鍵盤導航支援
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
            
            // 添加觸控設備優化
            link.addEventListener('touchstart', () => {
                link.style.transform = 'scale(0.95)';
            });
            
            link.addEventListener('touchend', () => {
                link.style.transform = '';
            });
        });
    }
    
    /**
     * 設定頁尾連結功能
     */
    setupFooterLinks() {
        this.footerLinks.forEach(link => {
            // 添加外部連結指示器
            if (link.hostname !== window.location.hostname) {
                this.addExternalLinkIndicator(link);
            }
            
            // 添加點擊追蹤
            link.addEventListener('click', (e) => {
                this.trackFooterLinkClick(e.target.textContent);
            });
        });
    }
    
    /**
     * 添加外部連結指示器
     */
    addExternalLinkIndicator(link) {
        const icon = document.createElement('i');
        icon.className = 'fas fa-external-link-alt';
        icon.style.marginLeft = '4px';
        icon.style.fontSize = '0.8em';
        icon.style.opacity = '0.7';
        link.appendChild(icon);
    }
    
    /**
     * 設定無障礙功能
     */
    setupAccessibility() {
        // 添加跳過連結
        this.addSkipLink();
        
        // 設定 ARIA 標籤
        this.setupAriaLabels();
        
        // 支援螢幕閱讀器
        this.setupScreenReaderSupport();
    }
    
    /**
     * 添加跳過連結
     */
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#footer';
        skipLink.textContent = '跳至頁尾';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #f7bc51;
            color: #333;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        // 為 footer 添加 ID
        if (this.footer && !this.footer.id) {
            this.footer.id = 'footer';
        }
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    /**
     * 設定 ARIA 標籤
     */
    setupAriaLabels() {
        // 為社群媒體連結添加更詳細的 ARIA 標籤
        this.socialLinks.forEach(link => {
            const platform = link.getAttribute('aria-label');
            if (platform) {
                link.setAttribute('aria-label', `在 ${platform} 上追蹤我們`);
            }
        });
    }
    
    /**
     * 設定螢幕閱讀器支援
     */
    setupScreenReaderSupport() {
        // 為頁尾添加區域標籤
        if (this.footer) {
            this.footer.setAttribute('role', 'contentinfo');
            this.footer.setAttribute('aria-label', '頁尾資訊');
        }
        
        // 為社群媒體區域添加標籤
        const socialSection = document.querySelector('.footer-section:last-child');
        if (socialSection) {
            socialSection.setAttribute('role', 'navigation');
            socialSection.setAttribute('aria-label', '社群媒體連結');
        }
    }
    
    /**
     * 設定動畫效果
     */
    setupAnimations() {
        // 檢查是否支援動畫
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        // 添加進入動畫
        this.addEntranceAnimation();
        
        // 添加滾動動畫
        this.addScrollAnimation();
    }
    
    /**
     * 添加進入動畫
     */
    addEntranceAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        if (this.footer) {
            this.footer.style.opacity = '0';
            this.footer.style.transform = 'translateY(20px)';
            this.footer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(this.footer);
        }
    }
    
    /**
     * 添加滾動動畫
     */
    addScrollAnimation() {
        let ticking = false;
        
        const updateFooterOnScroll = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // 當接近頁尾時添加特殊效果
            if (scrollTop + windowHeight > documentHeight - 100) {
                this.footer.classList.add('near-bottom');
            } else {
                this.footer.classList.remove('near-bottom');
            }
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateFooterOnScroll);
                ticking = true;
            }
        });
    }
    
    /**
     * 設定效能優化
     */
    setupPerformanceOptimizations() {
        // 延遲載入非關鍵資源
        this.lazyLoadResources();
        
        // 優化事件監聽器
        this.optimizeEventListeners();
    }
    
    /**
     * 延遲載入資源
     */
    lazyLoadResources() {
        // 如果 Font Awesome 圖示還沒載入，添加載入指示器
        const icons = document.querySelectorAll('.fab, .fas');
        icons.forEach(icon => {
            if (!icon.offsetWidth) {
                icon.style.opacity = '0';
                icon.addEventListener('load', () => {
                    icon.style.opacity = '1';
                    icon.style.transition = 'opacity 0.3s ease';
                });
            }
        });
    }
    
    /**
     * 優化事件監聽器
     */
    optimizeEventListeners() {
        // 使用事件委派減少監聽器數量
        this.footer.addEventListener('click', (e) => {
            const target = e.target.closest('a');
            if (target && target.classList.contains('social-links')) {
                // 處理社群媒體連結點擊
                this.handleSocialLinkClick(e, target);
            }
        });
    }
    
    /**
     * 處理社群媒體連結點擊
     */
    handleSocialLinkClick(e, target) {
        // 添加點擊反饋
        target.style.transform = 'scale(0.9)';
        setTimeout(() => {
            target.style.transform = '';
        }, 150);
    }
    
    /**
     * 追蹤社群媒體點擊
     */
    trackSocialClick(platform) {
        // 這裡可以添加 Google Analytics 或其他追蹤程式碼
        console.log(`Social media click: ${platform}`);
        
        // 範例：Google Analytics 4 追蹤
        if (typeof gtag !== 'undefined') {
            gtag('event', 'social_click', {
                'social_platform': platform,
                'event_category': 'footer',
                'event_label': 'social_media'
            });
        }
    }
    
    /**
     * 追蹤頁尾連結點擊
     */
    trackFooterLinkClick(linkText) {
        // 這裡可以添加 Google Analytics 或其他追蹤程式碼
        console.log(`Footer link click: ${linkText}`);
        
        // 範例：Google Analytics 4 追蹤
        if (typeof gtag !== 'undefined') {
            gtag('event', 'footer_link_click', {
                'link_text': linkText,
                'event_category': 'footer',
                'event_label': 'footer_link'
            });
        }
    }
    
    /**
     * 獲取頁尾資訊
     */
    getFooterInfo() {
        return {
            socialLinks: Array.from(this.socialLinks).map(link => ({
                platform: link.getAttribute('aria-label'),
                url: link.href
            })),
            contactInfo: Array.from(this.footerLinks).map(link => ({
                text: link.textContent,
                url: link.href
            })),
            copyrightYear: this.currentYear
        };
    }
}

// ===== UTILITY FUNCTIONS =====

/**
 * 檢查是否為觸控設備
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * 防抖函數
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 節流函數
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== INITIALIZATION =====

// 等待 DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    // 檢查是否支援必要的功能
    if (typeof IntersectionObserver !== 'undefined') {
        new FooterManager();
    } else {
        // 降級處理：不支援 IntersectionObserver 的瀏覽器
        console.warn('IntersectionObserver not supported, footer animations disabled');
        // 仍然初始化基本功能
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.opacity = '1';
        }
    }
});

// 導出類別供其他模組使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterManager;
} 