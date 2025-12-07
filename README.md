# WingWill SaaS Platform

企業級雲端服務管理平台 - 專為羽昇國際打造的 SaaS 訂閱管理系統

## 專案簡介

WingWill SaaS Platform 是一個現代化的企業級管理系統，採用 Google Cloud Platform (GCP) 設計語言，用於管理 Google Workspace、Microsoft 365、GCP 等雲端服務的訂閱、授權和財務。

### 核心功能

- **產品目錄管理** - 多層級產品展示 (品牌 → 產品 → 方案)
- **訂單工作流** - 完整的訂單審核流程 (業務 → 技術 → 財務)
- **客戶管理** - 企業客戶資料與訂閱狀態追蹤
- **訂閱管理** - 授權使用率監控與計費管理
- **財務追蹤** - 營收統計與帳務管理
- **角色權限控制 (RBAC)** - 細粒度的功能與資料權限

### 設計特色

✨ **GCP 風格設計系統**
- 緊湊專業的企業級介面
- 一致的視覺語言 (灰階色系、最小圓角、微妙陰影)
- 超緊湊間距設計 (30-40% 更小的 padding)
- 藍色主題 (#1967D2) 取代傳統紅色

## 技術棧

- **框架**: Next.js 16.0.6 (App Router + Turbopack)
- **語言**: TypeScript
- **樣式**: Tailwind CSS 3.4.1
- **UI 組件**: Shadcn UI
- **資料庫**: Prisma (支援 PostgreSQL/MySQL)
- **開發工具**: ESLint, TypeScript

## 快速開始

### 環境需求

- Node.js 18.x 或更高版本
- npm 或 yarn

### 本地開發

1. **克隆專案**
\`\`\`bash
git clone https://github.com/hdsmarter/wingwill-saas-platform.git
cd wingwill-saas-platform
\`\`\`

2. **安裝依賴**
\`\`\`bash
npm install
\`\`\`

3. **設定環境變數**
\`\`\`bash
cp .env.example .env.local
\`\`\`

編輯 \`.env.local\` 填入必要的環境變數：
\`\`\`env
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

4. **啟動開發伺服器**
\`\`\`bash
npm run dev
\`\`\`

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 部署到 Vercel

### 一鍵部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hdsmarter/wingwill-saas-platform)

### 手動部署步驟

1. 訪問 [Vercel Dashboard](https://vercel.com/new?teamSlug=hdsmarters-projects)
2. 導入 GitHub repository: \`hdsmarter/wingwill-saas-platform\`
3. 配置環境變數
4. 點擊 "Deploy" 開始部署

### Vercel 環境變數

在 Vercel 專案設定中，可暫時跳過環境變數（用於展示），或添加：

| 變數名稱 | 說明 | 範例值 |
|---------|------|--------|
| \`DATABASE_URL\` | 資料庫連接字串 (可選) | \`postgresql://...\` |
| \`NEXTAUTH_SECRET\` | NextAuth 密鑰 (可選) | \`your-secret-key\` |
| \`NEXTAUTH_URL\` | 應用程式 URL (可選) | \`https://your-app.vercel.app\` |

**注意**: 目前專案可在沒有資料庫的情況下運行，使用 mock 資料進行展示。

## 專案結構

\`\`\`
wingwill-saas-platform/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # 儀表板頁面群組
│   │   ├── dashboard/     # 主儀表板
│   │   ├── products/      # 產品目錄
│   │   ├── orders/        # 訂單管理
│   │   ├── customers/     # 客戶管理
│   │   ├── subscriptions/ # 訂閱管理
│   │   ├── finance/       # 財務管理
│   │   ├── cart/          # 購物車
│   │   └── settings/      # 系統設定
│   ├── login/             # 登入頁面
│   ├── layout.tsx         # 根佈局
│   └── global.css         # 全域樣式 (GCP 主題)
├── components/            # React 組件
│   ├── layout/           # 佈局組件 (Sidebar, TopNav)
│   └── ui/               # UI 組件 (Shadcn)
├── contexts/             # React Context
├── lib/                  # 工具函式與設定
│   ├── rbac/            # 角色權限系統
│   └── utils.ts         # 通用工具
├── prisma/              # Prisma 資料庫結構
│   ├── schema.prisma    # 資料模型
│   └── seed.ts          # 種子資料
└── styles/              # 額外樣式檔案
\`\`\`

## 設計規範

### GCP 設計原則

- **色彩**: 灰階主色調 + 藍色強調色 (#1967D2)
- **間距**: 緊湊專業 (8px, 12px, 16px, 24px)
- **圓角**: 最小化 (2px - rounded-sm)
- **文字**: 小而清晰 (12px - text-xs 為主)
- **按鈕**: 統一高度 32px (h-8)
- **陰影**: 微妙且節制

### 頁面結構標準

每個頁面應包含：
1. **麵包屑導航** (text-xs, text-gray-500)
2. **頁面標題** (text-xl, font-medium)
3. **副標題/描述** (text-xs, text-gray-600)
4. **緊湊內容區** (p-4 或 p-6)

## 授權

Copyright © 2024 羽昇國際. All rights reserved.

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
