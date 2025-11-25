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
        <!-- 查看按钮 -->
        <ActionAuthButton type="view" :record="record" @view="handleView" />

        <!-- 编辑按钮 -->
        <ActionAuthButton type="edit" :record="record" @edit="handleEdit" />

        <!-- 删除按钮 -->
        <ActionAuthButton
          type="delete"
          :record="record"
          @delete="handleDelete"
        />

        <!-- 新增按钮 -->
        <ActionAuthButton type="add" button-type="primary" @add="handleAdd">
          新增用户
        </ActionAuthButton>

        <!-- 自定义按钮 -->
        <ActionAuthButton
          type="custom"
          button-type="default"
          icon="export"
          @click="handleExport"
        >
          导出数据
        </ActionAuthButton>
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
          <h4>❌ 内置确认</h4>
          <p>删除操作内置确认弹窗，防止误操作，提高用户体验</p>
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

    <!-- 代码对比 -->
    <div class="demo-section">
      <h2>📝 代码对比</h2>
      <div class="comparison">
        <div>
          <h3>传统方式 (复杂)</h3>
          <div class="code-block">
            <pre>{{ traditionalCode }}</pre>
          </div>
        </div>
        <div>
          <h3>使用 ActionAuthButton (简洁)</h3>
          <div class="code-block">
            <pre>{{ componentCode }}</pre>
          </div>
        </div>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <a-tag color="green" style="font-size: 16px; padding: 4px 12px">
          代码减少 70%，功能更强大！🚀
        </a-tag>
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
          >delete - 删除数据 (内置确认)</a-tag
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
    </div>

    <!-- 测试数据表格 -->
    <div class="demo-section">
      <h2>📊 模拟数据表格</h2>
      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="false"
        size="middle"
      >
        <template slot="action" slot-scope="text, record">
          <ActionAuthButton type="view" :record="record" @view="handleView" />
          <ActionAuthButton type="edit" :record="record" @edit="handleEdit" />
          <ActionAuthButton
            type="delete"
            :record="record"
            @delete="handleDelete"
          />
        </template>
      </a-table>
    </div>
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
      traditionalCode: `<span v-show="hasButtonAuthority(currentPermissionId, 'view')"
      @click="handleView(record)">
  <a-icon type="eye" /> 详情
</span>
<span v-show="hasButtonAuthority(currentPermissionId, 'edit')"
      @click="handleEdit(record)">
  <a-icon type="edit" /> 编辑
</span>
<a-popconfirm v-show="hasButtonAuthority(currentPermissionId, 'delete')"
               title="确认删除?"
               @confirm="handleDelete(record)">
  <span><a-icon type="delete" /> 删除</span>
</a-popconfirm>`,
      componentCode: `<ActionAuthButton type="view" :record="record"
                    @view="handleView" />
<ActionAuthButton type="edit" :record="record"
                    @edit="handleEdit" />
<ActionAuthButton type="delete" :record="record"
                    @delete="handleDelete" />`,
      usageExample: `&lt;template&gt;
  &lt;!-- 详情按钮 --&gt;
  &lt;ActionAuthButton type="view" :record="record" @view="handleView" /&gt;

  &lt;!-- 编辑按钮 --&gt;
  &lt;ActionAuthButton type="edit" :record="record" @edit="handleEdit" /&gt;

  &lt;!-- 删除按钮（内置确认弹窗） --&gt;
  &lt;ActionAuthButton type="delete" :record="record" @delete="handleDelete" /&gt;

  &lt;!-- 新增按钮 --&gt;
  &lt;ActionAuthButton type="add" button-type="primary" @add="handleAdd"&gt;
    新增
  &lt;/ActionAuthButton&gt;
&lt;/template&gt;

&lt;script&gt;
import ActionAuthButton from '@/components/ActionAuthButton/ActionAuthButton.vue'

export default {
  components: { ActionAuthButton },
  methods: {
    handleView(record) { console.log('查看:', record) },
    handleEdit(record) { console.log('编辑:', record) },
    handleDelete(record) { console.log('删除:', record) },
    handleAdd() { console.log('新增') }
  }
}
&lt;/script&gt;`,
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
                  operation: ['view', 'edit', 'add', 'delete'],
                },
              ],
      }
      localStorage.setItem('admin.user', JSON.stringify(mockUserData))

      this.$message.success(
        `权限已切换到: ${permission === '*' ? '超级管理员' : permission}`
      )
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

    handleExport() {
      this.$message.info('导出操作')
    },
  },
}
</script>

<style scoped>
/* 这里可以添加组件特定的样式 */
</style>
