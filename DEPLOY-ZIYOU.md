# 交接：把发布/测试版部署到 `Amoniethian/ziyou`

> 这份文档是给「**新会话**」用的。当前会话的仓库范围只含 `websit_fuction`，
> 访问不了 `ziyou`（git 403 / API access denied），而且没有 `add_repo` 工具。
> 请**新开一个把 `ziyou` 也纳入范围的会话**（Claude Code 网页端环境里同时勾选
> `websit_fuction` + `ziyou`），然后把这份文档丢给我，按下面执行即可。

---

## 目标
给字游做一个**独立的公开/测试部署**，地址 `https://amoniethian.github.io/ziyou/`。
它和你私用的 `websit_fuction` Pages 站点是**不同的源(origin)**，所以**本地存档彻底隔离**——
在那边玩不会动你的私用进度，反之亦然。

## 为什么必须用另一个仓库
GitHub Pages 一个仓库只有一个站点；**同源 = 共用 IndexedDB/localStorage**。
你的私用存档在 `websit_fuction` 的 Pages 源里。要隔离，发布版必须换源 → 换仓库（就是 `ziyou`）。
（只改路径如 `/demo/` 没用，仍同源共用存储。）

`ziyou` 是项目站点，serve 在 `/ziyou/` 子路径下。本项目 `vite.config.ts` 用的是
`base: "./"`（相对路径），子路径下能正常工作——模型、Draco 解码器都走相对 URL，无需改配置。

---

## 在新会话里执行（需同时能访问 websit_fuction + ziyou）

### 1. 克隆 ziyou
```bash
cd /home/user
git clone <ziyou 的代理地址> ziyou   # 形如 http://local_proxy@127.0.0.1:<port>/git/Amoniethian/ziyou
```

### 2. 把发布版源码灌进 ziyou（从 websit_fuction 的 main 复制工作树，不带历史）
> 复制整套应用源码，排除 git/构建产物/依赖/本地密钥。
```bash
cd /home/user/websit_fuction && git checkout main && git pull
rsync -a --delete \
  --exclude='.git' --exclude='node_modules' --exclude='dist' \
  --exclude='.env.local' --exclude='.claude' \
  --exclude='DEPLOY-ZIYOU.md' \
  /home/user/websit_fuction/ /home/user/ziyou/
```
（保留 `.env.release`，它只含 `VITE_RELEASE=1`，无密钥，发布构建需要它。
`public/models/` 和 `public/draco/` 这些内置模型/解码器也会一并带过去。）

### 3. 写发布版 Pages 部署工作流
在 ziyou 里创建 `.github/workflows/deploy.yml`，内容**和 websit_fuction 的一样，
唯一区别是把 `npm run build` 换成 `npm run build:release`**：
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build:release   # ← 发布模式：隐藏 dev 管线(建表SQL/续接链接等)
      - uses: actions/configure-pages@v5
        with:
          enablement: true
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 4. 提交并推送到 ziyou 的 main
```bash
cd /home/user/ziyou
git add -A
git commit -m "字游发布版：源码 + 发布版 Pages 部署"
git push -u origin main
```

### 5. 开启 GitHub Pages
- 工作流里 `configure-pages enablement: true` 通常会自动开启；
- 若没自动开：去 **ziyou 仓库 → Settings → Pages → Source 选 “GitHub Actions”**。
- 部署进度看 **ziyou → Actions** 标签页，绿勾 = 上线。

---

## 部署后地址
- **发布/测试版**：`https://amoniethian.github.io/ziyou/`
- **Demo（每种生物各 2 个 + 全套装饰样式，纯展示不存档）**：
  `https://amoniethian.github.io/ziyou/?demo`

---

## 以后怎么把 websit_fuction 的更新同步到 ziyou
每次在 `websit_fuction` 改完、想更新发布版时，重复 **第 2 + 4 步**即可
（rsync 复制工作树 → 在 ziyou commit + push）。push 后 Actions 会自动重新构建部署。

> 保持单向：`websit_fuction` → `ziyou`，不要反向。发布专属的东西（如将来内置的
> Supabase 配置）只放 ziyou，不回灌 websit_fuction。

---

## 发布构建里已经准备好的东西（无需额外做）
- `npm run build:release` / `VITE_RELEASE=1` / `src/lib/release.ts` 的 `IS_RELEASE` 开关
  —— 发布版自动隐藏：Supabase「建表 SQL」「续接链接」等 dev 管线（见 CloudSync.tsx）
- 内置模型 `public/models/`（guppy `bigFish.glb`、`clownfish.glb`、`turtle.glb`=七彩麒麟、
  `rock1/2/3.glb`、`anemone1.glb`），玩家上传仍可覆盖
- Draco 解码器 `public/draco/`（引擎已接 DRACOLoader）
- `?demo` 展示模式（`src/features/aquarium-3d/Aquarium3D.tsx` 的 `IS_DEMO`）
- 存档备份/恢复（词库页），可放网盘做免费多设备同步

## 注意事项
- **别在 ziyou 的构建里塞真实 `VITE_LLM_*` 密钥**——富化让玩家自带 key。
- 将来若要「一键登录」，再把**你自己的 Supabase URL + anon key**（anon key 公开安全、
  由 RLS 保护）放进 ziyou 的发布 env，玩家就只需登录、数据跟人走。
- 还差的内置模型：`rock4` + 2 个**不同的**海葵（你之前发的两个 md5 相同）+ 珊瑚×2 + 海草×3。
  发原始 .glb 给我即可，我会自动解 Draco / 减面 / 重压再放进 `public/models/`。
