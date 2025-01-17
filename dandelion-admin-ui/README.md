# Dandelion Admin UI

基于 React + Vite + TypeScript + Ant Design 的现代化管理系统。

## 核心需求

### 1. 系统布局

#### 1.1 左侧布局
- 顶部：Logo + 系统名称
- 底部：可折叠的菜单导航栏
  - 支持多级菜单
  - 菜单项通过后端接口动态生成
  - 支持菜单折叠/展开

#### 1.2 右侧布局
- 顶部Header
  - 面包屑导航
  - 用户信息
  - 系统设置入口
- 内容区域Content
  - 响应式布局
  - 路由匹配对应页面组件
  - 支持页面缓存

### 2. 请求处理

#### 2.1 统一请求封装
- 基于Axios封装请求库
- 支持请求/响应拦截器
- 统一的错误处理机制
- 支持请求重试
- 请求超时处理

#### 2.2 响应数据结构
```typescript
interface ApiResponse<T> {
  code: number;      // 状态码，20000表示成功
  msg: string;       // 响应信息
  request_id: string;// 请求ID，用于追踪
  data: T;          // 具体业务数据
}
```

#### 2.3 错误处理
- 统一的错误处理中间件
- code !== 20000 时显示全局错误提示
- 支持特定接口自定义错误处理
- 网络错误统一处理

#### 2.4 Mock服务
- 基于vite-plugin-mock实现
- 支持开发环境动态mock
- 支持生产环境mock配置
- 模拟真实的接口延迟

### 3. 权限控制

#### 3.1 菜单权限
- 动态菜单树接口
- 菜单配置结构
```typescript
interface MenuItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
  permission?: string[];
}
```

#### 3.2 页面权限
- 路由级别权限控制
- 页面按钮级别权限控制
- 权限code动态获取
- 无权限时的优雅降级处理

#### 3.3 权限实现方案
- 基于RBAC（Role-Based Access Control）模型
- 路由守卫实现页面权限控制
- 自定义指令实现按钮级权限
- 权限缓存优化

## 技术方案

### 1. 项目架构
- 基于Vite构建
- React 18 + TypeScript
- Ant Design组件库
- Pnpm包管理器

### 2. 状态管理
- Zustand状态管理
- 支持持久化存储
- 模块化状态设计

### 3. 路由方案
- React Router 6
- 路由懒加载
- 路由元信息配置
- 路由守卫实现

### 4. 代码规范
- ESLint + Prettier代码格式化
- Husky + lint-staged提交校验
- Commitlint提交信息规范
- TypeScript严格模式

### 5. 构建优化
- 路由懒加载
- 组件按需加载
- 资源预加载
- 打包分析与优化

## 目录结构
```
src/
├── api/                # API接口定义
├── assets/            # 静态资源
├── components/        # 公共组件
├── hooks/             # 自定义hooks
├── layouts/           # 布局组件
├── pages/             # 页面组件
├── router/            # 路由配置
├── store/             # 状态管理
├── styles/            # 全局样式
├── types/             # TS类型定义
├── utils/             # 工具函数
└── mock/              # Mock数据
```

## 开发计划

### Phase 1: 基础架构搭建
- [√] 项目初始化
- [√] 布局框架实现
- [√] 路由系统搭建
- [√] 请求库封装

### Phase 2: 核心功能实现
- [√] 动态菜单实现
- [√] 权限系统搭建
- [√] Mock服务集成
- [√] 状态管理实现

### Phase 3: 功能完善
- [ ] 错误处理机制
- [ ] 页面缓存实现
- [ ] 主题配置
- [ ] 性能优化

## 开发规范

### Git提交规范
```
feat: 新功能
fix: 修复
docs: 文档变更
style: 代码格式
refactor: 重构
test: 测试
chore: 构建过程或辅助工具的变动
```

### 命名规范
- 文件夹：小写中划线
- 组件：大驼峰
- 函数：小驼峰
- 常量：大写下划线
- 类型：大驼峰+Type后缀

## 运行项目

```bash
# 安装依赖
pnpm install

# 开发环境
pnpm dev

# 构建
pnpm build

# 预览
pnpm preview
```
