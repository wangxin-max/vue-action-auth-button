# Vue Action Auth Button

[![npm version](https://badge.fury.io/js/vue-action-auth-button.svg)](https://badge.fury.io/js/vue-action-auth-button)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![vue2](https://img.shields.io/badge/vue-2.x-green.svg)](https://vuejs.org/)
[![vue3](https://img.shields.io/badge/vue-3.x-green.svg)](https://vuejs.org/)

一个简洁强大的 Vue 权限按钮组件，支持详情、编辑、新增、删除等操作的权限控制和二次确认。

## ✨ 特性

- 🔒 **权限控制** - 基于 Vuex store 的权限检查，自动控制按钮显示/隐藏
- 🎯 **多种操作** - 支持详情(view)、编辑(edit)、新增(add)、删除(delete)、自定义(custom)类型
- ❌ **删除确认** - 内置删除确认弹窗，无需额外配置
- 🎨 **样式统一** - 自适应样式，支持自定义图标和文本
- ⚡ **轻量级** - 仅 130 行代码，性能优秀
- 🛠️ **高度可配置** - 支持禁用状态、加载状态、自定义提示等
- 🌍 **国际化** - 支持中英文提示文本

## 📦 安装

```bash
# npm
npm install vue-action-auth-button

# yarn
yarn add vue-action-auth-button

# pnpm
pnpm add vue-action-auth-button
```

## 🚀 快速开始

### 全局注册

```javascript
import Vue from 'vue'
import App from './App.vue'
import ActionAuthButton from 'vue-action-auth-button'
import 'ant-design-vue/dist/antd.css' // 需要安装 ant-design-vue

Vue.use(ActionAuthButton)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 局部注册

```vue
<template>
  <div>
    <!-- 详情按钮 -->
    <ActionAuthButton
      type="view"
      icon="eye"
      :record="record"
      @view="handleView"
    />

    <!-- 编辑按钮 -->
    <ActionAuthButton
      type="edit"
      icon="edit"
      :record="record"
      @edit="handleEdit"
    />

    <!-- 删除按钮（内置确认弹窗） -->
    <ActionAuthButton
      type="delete"
      icon="delete"
      :record="record"
      :disabled="record.status === 'active'"
      @delete="handleDelete"
    />

    <!-- 新增按钮 -->
    <ActionAuthButton
      type="add"
      button-type="primary"
      icon="plus"
      @add="handleAdd"
    >
      新增数据
    </ActionAuthButton>

    <!-- 自定义按钮 -->
    <ActionAuthButton
      type="export"
      icon="download"
      button-type="default"
      :record="queryParams"
      @click="handleExport"
    >
      导出数据
    </ActionAuthButton>
  </div>
</template>

<script>
import { ActionAuthButton } from 'vue-action-auth-button'

export default {
  components: {
    ActionAuthButton
  },
  data() {
    return {
      record: { id: 1, name: '测试数据', status: 'inactive' },
      queryParams: { page: 1, limit: 10 }
    }
  },
  methods: {
    handleView(record) {
      console.log('查看详情:', record)
    },
    handleEdit(record) {
      console.log('编辑:', record)
    },
    handleDelete(record) {
      console.log('删除:', record)
      // 在这里调用删除API
    },
    handleAdd() {
      console.log('新增数据')
    },
    handleExport(queryParams) {
      console.log('导出数据:', queryParams)
    }
  }
}
</script>
```

## 📋 API 文档

### Props

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| **type** | String | ✅ | - | 按钮类型：`view`/`edit`/`add`/`delete`/`custom` |
| text | String | ❌ | '' | 自定义按钮文本 |
| record | Object | ❌ | {} | 当前数据记录 |
| icon | String | ❌ | null | 图标类型（ant-design-vue 图标） |
| disabled | Boolean | ❌ | false | 是否禁用（除权限外） |
| loading | Boolean | ❌ | false | 加载状态 |
| buttonType | String | ❌ | 'primary' | 按钮类型（add/custom 有效） |
| size | String | ❌ | 'default' | 按钮大小 |
| confirmTitle | String | ❌ | '您确认删除这条数据吗？' | 删除确认文案 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| view | record | 点击详情按钮时触发 |
| edit | record | 点击编辑按钮时触发 |
| add | - | 点击新增按钮时触发 |
| delete | record | 确认删除时触发 |
| click | record | 点击自定义按钮时触发 |

### 按钮类型和默认样式

| 类型 | 默认文本 | 默认颜色 | 说明 |
|------|----------|----------|------|
| `view` | 详情 | 🔵 蓝色 | 查看详情操作 |
| `edit` | 编辑 | 🟢 绿色 | 编辑操作 |
| `delete` | 删除 | 🔴 红色 | 删除操作，内置确认弹窗 |
| `add` | 新增 | 🔵 蓝色 | 新增操作，按钮样式 |
| `custom` | - | ⚪ 默认 | 自定义操作，完全可配置 |

## 🔧 权限配置

组件需要 Vuex store 配置来获取权限信息：

### 1. 安装 Vuex

```bash
npm install vuex
```

### 2. 配置 Store

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    setting: {
      currentPermissionId: 'user:manage' // 当前页面的权限ID
    }
  }
})
```

### 3. 权限数据格式

用户权限数据应存储在 `localStorage` 中：

```javascript
{
  "permissions": [
    "user:manage",  // 权限ID
    {
      "id": "user:manage",
      "operation": ["view", "edit", "delete", "add"]  // 支持的操作
    }
  ]
}
```

## 🛠️ 高级用法

### 替换原有权限控制

```vue
<!-- 原来的代码 -->
<span v-show="hasButtonAuthority(currentPermissionId, 'view')" @click="handleView(record)">详情</span>
<a-popconfirm v-show="hasButtonAuthority(currentPermissionId, 'delete')" @confirm="handleDelete(record)">
  <span>删除</span>
</a-popconfirm>

<!-- 使用组件后 -->
<ActionAuthButton type="view" :record="record" @view="handleView" />
<ActionAuthButton type="delete" :record="record" @delete="handleDelete" />
```

### 自定义权限检查

```javascript
import { hasButtonAuthority } from 'vue-action-auth-button'

// 手动检查权限
const canEdit = hasButtonAuthority('user:manage', 'edit')
```

### TypeScript 支持

```typescript
import { ActionAuthButton } from 'vue-action-auth-button'
import type { ButtonType, RecordData } from 'vue-action-auth-button'

export default defineComponent({
  components: {
    ActionAuthButton
  },
  methods: {
    handleView(record: RecordData) {
      console.log('查看:', record)
    }
  }
})
```

## 📝 更新日志

### v1.0.0

- ✨ 初始发布
- 🎯 支持 5 种按钮类型：view、edit、add、delete、custom
- 🔒 集成权限控制
- ❌ 内置删除确认弹窗
- 🎨 自适应样式
- 🛠️ 完整的 TypeScript 支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发

```bash
# 克隆项目
git clone https://github.com/yourusername/vue-action-auth-button.git

# 安装依赖
npm install

# 开发
npm run dev

# 构建
npm run build

# 发布
npm publish
```

## 📄 许可证

[MIT](LICENSE)

## 🔗 相关链接

- [Ant Design Vue](https://www.antdv.com/)
- [Vue.js](https://vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)

---

⭐ 如果这个组件对你有帮助，请给个 Star！