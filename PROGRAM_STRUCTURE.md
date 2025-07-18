# Summer Kisses 網站程式結構

## 檔案結構

```
SK_page/
├── css/
│   ├── style.css              # 主要樣式檔案
│   ├── header-navigation.css  # 頁首導航統一樣式
│   └── social-icons.css       # 社群圖示通用樣式
├── js/
│   ├── main.js               # 主要 JavaScript 功能
│   ├── script.js             # 載入動畫腳本
│   └── scroll.js             # 滾動效果腳本
├── images/                   # 圖片資源
├── index.html               # 主頁面
├── header-component.html     # Header 組件檔案
└── README.md
```

## CSS 檔案說明

### 1. `style.css` - 主要樣式檔案
- **用途**: 包含全域樣式、各區塊樣式、響應式設計
- **主要內容**:
  - 全域重置和基礎樣式
  - Hero 區塊樣式
  - About Us 區塊樣式
  - Image Gallery 區塊樣式
  - Video Portfolio 區塊樣式
  - Footer 區塊樣式
  - 響應式設計 (桌面版、平板版、手機版)

### 2. `header-navigation.css` - 頁首導航統一樣式 ⭐ **新增**
- **用途**: 整合所有 header 和 navigation 相關樣式
- **主要內容**:
  - Header 容器樣式
  - Navbar 容器樣式
  - Brand Logo 樣式
  - 漢堡選單按鈕樣式
  - 行動版選單容器樣式
  - 關閉按鈕樣式
  - 導航選單樣式
  - 導航項目和連結樣式
  - 社群媒體圖示樣式 (整合自 social-icons.css)
  - 響應式設計 (桌面版、平板版、手機版)
  - Font Awesome 圖示顯示設定
  - 無障礙功能支援

### 3. `social-icons.css` - 社群圖示通用樣式 ⭐ **簡化**
- **用途**: 提供社群圖示的通用樣式和無障礙功能
- **主要內容**:
  - Font Awesome 圖示顯示設定
  - 品牌圖示特定字重設定
  - 無障礙功能 - 焦點樣式

## JavaScript 檔案說明

### 1. `main.js` - 主要 JavaScript 功能
- **用途**: 控制網站的主要互動功能
- **主要功能**:
  - Header 滾動效果
  - Bootstrap 導航選單功能 ⭐ **新增**
  - 選單關閉按鈕功能 ⭐ **新增**
  - 防止背景滾動功能 ⭐ **新增**
  - 平滑滾動功能
  - 交點觀察器動畫效果

### 2. `script.js` - 載入動畫腳本
- **用途**: 控制頁面載入動畫
- **主要功能**:
  - 載入進度模擬
  - 載入完成後的淡出效果
  - 移除載入動畫元素

### 3. `scroll.js` - 滾動效果腳本
- **用途**: 控制滾動相關的視覺效果
- **主要功能**:
  - Header 背景色變化
  - 滾動位置監控

## HTML 結構說明

### 1. `index.html` - 主頁面
- **結構**:
  - 載入動畫區塊
  - Header & Navigation 區塊
  - Hero Section
  - About Us Section
  - Image Gallery Section
  - Video Portfolio Section
  - Footer Section

### 2. `header-component.html` - Header 組件檔案 ⭐ **新增**
- **用途**: 提供統一的 header 組件，方便在其他頁面使用
- **包含內容**:
  - 完整的 header HTML 結構
  - 使用說明和注意事項
  - 必要的 CSS 和 JS 檔案引用說明

## 樣式整合變更 ⭐ **重要更新**

### 移除的檔案
- `navigation.css` - 已整合到 `header-navigation.css`
- `navigation-fonts.css` - 已整合到 `header-navigation.css`

### 整合內容
1. **Header 樣式**: 從多個檔案整合到單一檔案
2. **Navigation 樣式**: 包含導航列、漢堡選單、選單動畫
3. **社群圖示樣式**: 整合到 header 檔案中，保留通用樣式在 social-icons.css
4. **響應式設計**: 完整的桌面版、平板版、手機版樣式
5. **無障礙功能**: 焦點樣式、鍵盤導航支援

### 使用方式
1. **主頁面**: 使用 `header-navigation.css` 和 `social-icons.css`
2. **其他頁面**: 
   - 複製 `header-component.html` 內容
   - 引入 `header-navigation.css` 和 `social-icons.css`
   - 引入 `main.js` 和 `scroll.js`

## 功能特點

### Header & Navigation
- ✅ 響應式設計 (桌面版、平板版、手機版)
- ✅ 漢堡選單動畫效果
- ✅ 關閉按鈕功能
- ✅ 防止背景滾動
- ✅ 多種關閉方式 (按鈕、外部點擊、ESC 鍵)
- ✅ 滾動時背景色變化
- ✅ 社群媒體圖示
- ✅ 無障礙功能支援

### 載入動畫
- ✅ 載入進度顯示
- ✅ 平滑淡出效果
- ✅ 響應式 Logo 大小

### 響應式設計
- ✅ 桌面版 (≥992px)
- ✅ 平板版 (≤991px)
- ✅ 手機版 (≤576px)
- ✅ 超小螢幕 (≤400px)

## 維護注意事項

1. **Header 樣式修改**: 統一在 `header-navigation.css` 中進行
2. **新增頁面**: 使用 `header-component.html` 作為模板
3. **社群圖示**: 通用樣式在 `social-icons.css`，特定樣式在 `header-navigation.css`
4. **JavaScript 功能**: 主要功能在 `main.js`，滾動效果在 `scroll.js` 