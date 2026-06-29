# 发布分支 `release`（公开发布版）

这条分支是**对外发布版**（itch 网页版 + 桌面安装包）的家。它和你自己日常用的版本**彻底分开**。

## ⚠️ 合并方向：单向，永不回合
- ✅ 允许：`main → release`（把开发好的功能合进来发版）
- ❌ 禁止：`release → main`（发布专属的东西绝不能污染你的私用版）

发布专属提交请加前缀 `[release]`，一眼可辨、绝不误合回 main。

## 为什么数据不会互相覆盖
浏览器/应用的存储是**按来源(origin)隔离**的：
- 你私用版 = GitHub Pages（一个来源）
- itch 网页版 = `itch.zone`（另一个来源）
- 桌面版 = 它自己的独立空间

三者数据互相看不见。所以发布版**碰不到你的私用存档**。

## 发布版与私用版的代码差异
共享代码都在 `main`，由构建模式开关控制（`IS_RELEASE`，见 `src/lib/release.ts`）：
- 私用/开发构建（`npm run build`）：保留全部工具（建表 SQL、续接链接、模型朝向修正…）
- 发布构建（`npm run build:release`，`VITE_RELEASE=1`）：收起上述 dev 管线

`release` 分支只额外放**发布专属、不该进 main 的东西**：
- `public/models/<slot>.glb` —— 内置默认模型（玩家没上传时回退使用）
- `.env.release` —— 发布构建标志（如需"一键登录"，把你自己的 Supabase URL + anon key 放这里；anon key 公开安全、由 RLS 保护）
- 桌面打包配置（Electron，之后加）

## 内置模型 & 朝向
- 把模型放到 `public/models/`，并在 `src/features/aquarium-3d/modelStore.ts` 的 `BUNDLED_MODELS` 里登记对应 slot。
- 朝向在同文件的 `DEFAULT_HEADING` / `DEFAULT_PITCH` 里**钉死**（只对内置模型生效）。
- 玩家上传自己的模型时，仍会出现实时「转向 / 翻正」按钮，自行校正——内置默认不显示这些按钮。

## 更新不覆盖玩家进度（铁律）
代码 + 内置模型在"会被替换"的一侧；玩家进度 + 玩家自传模型在"会被保留"的一侧（IndexedDB / localStorage / 桌面 userData）。守住四条：
1. 进度永远不写进会被替换的代码包
2. 存储 key 和 app 标识**永久不变**（别改 `cihai-*` 这些键）
3. 数据迁移只"加字段给默认值"，不做破坏性改动
4. 内置模型只当默认回退，不覆盖玩家自传的

## 发布命令
```
npm run build:release   # 产出 dist/ → 打包上传 itch / 喂给 Electron
```
