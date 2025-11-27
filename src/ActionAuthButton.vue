<template>
  <div class="action-auth-button">
    <!-- 需要确认弹窗的按钮 -->
    <a-popconfirm
      v-if="needConfirm"
      :title="confirmTitle"
      :disabled="disabled"
      @confirm="handleConfirm"
      placement="topRight"
      ok-text="确认"
      cancel-text="取消"
    >
      <a-button
        v-if="hasPermission"
        v-bind="$attrs"
        :disabled="disabled"
        :style="style"
        :class="buttonComponentClass"
      >
        <a-icon v-if="icon" :type="icon" />
        <slot>{{ text || textMap[buttonType] || buttonType }}</slot>
      </a-button>
      <a-tooltip v-else placement="top" :mouseLeaveDelay="0">
        <template slot="title">
          <span>暂无权限，请联系管理员</span>
        </template>
        <a-button
          v-bind="$attrs"
          :disabled="disabled"
          :style="style"
          :class="buttonComponentClass"
        >
          <a-icon v-if="icon" :type="icon" />
          <slot>{{ text || textMap[buttonType] || buttonType }}</slot>
        </a-button>
      </a-tooltip>
    </a-popconfirm>

    <!-- 普通按钮 -->
    <a-tooltip v-else-if="!hasPermission" placement="top" :mouseLeaveDelay="0">
      <template slot="title">
        <span>暂无权限，请联系管理员</span>
      </template>
      <a-button
        v-bind="$attrs"
        :style="style"
        :disabled="disabled"
        :class="buttonComponentClass"
        @click="handleClick"
      >
        <a-icon v-if="icon" :type="icon" />
        <slot>{{ text || textMap[buttonType] || buttonType }}</slot>
      </a-button>
    </a-tooltip>
    <a-button
      v-else
      v-bind="$attrs"
      :style="style"
      :disabled="disabled"
      :class="buttonComponentClass"
      @click="handleClick"
    >
      <a-icon v-if="icon" :type="icon" />
      <slot>{{ text || textMap[buttonType] || buttonType }}</slot>
    </a-button>
  </div>
</template>

<script>
import { hasButtonAuthority } from './authority-utils'

export default {
  name: 'ActionAuthButton',
  props: {
    buttonType: {
      type: String,
      required: true,
      // 移除验证限制，支持任意字符串，比如 'export', 'download', 'upload' 等
    },
    text: { type: String, default: '' },
    record: {
      type: Object,
      default: () => ({}),
      validator: (value) => value !== null && typeof value === 'object',
    },
    icon: { type: String, default: null },
    confirmTitle: { type: String, default: '您确认执行此操作吗？' },
    confirmCallback: {
      type: Function,
      default: null,
      validator: (value) => {
        // 如果为 null 或 undefined，是有效的
        if (value === null || value === undefined) {
          return true
        }

        // 如果不是函数，无效
        if (typeof value !== 'function') {
          console.warn('ActionAuthButton: confirmCallback 必须是函数类型')
          console.warn('正确用法: :confirmCallback="() => onDelete(record.id)"')
          console.warn(
            '错误用法: :confirmCallback="onDelete(record.id)" (会立即执行)'
          )
          return false
        }

        return true
      },
    },
    buttonStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      hasPermission: true, // 默认有权限，避免闪烁
      checkingPermission: false, // 权限检查状态
      // 预定义配置 - 支持内置类型和自定义类型
      textMap: {
        view: '详情',
        edit: '编辑',
        add: '新增',
        delete: '删除',
        custom: '',
        action: '操作',
        // 常见的自定义类型
        export: '导出',
        download: '下载',
        upload: '上传',
        import: '导入',
        copy: '复制',
        print: '打印',
        refresh: '刷新',
        reset: '重置',
        submit: '提交',
        cancel: '取消',
        approve: '审批',
        reject: '拒绝',
        publish: '发布',
        archive: '归档',
        restore: '还原',
      },
    }
  },
  computed: {
    // 按钮默认样式
    style() {
      if (this.buttonType === 'delete' && !this.disabled) {
        return { color: '#d00c22', ...this.buttonStyle }
      }
      return { ...this.buttonStyle }
    },
    // 是否禁用
    disabled() {
      return (
        this.$attrs.disabled || this.checkingPermission || !this.hasPermission
      )
    },
    // 权限动作映射
    currentAction() {
      return this.buttonType
    },
    // 是否需要确认弹窗
    needConfirm() {
      return this.confirmCallback !== null
    },
    // 按钮组件样式类 - 简化处理
    buttonComponentClass() {
      const classes = {}

      // 只为 a-button 添加无权限样式
      classes['no-permission'] = !this.hasPermission

      return classes
    },
  },
  mounted() {
    this.checkPermission()
    this.validateCallbackUsage()
  },
  watch: {
    buttonType: { handler: 'checkPermission', immediate: true },
    // 监听权限变化
    '$store.state.setting.currentPermissionId': {
      handler: 'checkPermission',
      immediate: true,
    },
  },
  methods: {
    checkPermission() {
      this.checkingPermission = true
      const currentPermissionId = this.$store.state.setting.currentPermissionId
      if (!currentPermissionId || !this.currentAction) {
        this.hasPermission = false
        this.checkingPermission = false
        return
      }
      this.hasPermission = hasButtonAuthority(
        currentPermissionId,
        this.currentAction
      )
      this.checkingPermission = false
    },

    // 验证回调函数的使用方式
    validateCallbackUsage() {
      if (process.env.NODE_ENV === 'development' && this.confirmCallback) {
        // 检查回调函数的名称和长度，尝试检测常见错误
        const callbackStr = this.confirmCallback.toString()

        // 如果函数很短且看起来像是直接调用（这个检测不是很精确，仅供参考）
        if (callbackStr.length < 50 && !callbackStr.includes('=>')) {
          console.warn('⚠️  ActionAuthButton 使用提示：')
          console.warn(
            '如果您看到这个警告，请检查 confirmCallback 的使用方式：'
          )
          console.warn('')
          console.warn('✅ 正确用法：')
          console.warn('  :confirmCallback="() => onDelete(record.id)"')
          console.warn('  :confirmCallback="handleDeleteConfirm"')
          console.warn('')
          console.warn('❌ 可能的错误用法：')
          console.warn('  :confirmCallback="onDelete(record.id)"')
          console.warn('  （这会在组件加载时立即执行函数）')
          console.warn('')
          console.warn(
            '📚 更多信息请查看文档：https://github.com/yourusername/vue-action-auth-button'
          )
        }
      }
    },

    // 处理确认按钮点击事件
    handleConfirm() {
      // 如果有确认回调函数，执行回调函数
      if (this.confirmCallback && typeof this.confirmCallback === 'function') {
        const confirmResult = this.confirmCallback({
          type: this.buttonType,
          record: this.record,
        })

        // 如果回调函数返回 Promise，等待 Promise 完成
        if (confirmResult && typeof confirmResult.then === 'function') {
          confirmResult
            .then(() => {
              // 回调成功后，触发原始点击事件
              this.handleClick()
            })
            .catch((error) => {
              // 回调失败时，记录错误但不阻止弹窗关闭
              console.warn('确认回调执行失败:', error)
            })
        } else if (confirmResult !== false) {
          // 如果回调函数返回 false，则不继续执行后续逻辑
          this.handleClick()
        }
      } else {
        // 没有回调函数时，直接触发点击事件
        this.handleClick()
      }
    },

    // 处理按钮点击事件
    handleClick() {
      // 统一触发 click 事件，传递完整的上下文信息
      const eventData = {
        type: this.buttonType,
        record: this.buttonType === 'add' ? undefined : this.record,
        originalEvent: 'click',
      }
      this.$emit('click', eventData)
    },
  },
}
</script>

<style lang="less" scoped>
/* 所有按钮都使用 a-button 组件，样式由 Ant Design 自动处理 */
.action-auth-button {
  .ant-btn-link {
    padding: 0 !important;
  }
}
</style>
