# 词海 · Cihai

A vocabulary study app structured as a slow-living virtual aquarium.
每一个被牢记的词，都会变成鱼缸里一只缓慢游动的生物。

> 完整产品规格见 [`DESIGN.md`](./DESIGN.md)。遇到设计抉择时，用文末三句美学锚点校准
> （「看 10 分钟也不无聊」「不奖励效率，奖励持续」）。

## 现状 · v0.1（单机 web）

已实现完整的学习 / 复习闭环 + 2D 鱼缸，本地持久化（IndexedDB）。

- **学习**：速记新词 → 四步学习（熟悉 → 句子配对 → 选词成句 → 默写单词）→ 每 10 词整组拼配测验 + 3 句默写
- **复习**：按词状态切换 句子填空 / 整句默写 / 闪卡；会话结束按错误率扣鱼
- **奖惩**：每 10/25/50/100/200 词产出小鱼/月亮鱼/小丑鱼/大鱼/海龟；番茄钟时长产出海草/海葵/珊瑚；超阈值凝成奖牌
- **2D 鱼缸**：Canvas 低多边形背景 + 像素精灵 + Boids 群游，库存变化实时增减生物
- **外观**：上传自定义背景图与物种形象
- **套级掌握**：每 50 词为一套，正确率 ≥ 90% 升级为整句默写

详见 [`DESIGN.md`](./DESIGN.md) §8 的版本路线图。下一步：v0.2 3D 鱼缸、v0.3 Drive 云同步、v0.4 AI 富化接线。

## Stack

- **Vite 5** + **React 18** + **TypeScript 5**
- **Zustand** + `persist` 中间件做状态管理
- **localforage**（IndexedDB）持久化
- **Three.js r160** —— 预留给 v0.2 的 3D 鱼缸（当前 2D 鱼缸为纯 Canvas，不依赖它）
- 可选 Google Drive OAuth 同步（`src/lib/drive-sync.ts`，待接线）
- 可选 LLM 速记富化（`src/lib/llm-enrich.ts`，配置 `VITE_LLM_*` 后启用）

## Layout

```
.
├── index.html                # Vite 入口
├── package.json
├── vite.config.ts
├── tsconfig.json
├── DESIGN.md                 # 完整设计策划案（产品规格）
├── MIGRATION.md              # legacy HTML → TS 的逐函数映射
├── src/
│   ├── main.tsx              # ReactDOM 渲染 + 样式入口
│   ├── App.tsx               # 顶层布局：侧栏面板 | 鱼缸
│   ├── styles.css            # 全局样式
│   ├── types.ts              # 数据模型 + 阈值常量
│   ├── store.ts              # Zustand store：奖励/惩罚/学习/复习/掌握逻辑
│   ├── lib/                  # text / speech / sentence / icons / drive-sync / llm-enrich
│   ├── data/
│   │   └── vocab-scholar-set1.json   # 31 个学术起始词条
│   └── features/
│       ├── learn/            # 四步学习 + 整组测验 + 速记
│       ├── review/           # 填空 / 默写 / 闪卡复习
│       ├── pomodoro/         # 番茄钟
│       ├── species/          # 物种库存
│       ├── vocab/            # 词库导入 / 进度管理
│       ├── cosmetics/        # 背景 / 物种形象自定义
│       └── aquarium-2d/      # Canvas 2D 鱼缸引擎
└── legacy/
    ├── cihai-2d.html         # 原始 2D 版（行为参照）
    ├── cihai-3d-preview.html # 3D 鱼缸原型（视觉参照）
    └── *.md                  # 原设计文档与部署指南
```

## Getting started

```bash
npm install
npm run dev
# open http://localhost:5173
```

构建与检查：

```bash
npm run typecheck   # tsc --noEmit
npm run build       # tsc -b && vite build  → dist/
npm run preview     # 预览生产构建
```

## AI 富化（可选）

复制 `.env.example` 为 `.env`，填入任一 OpenAI 兼容端点：

```
VITE_LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
VITE_LLM_API_KEY=sk-...
VITE_LLM_MODEL=gpt-4o-mini
```

配置后，学习页顶部「速记」输入新词会自动补全音标、释义、例句。
未配置时，新词以简单格式入库，可手动补释义。

> 生产环境不要把 key 打进客户端——用一个薄代理（Cloudflare Worker / Vercel Edge）
> 转发请求、把 key 留在服务端。`src/lib/llm-enrich.ts` 文末有示例。

## Deployment

- **静态 web**（推荐先做）：`npm run build` 产出 `dist/`，部署到 GitHub Pages / Netlify / Cloudflare Pages。`vite.config.ts` 已用相对 `base`，无需子路径配置。
- **桌面 / 手机 app**（v1.0+）：用 [Tauri](https://tauri.app)（桌面）或 [Capacitor](https://capacitorjs.com)（iOS/Android）包壳。

## License

Personal use. If you ever publish this, MIT.
