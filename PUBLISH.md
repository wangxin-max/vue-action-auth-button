# 🚀 发布指南

## 📋 发布前准备

### 1. 更新 package.json 信息

```json
{
  "name": "vue-action-auth-button",
  "version": "1.0.0",
  "description": "一个简洁强大的 Vue 权限按钮组件",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/vue-action-auth-button.git"
  }
}
```

### 2. 创建 Git 仓库并推送

```bash
git init
git add .
git commit -m "feat: 初始版本"

# 创建 GitHub 仓库后
git remote add origin https://github.com/yourusername/vue-action-auth-button.git
git push -u origin main
```

### 3. 注册 npm 账号

如果没有 npm 账号，先注册：
- 访问 [npm 官网](https://www.npmjs.com/)
- 注册账号并登录

## 🔧 构建和发布

### 1. 安装依赖

```bash
npm install
```

### 2. 构建包

```bash
npm run build
```

### 3. 登录 npm

```bash
npm login
# 输入用户名、密码和邮箱
```

### 4. 发布包

```bash
npm publish
```

### 5. 验证发布

```bash
npm info vue-action-auth-button
```

## 📦 项目结构

```
vue-action-auth-button/
├── src/                    # 源码
│   ├── index.js           # 入口文件
│   ├── ActionAuthButton.vue # 主组件
│   └── authority-utils.js  # 权限工具
├── dist/                   # 构建输出
├── package.json           # 包配置
├── README.md             # 使用文档
├── rollup.config.js      # 构建配置
├── .babelrc              # Babel配置
├── tsconfig.json         # TypeScript配置
└── .npmignore           # 忽略文件
```

## 🔄 版本更新

### 更新补丁版本 (1.0.1)

```bash
npm version patch
npm publish
```

### 更新次版本 (1.1.0)

```bash
npm version minor
npm publish
```

### 更新主版本 (2.0.0)

```bash
npm version major
npm publish
```

## 🧪 测试发布

### 本地测试

```bash
# 链接到本地
npm link

# 在其他项目中测试
npm link vue-action-auth-button
```

### 测试发布

```bash
# 发布到测试仓库
npm publish --tag beta

# 安装测试版本
npm install vue-action-auth-button@beta
```

## 📝 注意事项

### 1. 包名检查

确保包名没有被占用：

```bash
npm view vue-action-auth-button
```

### 2. 版本号规则

遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：
- `MAJOR.MINOR.PATCH`
- 主版本号：不兼容的API修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 3. 发布标签

```bash
# 最新版本
npm publish --tag latest

# 稳定版本
npm publish --tag stable

# 测试版本
npm publish --tag beta
```

### 4. 撤销发布

如果发现问题，可以撤销：

```bash
npm unpublish vue-action-auth-button
# 只能在发布后72小时内撤销
```

## 🔍 常见问题

### 1. 权限错误

```bash
npm ERR! 403 You do not have permission to publish "vue-action-auth-button"
```

解决方案：
- 检查包名是否被占用
- 确认 npm 账号登录状态

### 2. 重复发布

```bash
npm ERR! 403 You cannot publish over the previously published versions
```

解决方案：
- 更新版本号：`npm version patch`
- 使用 `npm publish --force`（不推荐）

### 3. 依赖冲突

确保 peerDependencies 版本正确：

```json
{
  "peerDependencies": {
    "vue": "^2.6.0 || ^3.0.0"
  }
}
```

## 🎉 发布成功后的操作

1. **更新 README** - 添加使用示例和徽章
2. **创建 Release** - 在 GitHub 创建对应版本的 Release
3. **推广分享** - 在社区和社交媒体分享你的组件
4. **维护更新** - 及时回复 Issue 和 PR

---

🚀 **恭喜！你的组件已经发布到 npm！**