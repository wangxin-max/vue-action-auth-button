<template>
  <div>
    <!-- 文本按钮：详情、编辑、删除 -->
    <template v-if="isTextButton">
      <a-popconfirm
        v-if="type === 'delete'"
        :title="confirmTitle"
        :disabled="!hasPermission || disabled"
        @confirm="handleClick"
        placement="topRight"
      >
        <span
          class="action-btn delete-btn"
          :class="buttonClass"
          :disabled="!hasPermission || disabled"
        >
          <a-icon v-if="icon" :type="icon" />
          {{ text || textMap[type] }}
        </span>
      </a-popconfirm>
      <span v-else class="action-btn" :class="buttonClass" @click="handleClick">
        <a-icon v-if="icon" :type="icon" />
        {{ text || textMap[type] }}
      </span>
    </template>
    <a-button
      v-else
      :type="buttonType"
      :size="size"
      :icon="icon"
      :loading="loading"
      :disabled="!hasPermission || disabled"
      :class="{ 'no-permission': !hasPermission }"
      @click="handleClick"
    >
      <slot>{{ text || textMap[type] }}</slot>
    </a-button>
  </div>
</template>

<script>
import { hasButtonAuthority } from './authority-utils'

export default {
  name: 'ActionAuthButton',
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) =>
        ['view', 'edit', 'add', 'delete', 'custom'].includes(value),
    },
    text: { type: String, default: '' },
    buttonType: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'default', 'dashed', 'danger', 'link'].includes(value)
    },
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['small', 'default', 'large'].includes(value)
    },
    icon: { type: String, default: null },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    record: {
      type: Object,
      default: () => ({}),
      validator: (value) => value !== null && typeof value === 'object'
    },
    confirmTitle: { type: String, default: '您确认删除这条数据吗？' },
  },
  data() {
    return {
      hasPermission: false,
      // 预定义配置
      textMap: {
        view: '详情',
        edit: '编辑',
        add: '新增',
        delete: '删除',
        custom: '',
      },
    }
  },
  computed: {
    // 文本按钮类型：view, edit, delete
    isTextButton() {
      return ['view', 'edit', 'delete'].includes(this.type)
    },
    // 按钮样式类
    buttonClass() {
      return {
        [`${this.type}-button`]: true,
        'no-permission': !this.hasPermission,
        disabled: this.disabled,
      }
    },
    // 权限动作映射
    currentAction() {
      if (this.type === 'custom') return this.type
      return this.type
    },
  },
  mounted() {
    this.checkPermission()
  },
  watch: {
    type: { handler: 'checkPermission', immediate: true },
    // 监听权限变化
    '$store.state.setting.currentPermissionId': {
      handler: 'checkPermission',
      immediate: true,
    },
  },
  methods: {
    checkPermission() {
      const currentPermissionId = this.$store.state.setting.currentPermissionId
      if (!currentPermissionId || !this.currentAction) {
        this.hasPermission = false
        return
      }
      this.hasPermission = hasButtonAuthority(
        currentPermissionId,
        this.currentAction
      )
    },
    handleClick() {
      if (!this.hasPermission) {
        this.$message.warning('暂无权限，请联系管理员')
        return
      }

      const events = {
        view: 'view',
        edit: 'edit',
        add: 'add',
        delete: 'delete',
        custom: 'click',
      }
      const eventName = events[this.type]
      const data = this.type === 'add' ? undefined : this.record
      this.$emit(eventName, data)
    },
  },
}
</script>

<style lang="less" scoped>
.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.3s;
  white-space: nowrap;
  border: 1px solid transparent;
  min-width: auto;
  color: #054898 !important;
  .anticon {
    margin-right: 4px;
  }

  &.no-permission,
  &.disabled {
    cursor: not-allowed !important;
    color: #bfbfbf !important;
    opacity: 0.6;

    &:hover {
      background-color: transparent !important;
      color: #bfbfbf !important;
    }
  }
}
.delete-btn {
  color: #ff4d4f !important;
}

.authority-button {
  &.no-permission {
    cursor: not-allowed !important;
    opacity: 0.6;
    filter: grayscale(100%);
  }
}
</style>
