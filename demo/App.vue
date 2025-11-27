<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <h1>🚀 ActionAuthButton 组件演示</h1>
      <p>
        一个简洁强大的 Vue
        权限按钮组件，支持详情、编辑、新增、删除等操作的权限控制和二次确认
      </p>
    </div>

    <!-- 权限控制演示 -->
    <div class="demo-section">
      <h2>🔐 权限控制演示</h2>

      <div class="permission-control">
        <h3>当前权限状态</h3>
        <p>
          <strong>权限级别:</strong>
          {{
            currentPermission === '*'
              ? '超级管理员 (*)'
              : currentPermission === 'none'
              ? '无权限'
              : currentPermission
          }}
        </p>

        <a-space>
          <span>切换权限:</span>
          <a-button type="primary" @click="setPermission('*')">
            超级管理员
          </a-button>
          <a-button @click="setPermission('user:edit')"> 编辑权限 </a-button>
          <a-button @click="setPermission('user:view')"> 查看权限 </a-button>
          <a-button danger @click="setPermission('none')"> 无权限 </a-button>
        </a-space>

        <div style="margin-top: 10px">
          <small
            >💡 提示：当前使用真实的 ActionAuthButton 组件，权限基于模拟的 Vuex
            store</small
          >
        </div>
      </div>

      <h3>ActionAuthButton 组件演示</h3>
      <div class="button-group">
        <!-- 自动模式演示 -->
        <h4>🎯 自动模式（默认）</h4>
        <div class="button-row">
          <ActionAuthButton
            type="link"
            buttonType="view"
            :record="record"
            @click="handleClick"
          />
          <ActionAuthButton
            type="link"
            buttonType="edit"
            :record="record"
            @click="handleClick"
          />
          <ActionAuthButton
            type="link"
            buttonType="delete"
            :record="record"
            :confirmCallback="customExportConfirm"
          />
          <ActionAuthButton buttonType="add" @click="handleClick">
            新增用户
          </ActionAuthButton>
          <ActionAuthButton buttonType="action" @click="handleClick"
            >操作</ActionAuthButton
          >
        </div>

        <!-- 二次确认功能演示 -->
        <h4>🔔 二次确认功能演示</h4>
        <div class="button-row">
          <!-- 默认删除确认 -->
          <ActionAuthButton
            buttonType="delete"
            :record="record"
            @click="handleClick"
          >
            删除（默认确认）
          </ActionAuthButton>

          <!-- 自定义确认回调 -->
          <ActionAuthButton
            :confirmCallback="customExportConfirm"
            buttonType="delete"
            :record="record"
          />

          <!-- 复杂确认逻辑 -->
          <ActionAuthButton
            buttonType="edit"
            :confirmCallback="complexEditConfirm"
            confirmTitle="您确认要编辑这条重要数据吗？"
            @click="handleClick"
          >
            复杂编辑确认
          </ActionAuthButton>
        </div>

        <!-- 强制文本按钮模式演示 -->
        <h4>📝 强制文本按钮模式</h4>
        <div class="button-row">
          <ActionAuthButton
            buttonType="view"
            :record="record"
            @click="handleClick"
          />
          <ActionAuthButton buttonType="add" @click="handleClick">
            新增
          </ActionAuthButton>
          <ActionAuthButton
            buttonType="custom"
            icon="export"
            @click="handleClick"
          >
            导出
          </ActionAuthButton>
        </div>

        <!-- 强制 a-button 模式演示 -->
        <h4>🔘 强制 a-button 模式</h4>
        <div class="button-row">
          <ActionAuthButton
            buttonType="view"
            :record="record"
            @click="handleClick"
          />
          <ActionAuthButton
            buttonType="edit"
            :record="record"
            @click="handleClick"
          />
          <ActionAuthButton
            buttonType="delete"
            :record="record"
            @click="handleClick"
          />
        </div>

        <!-- 自定义样式演示 -->
        <h4>🎨 自定义样式演示</h4>
        <div class="button-row">
          <ActionAuthButton
            buttonType="custom"
            icon="export"
            @click="handleClick"
          >
            导出数据
          </ActionAuthButton>
          <ActionAuthButton
            buttonType="add"
            :button-style="{ padding: '0 40px', borderRadius: '20px' }"
            @click="handleClick"
          >
            宽按钮
          </ActionAuthButton>
          <ActionAuthButton
            buttonType="custom"
            icon="download"
            @click="handleClick"
          >
            下载
          </ActionAuthButton>
        </div>

        <!-- Disabled 状态演示 -->
        <h4>🚫 Disabled 状态演示</h4>
        <div class="button-row">
          <ActionAuthButton
            buttonType="view"
            type="link"
            :record="record"
            disabled
            @click="handleClick"
          />
          <ActionAuthButton
            buttonType="edit"
            :record="record"
            disabled
            @click="handleClick"
          />
          <ActionAuthButton buttonType="add" disabled @click="handleClick">
            新增
          </ActionAuthButton>
          <ActionAuthButton
            buttonType="custom"
            icon="export"
            disabled
            @click="handleClick"
          >
            导出
          </ActionAuthButton>
          <ActionAuthButton buttonType="view" disabled @click="handleClick" />
          <ActionAuthButton buttonType="edit" disabled @click="handleClick" />
        </div>
      </div>
    </div>

    <!-- 组件特性 -->
    <div class="demo-section">
      <h2>✨ 组件特性</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <h4>🔒 权限检查</h4>
          <p>根据 Vuex store 中的权限自动显示/隐藏按钮，支持细粒度权限控制</p>
        </div>
        <div class="feature-card">
          <h4>🎨 统一样式</h4>
          <p>不同操作类型的按钮有不同的默认样式和图标，保持界面一致性</p>
        </div>
        <div class="feature-card">
          <h4>❌ 灵活确认</h4>
          <p>
            支持自定义确认回调函数，可为任何操作添加二次确认，提供丰富的确认逻辑
          </p>
        </div>
        <div class="feature-card">
          <h4>⚡ 简化代码</h4>
          <p>一行代码替代多行权限检查逻辑，大幅减少重复代码</p>
        </div>
        <div class="feature-card">
          <h4>🛠️ 灵活配置</h4>
          <p>支持自定义图标、文本、状态等，满足不同业务需求</p>
        </div>
        <div class="feature-card">
          <h4>🌍 兼容性好</h4>
          <p>同时支持 Vue 2.x 和 Vue 3.x，兼容各种项目环境</p>
        </div>
      </div>
    </div>

    <!-- 操作类型 -->
    <div class="demo-section">
      <h2>🎯 支持的操作类型</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 15px 0">
        <a-tag color="blue" style="font-size: 14px; padding: 4px 8px"
          >view - 查看详情</a-tag
        >
        <a-tag color="green" style="font-size: 14px; padding: 4px 8px"
          >edit - 编辑数据</a-tag
        >
        <a-tag color="red" style="font-size: 14px; padding: 4px 8px"
          >delete - 删除数据 (默认确认)</a-tag
        >
        <a-tag color="purple" style="font-size: 14px; padding: 4px 8px"
          >add - 新增数据</a-tag
        >
        <a-tag color="orange" style="font-size: 14px; padding: 4px 8px"
          >custom - 自定义操作</a-tag
        >
      </div>
    </div>

    <!-- 使用示例 -->
    <div class="demo-section">
      <h2>💡 基本使用</h2>
      <div class="code-block">
        <pre>{{ usageExample }}</pre>
      </div>

      <h3>🔧 自定义确认回调方法</h3>
      <div class="code-block">
        <pre>{{ jsExample }}</pre>
      </div>
    </div>

    <!-- 测试数据表格 -->
    <!-- <div class="demo-section">
      <h2>📊 模拟数据表格</h2>
      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="false"
        size="middle"
      >
        <template slot="action" slot-scope="text, record">
          <ActionAuthButton buttonType="view" :record="record" @click="handleClick" />
          <ActionAuthButton buttonType="edit" :record="record" @click="handleClick" />
          <ActionAuthButton
            buttonType="delete"
            :record="record"
            @click="handleClick"
          />
        </template>
      </a-table>
    </div> -->
  </div>
</template>

<script>
import ActionAuthButton from '@/ActionAuthButton.vue'

export default {
  name: 'App',
  components: {
    ActionAuthButton,
  },
  data() {
    return {
      currentPermission: '*',
      record: {
        id: 1,
        name: '测试数据',
        description: '这是一条测试记录，用于演示权限按钮功能',
        createTime: '2024-01-01 10:00:00',
      },
      usageExample: `<!-- 基本使用 -->
<ActionAuthButton buttonType="view" :record="record" @click="handleView" />

<!-- 自定义文本 -->
<ActionAuthButton buttonType="add" @click="handleAdd">
  新增用户
</ActionAuthButton>

<!-- 强制文本模式 -->
<ActionAuthButton
  buttonType="edit"
  :record="record"
  @click="handleEdit"
/>

<!-- 自定义样式 -->
<ActionAuthButton
  buttonType="custom"
  icon="export"
  :button-style="{ padding: '0 40px' }"
  @click="handleExport"
>
  导出数据
</ActionAuthButton>

<!-- 默认删除确认 -->
<ActionAuthButton
  buttonType="delete"
  :record="record"
  @click="handleDelete"
/>

<!-- 自定义确认回调 -->
<ActionAuthButton
  buttonType="custom"
  :confirmCallback="customConfirm"
  confirmTitle="您确认要导出这些数据吗？"
  @click="handleExport"
>
  导出数据
</ActionAuthButton>

<!-- 复杂确认逻辑 -->
<ActionAuthButton
  buttonType="edit"
  :confirmCallback="complexConfirm"
  confirmTitle="您确认要编辑这条重要数据吗？"
  :record="record"
  @click="handleEdit"
/>

<!-- 禁用状态 -->
<ActionAuthButton
  buttonType="delete"
  :record="record"
  disabled
  @click="handleDelete"
/>`,
      jsExample: `// 自定义确认回调方法示例
methods: {
  // 异步确认回调（推荐）
  asyncCustomConfirm({ type, record }) {
    // 在用户点击确认时执行的业务逻辑
    console.log('执行确认回调:', { type, record })

    // 异步操作示例
    return new Promise((resolve, reject) => {
      // 业务逻辑检查
      if (!record || !record.id) {
        this.$message.error('无效数据！')
        reject(new Error('无效数据'))
        return
      }

      // 异步业务操作
      setTimeout(() => {
        console.log('操作完成')
        this.$message.success('操作成功！')
        resolve() // 成功时自动关闭弹窗
      }, 2000)
    })
  },

  // 同步确认回调
  syncCustomConfirm({ type, record }) {
    // 同步业务逻辑
    console.log('执行确认回调:', { type, record })

    // 简单检查
    if (!record || !record.id) {
      this.$message.error('无效数据！')
      return false // 返回 false 阻止关闭弹窗
    }

    // 执行业务逻辑
    this.$message.success('操作成功！')
    return true // 返回 true 允许关闭弹窗
  }
}`,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 80,
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '描述',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: 200,
        },
      ],
      tableData: [
        {
          id: 1,
          name: '张三',
          description: '这是张三的描述信息',
          createTime: '2024-01-01 10:00:00',
        },
        {
          id: 2,
          name: '李四',
          description: '这是李四的描述信息',
          createTime: '2024-01-02 11:00:00',
        },
        {
          id: 3,
          name: '王五',
          description: '这是王五的描述信息',
          createTime: '2024-01-03 12:00:00',
        },
      ],
    }
  },
  created() {
    // 初始化模拟的用户权限数据
    this.initMockUserPermissions()
  },
  methods: {
    initMockUserPermissions() {
      // 模拟存储用户权限到 localStorage
      const mockUserData = {
        userId: '1',
        loginId: 'admin',
        username: '超级管理员',
        permissions: [
          {
            id: '21e984d361504688b7028b5a775ff838',
            operation: ['delete', 'edit', 'add', 'view'],
          },
        ],
      }
      localStorage.setItem('admin.user', JSON.stringify(mockUserData))
    },

    setPermission(permission) {
      this.currentPermission = permission

      // 更新 Vuex store 中的权限
      this.$store.commit('setting/SET_CURRENT_PERMISSION_ID', permission)

      // 更新 localStorage 中的用户权限
      const mockUserData = {
        userId: '1',
        loginId: 'admin',
        username: '超级管理员',
        permissions:
          permission === 'none'
            ? []
            : [
                {
                  id: permission,
                  operation: ['view', 'edit', 'add', 'delete', 'action'],
                },
              ],
      }
      localStorage.setItem('admin.user', JSON.stringify(mockUserData))

      this.$message.success(
        `权限已切换到: ${permission === '*' ? '超级管理员' : permission}`
      )
    },

    // 统一的事件处理方法
    handleClick(eventData) {
      console.log('按钮点击事件:', eventData)

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
        case 'custom':
          this.handleCustom(eventData.record)
          break
        case 'action':
          this.handleAction(eventData.record)
          break
        default:
          this.$message.info(`未知操作类型: ${eventData.type}`)
      }
    },

    handleView(record) {
      this.$message.info(
        '查看操作: ' + JSON.stringify(record || this.record, null, 2)
      )
    },

    handleEdit(record) {
      this.$message.info(
        '编辑操作: ' + JSON.stringify(record || this.record, null, 2)
      )
    },

    handleDelete(record) {
      this.$message.success(
        '删除成功: ' + JSON.stringify(record || this.record, null, 2)
      )
    },

    handleAdd() {
      this.$message.info('新增操作')
    },

    handleCustom(record) {
      this.$message.info(
        '自定义操作: ' + JSON.stringify(record || this.record, null, 2)
      )
    },

    handleAction(record) {
      this.$message.info(
        '通用操作: ' + JSON.stringify(record || this.record, null, 2)
      )
    },

    // 自定义导出确认回调
    customExportConfirm({ type, record }) {
      console.log('自定义导出确认:', { type, record })

      // 在用户点击确认时执行的业务逻辑
      this.$message.success(`正在导出 ${record.name || '数据'}...`)

      // 模拟异步导出操作
      return new Promise((resolve, reject) => {
        // 检查数据状态
        const hasData = record && record.id
        if (!hasData) {
          this.$message.error('没有数据可以导出！')
          reject(new Error('无数据'))
          return
        }

        // 模拟异步操作
        setTimeout(() => {
          console.log('导出操作完成')
          this.$message.success('导出完成！')
          resolve() // 成功时 resolve，弹窗会自动关闭
        }, 2000)
      })
    },

    // 复杂编辑确认回调
    complexEditConfirm({ type, record }) {
      console.log('复杂编辑确认:', { type, record })

      // 在用户点击确认时执行的业务逻辑
      return new Promise((resolve, reject) => {
        // 检查数据是否可以被编辑
        const isEditable = record && record.id && !record.locked

        if (!isEditable) {
          this.$message.error('此数据已锁定，无法编辑！')
          reject(new Error('数据锁定'))
          return
        }

        // 如果数据是重要数据，需要额外确认
        if (record && record.name && record.name.includes('重要')) {
          this.$confirm({
            title: '重要数据编辑警告',
            content:
              '您即将编辑重要数据，此操作可能会影响系统正常运行。请确认您已了解相关风险。',
            okText: '我知道风险，继续编辑',
            cancelText: '取消',
            okButtonProps: {
              danger: true,
            },
            onOk: () => {
              console.log('重要数据编辑确认通过')
              this.$message.success('编辑权限已获取，正在打开编辑页面...')
              setTimeout(() => {
                resolve() // 确认后 resolve
              }, 1000)
            },
            onCancel: () => {
              reject(new Error('用户取消'))
            },
          })
        } else {
          // 普通数据直接确认
          console.log('普通数据编辑确认通过')
          this.$message.success('正在打开编辑页面...')
          setTimeout(() => {
            resolve()
          }, 500)
        }
      })
    },
  },
}
</script>

<style scoped>
.button-group {
  margin: 20px 0;
}

.button-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fafafa;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
}

.button-row h4 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

.button-row:first-child h4 {
  margin-bottom: 0;
}

.button-row:first-child {
  display: block;
}

.button-row .button-row {
  margin-top: 15px;
  background-color: #fff;
}

.button-row .button-row h4 {
  font-size: 14px;
  color: #666;
}

/* 按钮组样式优化 */
.button-row:not(:first-child) {
  padding-left: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .button-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
