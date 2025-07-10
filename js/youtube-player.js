// YouTube API 自製播放器
class YouTubePlayer {
    constructor(containerId, videoId, options = {}) {
        this.containerId = containerId;
        this.videoId = videoId;
        this.options = {
            width: 560,
            height: 315,
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            customControls: false, // 是否使用自定義控制
            ...options
        };
        
        this.player = null;
        this.isLoaded = false;
        this.customControls = null;
        this.init();
    }

    init() {
        // 確保 YouTube API 已加載
        if (typeof YT === 'undefined' || !YT.Player) {
            // 如果 API 還沒加載，等待加載完成
            window.onYouTubeIframeAPIReady = () => {
                this.createPlayer();
            };
        } else {
            this.createPlayer();
        }
    }

    createPlayer() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container with id "${this.containerId}" not found`);
            return;
        }

        // 創建播放器容器
        const playerContainer = document.createElement('div');
        playerContainer.id = `youtube-player-${this.containerId}`;
        container.appendChild(playerContainer);

        // 創建 YouTube 播放器
        this.player = new YT.Player(`youtube-player-${this.containerId}`, {
            height: this.options.height,
            width: this.options.width,
            videoId: this.videoId,
            playerVars: {
                autoplay: this.options.autoplay,
                controls: this.options.customControls ? 0 : this.options.controls, // 如果使用自定義控制，隱藏原生控制
                modestbranding: this.options.modestbranding,
                rel: this.options.rel,
                showinfo: this.options.showinfo,
                fs: 1, // 允許全螢幕
                iv_load_policy: 3, // 隱藏註解
                cc_load_policy: 0, // 隱藏字幕
                playsinline: 1 // 在 iOS 上內聯播放
            },
            events: {
                onReady: this.onPlayerReady.bind(this),
                onStateChange: this.onPlayerStateChange.bind(this),
                onError: this.onPlayerError.bind(this)
            }
        });

        // 如果使用自定義控制，創建控制按鈕
        if (this.options.customControls) {
            this.createCustomControls(container);
        }
    }

    createCustomControls(container) {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'custom-youtube-controls';
        
        // 根據播放器 ID 創建不同風格的控制界面
        const isFirstPlayer = this.containerId === 'youtube-player-1';
        
        // 兩個播放器都使用完整功能風格
        controlsContainer.innerHTML = `
            <div class="controls-overlay full-style">
                <div class="top-controls">
                    <div class="play-pause-btn">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="volume-control">
                        <i class="fas fa-volume-up"></i>
                        <input type="range" class="volume-slider" min="0" max="100" value="50">
                    </div>
                    <div class="time-display">
                        <span class="current-time">0:00</span> / <span class="total-time">0:00</span>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
        `;
        
        container.appendChild(controlsContainer);
        this.customControls = controlsContainer;
        
        // 綁定控制事件
        this.bindCustomControlEvents();
    }

    bindCustomControlEvents() {
        if (!this.customControls) return;

        const playPauseBtn = this.customControls.querySelector('.play-pause-btn');
        const volumeSlider = this.customControls.querySelector('.volume-slider');
        const progressBar = this.customControls.querySelector('.progress-bar');
        const progressFill = this.customControls.querySelector('.progress-fill');

        // 播放/暫停按鈕
        playPauseBtn.addEventListener('click', () => {
            if (this.getPlayerState() === 1) {
                this.pause();
            } else {
                this.play();
            }
        });

        // 音量控制
        volumeSlider.addEventListener('input', (e) => {
            this.setVolume(parseInt(e.target.value));
        });

        // 進度條控制
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const duration = this.getDuration();
            this.seekTo(duration * percentage);
        });

        // 更新進度條和時間顯示
        setInterval(() => {
            if (this.isLoaded) {
                const currentTime = this.getCurrentTime();
                const duration = this.getDuration();
                
                if (duration > 0) {
                    const percentage = (currentTime / duration) * 100;
                    progressFill.style.width = percentage + '%';
                    
                    const currentTimeSpan = this.customControls.querySelector('.current-time');
                    const totalTimeSpan = this.customControls.querySelector('.total-time');
                    
                    currentTimeSpan.textContent = this.formatTime(currentTime);
                    totalTimeSpan.textContent = this.formatTime(duration);
                }
            }
        }, 1000);
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    onPlayerReady(event) {
        this.isLoaded = true;
        console.log(`YouTube player ready for video: ${this.videoId}`);
        
        // 更新自定義控制按鈕狀態
        if (this.customControls) {
            this.updateCustomControlState();
        }
        
        // 觸發自定義事件
        const readyEvent = new CustomEvent('youtubePlayerReady', {
            detail: { player: this.player, videoId: this.videoId }
        });
        document.dispatchEvent(readyEvent);
    }

    onPlayerStateChange(event) {
        const states = {
            '-1': 'unstarted',
            '0': 'ended',
            '1': 'playing',
            '2': 'paused',
            '3': 'buffering',
            '5': 'video cued'
        };
        
        const state = states[event.data] || 'unknown';
        console.log(`Player state changed to: ${state}`);
        
        // 更新自定義控制按鈕狀態
        if (this.customControls) {
            this.updateCustomControlState();
        }
        
        // 觸發自定義事件
        const stateEvent = new CustomEvent('youtubePlayerStateChange', {
            detail: { 
                player: this.player, 
                videoId: this.videoId, 
                state: state,
                stateCode: event.data 
            }
        });
        document.dispatchEvent(stateEvent);
    }

    updateCustomControlState() {
        if (!this.customControls) return;

        const playPauseBtn = this.customControls.querySelector('.play-pause-btn i');
        const state = this.getPlayerState();
        
        if (state === 1) { // 播放中
            playPauseBtn.className = 'fas fa-pause';
        } else { // 暫停或其他狀態
            playPauseBtn.className = 'fas fa-play';
        }
    }

    onPlayerError(event) {
        console.error('YouTube player error:', event.data);
        
        // 觸發自定義事件
        const errorEvent = new CustomEvent('youtubePlayerError', {
            detail: { 
                player: this.player, 
                videoId: this.videoId, 
                error: event.data 
            }
        });
        document.dispatchEvent(errorEvent);
    }

    // ===== 播放器控制方法 =====
    
    // 播放影片
    play() {
        if (this.player && this.isLoaded) {
            this.player.playVideo();
        }
    }

    // 暫停影片
    pause() {
        if (this.player && this.isLoaded) {
            this.player.pauseVideo();
        }
    }

    // 停止影片
    stop() {
        if (this.player && this.isLoaded) {
            this.player.stopVideo();
        }
    }

    // 跳轉到指定時間
    seekTo(seconds) {
        if (this.player && this.isLoaded) {
            this.player.seekTo(seconds, true);
        }
    }

    // 設置音量 (0-100)
    setVolume(volume) {
        if (this.player && this.isLoaded) {
            this.player.setVolume(volume);
        }
    }

    // 靜音
    mute() {
        if (this.player && this.isLoaded) {
            this.player.mute();
        }
    }

    // 取消靜音
    unMute() {
        if (this.player && this.isLoaded) {
            this.player.unMute();
        }
    }

    // 設置播放速率
    setPlaybackRate(rate) {
        if (this.player && this.isLoaded) {
            this.player.setPlaybackRate(rate);
        }
    }

    // 載入新影片
    loadVideoById(videoId) {
        if (this.player && this.isLoaded) {
            this.player.loadVideoById(videoId);
        }
    }

    // 載入播放清單
    loadPlaylist(playlistId) {
        if (this.player && this.isLoaded) {
            this.player.loadPlaylist(playlistId);
        }
    }

    // ===== 獲取播放器資訊 =====
    
    // 獲取播放器狀態
    getPlayerState() {
        if (this.player && this.isLoaded) {
            return this.player.getPlayerState();
        }
        return -1;
    }

    // 獲取當前時間
    getCurrentTime() {
        if (this.player && this.isLoaded) {
            return this.player.getCurrentTime();
        }
        return 0;
    }

    // 獲取總時長
    getDuration() {
        if (this.player && this.isLoaded) {
            return this.player.getDuration();
        }
        return 0;
    }

    // 獲取當前音量
    getVolume() {
        if (this.player && this.isLoaded) {
            return this.player.getVolume();
        }
        return 0;
    }

    // 檢查是否靜音
    isMuted() {
        if (this.player && this.isLoaded) {
            return this.player.isMuted();
        }
        return false;
    }

    // 獲取播放速率
    getPlaybackRate() {
        if (this.player && this.isLoaded) {
            return this.player.getPlaybackRate();
        }
        return 1;
    }

    // 獲取可用的播放速率
    getAvailablePlaybackRates() {
        if (this.player && this.isLoaded) {
            return this.player.getAvailablePlaybackRates();
        }
        return [1];
    }

    // 獲取影片資料
    getVideoData() {
        if (this.player && this.isLoaded) {
            return this.player.getVideoData();
        }
        return {};
    }

    // ===== 實用方法 =====
    
    // 格式化時間顯示
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // 獲取播放進度百分比
    getProgress() {
        const currentTime = this.getCurrentTime();
        const duration = this.getDuration();
        return duration > 0 ? (currentTime / duration) * 100 : 0;
    }

    // 檢查播放器是否準備就緒
    isReady() {
        return this.isLoaded && this.player;
    }

    // 銷毀播放器
    destroy() {
        if (this.player) {
            this.player.destroy();
            this.player = null;
            this.isLoaded = false;
        }
        
        if (this.customControls) {
            this.customControls.remove();
            this.customControls = null;
        }
    }
}

// 初始化所有 YouTube 播放器
function initYouTubePlayers() {
    // 等待 DOM 加載完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createPlayers);
    } else {
        createPlayers();
    }
}

function createPlayers() {
    // 創建第一個播放器 (b8WcgMShfuQ) - 使用自定義控制
    const player1 = new YouTubePlayer('youtube-player-1', 'b8WcgMShfuQ', {
        width: '100%',
        height: 315,
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        customControls: true
    });

    // 創建第二個播放器 (dC6yphLwpsw) - 使用自定義控制
    const player2 = new YouTubePlayer('youtube-player-2', 'dC6yphLwpsw', {
        width: '100%',
        height: 315,
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        customControls: true
    });

    // 監聽播放器事件
    document.addEventListener('youtubePlayerReady', (event) => {
        console.log(`Player ready for video: ${event.detail.videoId}`);
    });

    document.addEventListener('youtubePlayerStateChange', (event) => {
        console.log(`Player state changed: ${event.detail.state} for video: ${event.detail.videoId}`);
    });

    document.addEventListener('youtubePlayerError', (event) => {
        console.error(`Player error for video: ${event.detail.videoId}:`, event.detail.error);
    });

    // 將播放器實例存儲到全局變數，方便外部調用
    window.youtubePlayers = {
        player1: player1,
        player2: player2
    };
}

// 加載 YouTube API
function loadYouTubeAPI() {
    if (window.YT) {
        // API 已經加載
        initYouTubePlayers();
        return;
    }

    // 創建 script 標籤來加載 YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 設置 API 準備好的回調
    window.onYouTubeIframeAPIReady = function() {
        console.log('YouTube API loaded');
        initYouTubePlayers();
    };
}

// 當頁面加載時初始化
if (typeof window !== 'undefined') {
    loadYouTubeAPI();
} 