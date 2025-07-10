# YouTube API 自製播放器

這是一個使用 YouTube IFrame API 的自製播放器，可以替換傳統的 iframe 嵌入方式，提供更多的控制權和自定義選項。

## 功能特色

### 🎯 核心功能
- **YouTube IFrame API 整合** - 使用官方 API，穩定可靠
- **自定義控制按鈕** - 可選擇使用原生控制或自定義控制
- **完整播放控制** - 播放、暫停、停止、跳轉、音量控制等
- **播放器狀態監聽** - 實時監聽播放狀態變化
- **錯誤處理** - 完善的錯誤處理機制

### 🎨 自定義功能
- **品牌色調主題** - 使用 #f7bc51 品牌金色
- **自定義控制界面** - 懸停顯示的控制按鈕
- **進度條控制** - 可點擊跳轉到指定時間
- **音量滑塊** - 實時音量調整
- **時間顯示** - 當前時間/總時長顯示
- **響應式設計** - 適配各種螢幕尺寸

### 🔧 進階功能
- **播放速率控制** - 支援 0.25x 到 2x 播放速率
- **播放清單支援** - 可載入播放清單
- **鍵盤快捷鍵** - 支援鍵盤控制
- **事件系統** - 自定義事件觸發
- **多播放器管理** - 同時管理多個播放器

## 安裝和使用

### 1. 引入必要文件

在 HTML 中引入播放器腳本：

```html
<script src="js/youtube-player.js"></script>
```

### 2. 創建播放器容器

```html
<div id="youtube-player-1" class="youtube-player-container"></div>
```

### 3. 初始化播放器

```javascript
// 基本使用
const player = new YouTubePlayer('youtube-player-1', 'VIDEO_ID', {
    width: '100%',
    height: 315,
    autoplay: 0,
    controls: 1,
    modestbranding: 1,
    rel: 0
});

// 使用自定義控制
const playerWithCustomControls = new YouTubePlayer('youtube-player-2', 'VIDEO_ID', {
    width: '100%',
    height: 315,
    autoplay: 0,
    controls: 1,
    modestbranding: 1,
    rel: 0,
    customControls: true // 啟用自定義控制
});
```

## API 參考

### 構造函數參數

```javascript
new YouTubePlayer(containerId, videoId, options)
```

#### 參數說明

- `containerId` (string): 播放器容器的 DOM ID
- `videoId` (string): YouTube 影片 ID
- `options` (object): 配置選項

#### 配置選項

| 選項 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `width` | string/number | 560 | 播放器寬度 |
| `height` | string/number | 315 | 播放器高度 |
| `autoplay` | number | 0 | 自動播放 (0/1) |
| `controls` | number | 1 | 顯示控制按鈕 (0/1) |
| `modestbranding` | number | 1 | 隱藏 YouTube 品牌 (0/1) |
| `rel` | number | 0 | 顯示相關影片 (0/1) |
| `showinfo` | number | 0 | 顯示影片資訊 (0/1) |
| `customControls` | boolean | false | 使用自定義控制 |

### 播放器方法

#### 基本控制

```javascript
// 播放影片
player.play();

// 暫停影片
player.pause();

// 停止影片
player.stop();

// 跳轉到指定時間 (秒)
player.seekTo(30);

// 設置音量 (0-100)
player.setVolume(50);

// 靜音
player.mute();

// 取消靜音
player.unMute();

// 設置播放速率
player.setPlaybackRate(1.5);
```

#### 載入內容

```javascript
// 載入新影片
player.loadVideoById('NEW_VIDEO_ID');

// 載入播放清單
player.loadPlaylist('PLAYLIST_ID');
```

#### 獲取資訊

```javascript
// 獲取播放器狀態
const state = player.getPlayerState();
// -1: 未開始, 0: 結束, 1: 播放中, 2: 暫停, 3: 緩衝中, 5: 已插入

// 獲取當前時間
const currentTime = player.getCurrentTime();

// 獲取總時長
const duration = player.getDuration();

// 獲取當前音量
const volume = player.getVolume();

// 檢查是否靜音
const isMuted = player.isMuted();

// 獲取播放速率
const playbackRate = player.getPlaybackRate();

// 獲取可用的播放速率
const availableRates = player.getAvailablePlaybackRates();

// 獲取影片資料
const videoData = player.getVideoData();
```

#### 實用方法

```javascript
// 格式化時間顯示
const formattedTime = player.formatTime(125); // "2:05"

// 獲取播放進度百分比
const progress = player.getProgress(); // 0-100

// 檢查播放器是否準備就緒
const isReady = player.isReady();

// 銷毀播放器
player.destroy();
```

### 事件監聽

```javascript
// 播放器準備就緒
document.addEventListener('youtubePlayerReady', (event) => {
    console.log('播放器準備就緒:', event.detail.videoId);
});

// 播放狀態變化
document.addEventListener('youtubePlayerStateChange', (event) => {
    const { videoId, state, stateCode } = event.detail;
    console.log(`影片 ${videoId} 狀態變化:`, state);
});

// 播放器錯誤
document.addEventListener('youtubePlayerError', (event) => {
    const { videoId, error } = event.detail;
    console.error(`影片 ${videoId} 發生錯誤:`, error);
});
```

## 使用示例

### 基本播放器

```html
<div id="basic-player" class="youtube-player-container"></div>

<script>
const basicPlayer = new YouTubePlayer('basic-player', 'dQw4w9WgXcQ', {
    width: '100%',
    height: 315,
    autoplay: 0,
    controls: 1
});
</script>
```

### 自定義控制播放器

```html
<div id="custom-player" class="youtube-player-container"></div>

<script>
const customPlayer = new YouTubePlayer('custom-player', 'dQw4w9WgXcQ', {
    width: '100%',
    height: 315,
    autoplay: 0,
    controls: 1,
    customControls: true
});
</script>
```

### 多播放器管理

```html
<div id="player1" class="youtube-player-container"></div>
<div id="player2" class="youtube-player-container"></div>

<script>
const player1 = new YouTubePlayer('player1', 'VIDEO_ID_1');
const player2 = new YouTubePlayer('player2', 'VIDEO_ID_2');

// 同時控制多個播放器
function playAll() {
    player1.play();
    player2.play();
}

function pauseAll() {
    player1.pause();
    player2.pause();
}
</script>
```

### 鍵盤快捷鍵

```javascript
// 設置鍵盤快捷鍵
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case ' ': // 空格鍵 - 播放/暫停
            event.preventDefault();
            if (player.getPlayerState() === 1) {
                player.pause();
            } else {
                player.play();
            }
            break;
            
        case 'ArrowLeft': // 左箭頭 - 倒退 10 秒
            event.preventDefault();
            const currentTime = player.getCurrentTime();
            player.seekTo(Math.max(0, currentTime - 10));
            break;
            
        case 'ArrowRight': // 右箭頭 - 前進 10 秒
            event.preventDefault();
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            player.seekTo(Math.min(duration, currentTime + 10));
            break;
    }
});
```

## CSS 樣式

播放器包含完整的 CSS 樣式，支援響應式設計和品牌色調：

```css
/* 播放器容器 */
.youtube-player-container {
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

/* 自定義控制按鈕 */
.custom-youtube-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.youtube-player-container:hover .custom-youtube-controls {
    opacity: 1;
}

/* 品牌色調主題 */
:root {
    --yt-primary-color: #f7bc51;
    --yt-primary-hover: #e6a93a;
    --yt-primary-transparent: rgba(247, 188, 81, 0.9);
    --yt-secondary-color: rgba(247, 188, 81, 0.3);
}
```

## 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 注意事項

1. **YouTube API 限制** - 需要網路連接才能載入 YouTube API
2. **跨域限制** - 某些功能可能受到瀏覽器安全策略限制
3. **移動設備** - 在 iOS 上可能需要用戶手動觸發播放
4. **廣告** - YouTube 可能會在影片中顯示廣告

## 故障排除

### 常見問題

**Q: 播放器無法載入？**
A: 檢查網路連接和 YouTube API 是否正常載入

**Q: 自定義控制按鈕不顯示？**
A: 確保 `customControls: true` 選項已設置

**Q: 播放器在移動設備上無法自動播放？**
A: 這是瀏覽器限制，需要用戶手動觸發播放

**Q: 如何獲取播放器實例？**
A: 播放器實例會存儲在 `window.youtubePlayers` 中

## 更新日誌

### v1.0.0
- 初始版本
- 基本播放控制功能
- 自定義控制界面
- 事件系統
- 響應式設計

## 授權

MIT License

## 貢獻

歡迎提交 Issue 和 Pull Request！ 