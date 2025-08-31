
## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI组件**: Tailwind CSS + shadcn/ui
- **状态管理**: React Context / Zustand
- **类型安全**: TypeScript
- **样式**: CSS Modules / Tailwind CSS

## 📁 推荐项目结构

```
app/
├── (auth)/
│   └── login/
│       ├── page.tsx
│       └── _components/
│           └── login-form.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx
│   └── reports/
│       ├── page.tsx
│       └── _components/
│           └── report-table.tsx
└── table/
    └── page.tsx

components/
├── ui/
│   ├── button.tsx
│   └── card.tsx
├── layout/
│   └── sidebar.tsx            # 由原 sidebar-layout.tsx 拆到这里，通用化
└── feedback/
    └── toast.tsx

features/
├── auth/
│   ├── api.ts
│   ├── hooks.ts
│   └── components/
│       └── user-avatar.tsx
└── clock/
    ├── components/
    │   └── terminal-clock-in.tsx  # 从根 components/ 迁到 feature
    ├── api.ts
    └── hooks.ts

contexts/
└── auth-context.tsx          # 若改用 Zustand，可迁至 stores/

stores/
└── theme.store.ts

lib/
└── utils.ts

services/
└── http.ts

public/
└── ...
```

## 🏗️ 目录结构说明

### `app/` - Next.js App Router
- `(auth)/` - 认证相关页面（路由组）
- `(dashboard)/` - 仪表板相关页面（路由组）
- `table/` - 数据表格页面

### `components/` - 通用组件
- `ui/` - 基础UI组件（按钮、卡片等）
- `layout/` - 布局相关组件
- `feedback/` - 用户反馈组件（提示、通知等）

### `features/` - 功能模块
- `auth/` - 认证功能模块
- `clock/` - 打卡功能模块
- 每个模块包含：`api.ts`、`hooks.ts`、`components/`

### `contexts/` - React Context
- 全局状态管理（认证状态等）

### `stores/` - 状态管理
- Zustand 状态管理（主题、用户偏好等）

### `lib/` - 工具库
- 通用工具函数

### `services/` - 服务层
- HTTP 请求封装
- API 服务

## 🚀 快速开始

### 安装依赖

```bash
npm install

### 运行开发服务器

```bash
npm run dev


在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
npm run build
npm start
```

## 🔐 认证说明

- **默认员工编号**: `123456`
- 输入正确的员工编号即可登录系统
- 登录后可以访问打卡和报表功能

## 📝 开发指南

### 添加新功能

1. 在 `features/` 目录下创建新的功能模块
2. 在 `app/` 目录下添加对应的页面
3. 在 `components/` 目录下添加通用组件

### 组件开发规范

- 使用 TypeScript 进行类型定义
- 遵循 React Hooks 最佳实践
- 使用 Tailwind CSS 进行样式设计
- 组件命名采用 PascalCase

### 状态管理

- 全局状态使用 React Context 或 Zustand
- 组件内部状态使用 useState/useReducer
- API 状态使用 React Query 或 SWR

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues: [GitHub Issues](https://github.com/your-username/host-screen/issues)
- 邮箱: your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
