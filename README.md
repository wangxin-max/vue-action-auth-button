# Vue Action Auth Button

[![npm version](https://badge.fury.io/js/vue-action-auth-button.svg)](https://badge.fury.io/js/vue-action-auth-button)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![vue2](https://img.shields.io/badge/vue-2.x-green.svg)](https://vuejs.org/)
[![vue3](https://img.shields.io/badge/vue-3.x-green.svg)](https://vuejs.org/)

一个简洁强大的 Vue 权限按钮组件，基于 Ant Design Vue，支持详情、编辑、新增、删除等操作的权限控制和二次确认。

## ✨ 特性

- 🔒 **权限控制** - 基于 Vuex store 的权限检查，自动控制按钮显示/隐藏
- 🎯 **多种操作** - 支持详情(view)、编辑(edit)、新增(add)、删除(delete)、自定义(custom)、通用(action)类型
- 🎯 **统一事件** - 所有操作统一使用 `@click` 事件，简化事件处理逻辑
- ❌ **灵活确认** - 支持自定义确认回调函数，可为任何操作添加二次确认，提供丰富的确认逻辑
- 🛠️ **高度可配置** - 支持禁用状态、加载状态、自定义样式等
- 🌍 **国际化** - 支持中英文提示文本
- 🔧 **原生 disabled 支持** - 完整的 HTML disabled 属性支 ���，禁用状态下仍可显示 tooltip
- 🎨 **基于 Ant Design** - 完全基于 a-button 组件，样式和行为一致,支持 antdesign-vue 2.15.4 及一下的所有属性

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
  render: (h) => h(App),
}).$mount('#app')
```

### 基本使用

```vue
<template>
  <div>
    <!-- 基本按钮类型 -->
    <ActionAuthButton buttonType="view" :record="record" @click="handleClick" />
    <ActionAuthButton buttonType="edit" :record="record" @click="handleClick" />
    <ActionAuthButton
      buttonType="delete"
      :record="record"
      @click="handleClick"
    />
    <ActionAuthButton buttonType="add" type="primary" @click="handleClick"
      >新增</ActionAuthButton
    >

    <!-- 自定义操作 -->
    <ActionAuthButton
      buttonType="custom"
      type="default"
      icon="export"
      @click="handleClick"
    >
      导出数据
    </ActionAuthButton>

    <!-- 内置自定义类型 -->
    <ActionAuthButton
      buttonType="export"
      icon="download"
      @click="handleClick"
    />
    <ActionAuthButton
      buttonType="upload"
      type="primary"
      icon="upload"
      @click="handleClick"
    />

    <!-- 完全自定义类型 -->
    <ActionAuthButton
      buttonType="sync-data"
      type="dashed"
      icon="sync"
      @click="handleClick"
    />

    <!-- 自定义确认回调 -->
    <ActionAuthButton
      buttonType="export"
      :confirmCallback="() => customConfirm(record)"
      confirmTitle="您确认要导出这些数据吗？"
      @click="handleClick"
    />

    <!-- 自定义样式 -->
    <ActionAuthButton
      buttonType="add"
      type="primary"
      :button-style="{ padding: '0 40px' }"
      @click="handleClick"
    >
      新增用户
    </ActionAuthButton>

    <!-- 禁用状态 -->
    <ActionAuthButton
      buttonType="edit"
      :record="record"
      disabled
      @click="handleClick"
    />
  </div>
</template>

<script>
import { ActionAuthButton } from 'vue-action-auth-button'

export default {
  components: {
    ActionAuthButton,
  },
  data() {
    return {
      record: { id: 1, name: '测试数据', status: 'inactive' },
    }
  },
  methods: {
    handleClick(eventData) {
      console.log('操作类型:', eventData.type)
      console.log('记录数据:', eventData.record)

      switch (eventData.type) {
        case 'view':
          this.handleView(eventData.record)
          break
        case 'edit':
          this.handleEdit(eventData.record)
          break
        case 'add':
          this.handleAdd()
          break
        case 'delete':
          this.handleDelete(eventData.record)
          break
        case 'export':
          this.handleExport(eventData.record)
          break
        case 'upload':
          this.handleUpload(eventData.record)
          break
        case 'sync-data':
          this.handleSyncData(eventData.record)
          break
        case 'custom':
          this.handleCustom(eventData.record)
          break
        case 'action':
          this.handleAction(eventData.record)
          break
        default:
          // 处理其他自定义类型
          this.handleCustomType(eventData.type, eventData.record)
          break
      }
    },

    // 自定义确认回调
    customConfirm({ type, record }) {
      console.log('执行确认回调:', { type, record })

      // 异步业务逻辑示例
      return new Promise((resolve, reject) => {
        // 检查数据状态
        if (!record || !record.id) {
          this.$message.error('没有数据可以导出！')
          reject(new Error('无数据'))
          return
        }

        // 模拟异步操作
        this.$message.success('���在导出数据...')
        setTimeout(() => {
          console.log('导出操作完成')
          this.$message.success('导出成功！')
          resolve() // 成功时弹窗自动关闭
        }, 2000)
      })
    },

    handleView(record) {
      console.log('查看详情:', record)
    },

    handleEdit(record) {
      console.log('编辑:', record)
    },

    handleAdd() {
      console.log('新增数据')
    },

    handleDelete(record) {
      console.log('删除:', record)
      // 在这里调用删除API
    },

    handleCustom(record) {
      console.log('自定义操作:', record)
    },

    handleAction(record) {
      console.log('通用操作:', record)
    },

    // 内置自定义类型处理方法
    handleExport(record) {
      console.log('导出操作:', record)
      this.$message.success('开始导出数据...')
    },

    handleUpload(record) {
      console.log('上传操作:', record)
      this.$message.success('开始上传文件...')
    },

    handleSyncData(record) {
      console.log('同步数据操作:', record)
      this.$message.info('正在同步数据...')
    },

    // 通用自定义类型处理器
    handleCustomType(type, record) {
      console.log('自定义类型操作:', type, record)
      this.$message.info(`执行 ${type} 操作`)
    },
  },
}
</script>
```

## 📋 API 文档

### Props

| 参数            | 类型     | 必填 | 默认值                 | 说明                                                                  |
| --------------- | -------- | ---- | ---------------------- | --------------------------------------------------------------------- |
| **buttonType**  | String   | ✅   | -                      | 按钮类型：支持内置类型(`view`/`edit`/`add`/`delete`/`custom`/`action`)和自定义类型(`export`/`download`/`upload`等) |
| text            | String   | ❌   | ''                     | 自定义按钮文本                                                        |
| record          | Object   | ❌   | {}                     | 当前数据记录                                                          |
| icon            | String   | ❌   | null                   | 图标类型（ant-design-vue 图标）                                       |
| disabled        | Boolean  | ❌   | false                  | 是否禁用（除权限外）                                                  |
| loading         | Boolean  | ❌   | false                  | 加载状态                                                              |
| type            | String   | ❌   | 'primary'              | a-button 类型：`'primary'`/`'default'`/`'dashed'`/`'danger'`/`'link'` |
| size            | String   | ❌   | 'default'              | 按钮尺寸：`'small'`/`'default'`/`'large'`                             |
| confirmTitle    | String   | ❌   | '您确认执行此操作吗？' | 确认弹窗标题                                                          |
| confirmCallback | Function | ❌   | null                   | 自定义确认回调函数                                                    |
| buttonStyle     | Object   | ❌   | {}                     | 自定义样式                                                            |

### Events

| 事件名    | 参数                              | 说明                                     |
| --------- | --------------------------------- | ---------------------------------------- |
| **click** | `{ type, record, originalEvent }` | 统一的点击事件，所有操作都通过此事件回调 |

### 事件数据格式

```javascript
// click 事件的回调参数
{
  type: 'view|edit|add|delete|custom|action',  // 操作类型
  record: Object | undefined,                 // 数据记录（add 操作时为 undefined）
  originalEvent: 'click'                      // 原始事件类型
}
```

### 按钮类型和默认样式

#### 内置类型

| 类型     | 默认文本 | 默认颜色 | 说明                   |
| -------- | -------- | -------- | ---------------------- |
| `view`   | 详情     | 🔵 蓝色  | 查看详情操作           |
| `edit`   | 编辑     | 🔵 蓝色  | 编辑操作               |
| `delete` | 删除     | 🔴 红色  | 删除操作，默认确认弹窗 |
| `add`    | 新增     | 🔵 蓝色  | 新增操作               |
| `custom` | -        | 🔵 蓝色  | 自定义操作，完全可配置 |
| `action` | 操作     | 🔵 蓝色  | 通用操作类型           |

#### 常见自定义类型

| 类型     | 默认文本 | 默认颜色 | 说明           |
| -------- | -------- | -------- | -------------- |
| `export` | 导出     | 🔵 蓝色  | 数据导出操作   |
| `download` | 下载   | 🔵 蓝色  | 文件下载操作   |
| `upload` | 上传     | 🔵 蓝色  | 文件上传操作   |
| `import` | 导入     | 🔵 蓝色  | 数据导入操作   |
| `copy`   | 复制     | 🔵 蓝色  | 复制操作       |
| `print`  | 打印     | 🔵 蓝色  | 打印操作       |

> **注意**：组件支持任意自定义的 `buttonType` 字符串，未预定义的类型会直接使用 `buttonType` 值作为按钮文本。

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
      currentPermissionId: 'user:manage', // 当前页面的权限ID
    },
  },
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

## 🔔 自定义确认功能

组件支持灵活的自定义确认功能，允许您为任何操作添加二次确认逻辑。

### ⚠️ 重要使用提示

在使用 `confirmCallback` 时，**请务必传递函数引用而不是函数执行结果**：

```vue
<!-- ✅ 正确：传递函数引用 -->
<ActionAuthButton :confirmCallback="() => onDelete(record.id)" />

<!-- ✅ 正确：传递方法名 -->
<ActionAuthButton :confirmCallback="handleDeleteConfirm" />

<!-- ❌ 错误：会立即执行 onDelete(record.id) -->
<ActionAuthButton :confirmCallback="onDelete(record.id)" />
```

**错误原因**：`onDelete(record.id)` 会立即执行函数并传递返回值给组件，导致数据在页面加载时就被删除。

### 基本用法

```vue
<template>
  <!-- 默认删除确认 -->
  <ActionAuthButton buttonType="delete" :record="record" @click="handleClick" />

  <!-- 自定义确认回调 -->
  <ActionAuthButton
    buttonType="custom"
    :confirmCallback="customConfirm"
    confirmTitle="您确认要执行此操作吗？"
    @click="handleClick"
  >
    带确认的操作
  </ActionAuthButton>
</template>

<script>
export default {
  methods: {
    // 自定义确认回调
    customConfirm({ type, record }) {
      // 在用户点击确认时执行的业务逻辑
      console.log('执行确认回调:', { type, record })

      // 可以返回同步结果或 Promise
      return new Promise((resolve, reject) => {
        // 业务逻辑检查
        if (!record || !record.id) {
          this.$message.error('无效数据！')
          reject(new Error('无效数据'))
          return
        }

        // 执行业务操作
        this.$message.success('正在处理...')
        setTimeout(() => {
          console.log('操作完成')
          this.$message.success('操作成功！')
          resolve() // 成功时弹窗自动关闭
        }, 2000)
      })
    },
  },
}
</script>
```

### 确认回调参数

```javascript
// confirmCallback 接收的参数
{
  type: 'view|edit|add|delete|custom|action',  // 操作类型
  record: Object | undefined                   // 当前数据记录
}
```

### 确认回调返回值

确认回调函数支持两种返回值：

#### 1. 同步返回

```javascript
customConfirm({ type, record }) {
  // 简单检查
  if (!record || !record.id) {
    return false // 阻止关闭弹窗
  }

  // 执行操作
  this.$message.success('操作成功！')
  return true // 允许关闭弹窗
}
```

#### 2. 异步返回（推荐）

```javascript
customConfirm({ type, record }) {
  return new Promise((resolve, reject) => {
    // 业务逻辑
    if (dataValid) {
      // 操作成功
      resolve() // 弹窗自动关闭
    } else {
      // 操作失败，弹窗不关闭（但会记录错误）
      reject(new Error('数据无效'))
    }
  })
}
```

### 使用场景示例

#### 1. 数据导出确认

```javascript
exportConfirm({ type, record }) {
  this.$message.info('准备导出数据...')

  return fetch('/api/export', {
    method: 'POST',
    body: JSON.stringify(record)
  })
  .then(response => {
    if (response.ok) {
      this.$message.success('导出成功！')
      return response.blob()
    }
    throw new Error('导出失败')
  })
  .then(blob => {
    // 下载文件
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.xlsx'
    a.click()
  })
}
```

#### 2. 重要操作确认

```javascript
importantEditConfirm({ type, record }) {
  return new Promise((resolve, reject) => {
    if (record.important) {
      // 重要数据需要额外确认
      this.$confirm({
        title: '重要数据警告',
        content: '这是重要数据，请谨慎操作！',
        onOk: () => {
          this.$message.success('权限已确认')
          resolve()
        },
        onCancel: () => {
          reject(new Error('用户取消'))
        }
      })
    } else {
      resolve() // 普通数据直接通过
    }
  })
}
```

## 🛠️ 高级用法

### 替换原有权限控制

```vue
<!-- 原来的代码 -->
<span
  v-show="hasButtonAuthority(currentPermissionId, 'view')"
  @click="handleView(record)"
>详情</span>
<a-popconfirm
  v-show="hasButtonAuthority(currentPermissionId, 'delete')"
  @confirm="handleDelete(record)"
>
  <span>删除</span>
</a-popconfirm>

<!-- 使用组件后 - 统一事件处理 -->
<ActionAuthButton type="view" :record="record" @click="handleClick" />
<ActionAuthButton type="delete" :record="record" @click="handleClick" />

<script>
methods: {
  handleClick(eventData) {
    switch(eventData.type) {
      case 'view': this.handleView(eventData.record); break
      case 'delete': this.handleDelete(eventData.record); break
    }
  }
}
</script>
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
    ActionAuthButton,
  },
  methods: {
    handleView(record: RecordData) {
      console.log('查看:', record)
    },
  },
})
```

## 📝 更新日志

### v3.1.0

- ❌ **灵活确认功能** - 新增自定义确认回调函数 `confirmCallback`，支持为任何操作添加二次确认
- 🔧 **权限判断修复** - 修复权限检查逻辑，正确处理超级管理员权限
- 🎯 **确认逻辑优化** - 分离确认处理和业务逻辑，支持同步和异步回调
- 📚 **文档更新** - 新增自定义确认功能详细文档和使用示例

### v3.0.0

- 🔧 **统一使用 a-button** - 取消文本按钮模式，所有按钮都基于 Ant Design 的 a-button 组件
- 🔧 **原生 disabled 支持** - 完整的 HTML disabled 属性支持，禁用状态下仍可显示 tooltip
- 🎯 **简化事件处理** - 移除复杂的事件阻止逻辑，简化组件内部实现
- 🎨 **样式重构** - 完全依赖 Ant Design 样式系统，移除自定义 CSS
- 🔧 **代码简化** - 减少 60% 的组件代码量，提高可维护性

### v2.0.0

- 🎛️ **新增 buttonMode 属性** - 支持自动模式、文本按钮模式、a-button 组件模式
- 🎯 **统一事件回调** - 所有操作统一使用 `@click` 事件，简化事件处理逻辑
- ✨ **新增 action 类型** - 支持通用操作类型
- 🎨 **闪烁优化** - 解决页面刷新时的宽度闪烁问题
- 🔧 **模板重构** - 使用动态组件，减少 70% 的模板代码量
- 📦 **更好的默认值** - 优化组件初始化，减少渲染问题

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
