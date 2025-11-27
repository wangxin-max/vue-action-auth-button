'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 判断当前路由是否有按钮权限
 * @param {string|number} currentPermissionId 当前路由需要的按钮权限
 * @param {string} buttonOperation 按钮操作类型
 * @returns {boolean}
 */
function hasButtonAuthority(currentPermissionId, buttonOperation) {
  if (currentPermissionId === '*') {
    return true; // 超级管理员拥有所有权限
  }

  // 从 localStorage 获取用户信息
  var userStr = localStorage.getItem('admin.user');
  if (!userStr) {
    return false;
  }
  var user;
  try {
    user = JSON.parse(userStr);
  } catch (e) {
    console.error('解析用户信息失败:', e);
    return false;
  }
  if (!user || !user.permissions || !Array.isArray(user.permissions) || user.permissions.length === 0) {
    return false;
  }
  var hasAuth = user.permissions.find(function (item) {
    return item === currentPermissionId || item.id === currentPermissionId;
  });
  if (hasAuth && hasAuth.operation) {
    return hasAuth.operation.includes(buttonOperation);
  }
  return false;
}

/**
 * 检查是否有指定权限（通用方法）
 * @param {string} permission 权限标识
 * @param {string} action 操作类型
 * @returns {boolean}
 */
function checkPermission(permission, action) {
  // 可以从 Vuex store 或其他地方获取当前权限ID
  var currentPermissionId = getCurrentPermissionId();
  return hasButtonAuthority(currentPermissionId, action);
}

/**
 * 获取当前权限ID（可根据项目实际情况调整）
 * @returns {string|number}
 */
function getCurrentPermissionId() {
  // 方法1：从 Vuex store 获取
  if (typeof window !== 'undefined' && window.Vue && window.Vue.$store) {
    return window.Vue.$store.state.setting.currentPermissionId;
  }

  // 方法2：从路由参数获取
  if (typeof window !== 'undefined' && window.Vue && window.Vue.$route) {
    var _window$Vue$$route$me;
    return (_window$Vue$$route$me = window.Vue.$route.meta) === null || _window$Vue$$route$me === void 0 ? void 0 : _window$Vue$$route$me.permission;
  }

  // 方法3：从 localStorage 获取
  try {
    var userInfo = JSON.parse(localStorage.getItem('admin.user') || '{}');
    return userInfo.currentPermissionId || '*';
  } catch (e) {
    return '*';
  }
}
var authorityUtils = {
  hasButtonAuthority: hasButtonAuthority,
  checkPermission: checkPermission,
  getCurrentPermissionId: getCurrentPermissionId
};

//

var script = {
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
          console.warn('ActionAuthButton: confirmCallback 必须是函数类型');
          console.warn('正确用法: :confirmCallback="() => onDelete(record.id)"');
          console.warn(
            '错误用法: :confirmCallback="onDelete(record.id)" (会立即执行)'
          );
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
      const classes = {};

      // 只为 a-button 添加无权限样式
      classes['no-permission'] = !this.hasPermission;

      return classes
    },
  },
  mounted() {
    this.checkPermission();
    this.validateCallbackUsage();
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
      this.checkingPermission = true;
      const currentPermissionId = this.$store.state.setting.currentPermissionId;
      if (!currentPermissionId || !this.currentAction) {
        this.hasPermission = false;
        this.checkingPermission = false;
        return
      }
      this.hasPermission = hasButtonAuthority(
        currentPermissionId,
        this.currentAction
      );
      this.checkingPermission = false;
    },

    // 验证回调函数的使用方式
    validateCallbackUsage() {
      if (process.env.NODE_ENV === 'development' && this.confirmCallback) {
        // 检查回调函数的名称和长度，尝试检测常见错误
        const callbackStr = this.confirmCallback.toString();

        // 如果函数很短且看起来像是直接调用（这个检测不是很精确，仅供参考）
        if (callbackStr.length < 50 && !callbackStr.includes('=>')) {
          console.warn('⚠️  ActionAuthButton 使用提示：');
          console.warn(
            '如果您看到这个警告，请检查 confirmCallback 的使用方式：'
          );
          console.warn('');
          console.warn('✅ 正确用法：');
          console.warn('  :confirmCallback="() => onDelete(record.id)"');
          console.warn('  :confirmCallback="handleDeleteConfirm"');
          console.warn('');
          console.warn('❌ 可能的错误用法：');
          console.warn('  :confirmCallback="onDelete(record.id)"');
          console.warn('  （这会在组件加载时立即执行函数）');
          console.warn('');
          console.warn(
            '📚 更多信息请查看文档：https://github.com/yourusername/vue-action-auth-button'
          );
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
        });

        // 如果回调函数返回 Promise，等待 Promise 完成
        if (confirmResult && typeof confirmResult.then === 'function') {
          confirmResult
            .then(() => {
              // 回调成功后，触发原始点击事件
              this.handleClick();
            })
            .catch((error) => {
              // 回调失败时，记录错误但不阻止弹窗关闭
              console.warn('确认回调执行失败:', error);
            });
        } else if (confirmResult !== false) {
          // 如果回调函数返回 false，则不继续执行后续逻辑
          this.handleClick();
        }
      } else {
        // 没有回调函数时，直接触发点击事件
        this.handleClick();
      }
    },

    // 处理按钮点击事件
    handleClick() {
      // 统一触发 click 事件，传递完整的上下文信息
      const eventData = {
        type: this.buttonType,
        record: this.buttonType === 'add' ? undefined : this.record,
        originalEvent: 'click',
      };
      this.$emit('click', eventData);
    },
  },
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".action-auth-button .ant-btn-link[data-v-798a4770]{padding:0!important}";
styleInject(css_248z);

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "action-auth-button" },
    [
      _vm.needConfirm
        ? _c(
            "a-popconfirm",
            {
              attrs: {
                title: _vm.confirmTitle,
                disabled: _vm.disabled,
                placement: "topRight",
                "ok-text": "确认",
                "cancel-text": "取消",
              },
              on: { confirm: _vm.handleConfirm },
            },
            [
              _vm.hasPermission
                ? _c(
                    "a-button",
                    _vm._b(
                      {
                        class: _vm.buttonComponentClass,
                        style: _vm.style,
                        attrs: { disabled: _vm.disabled },
                      },
                      "a-button",
                      _vm.$attrs,
                      false
                    ),
                    [
                      _vm.icon
                        ? _c("a-icon", { attrs: { type: _vm.icon } })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._t("default", function () {
                        return [
                          _vm._v(
                            _vm._s(
                              _vm.text ||
                                _vm.textMap[_vm.buttonType] ||
                                _vm.buttonType
                            )
                          ),
                        ]
                      }),
                    ],
                    2
                  )
                : _c(
                    "a-tooltip",
                    { attrs: { placement: "top", mouseLeaveDelay: 0 } },
                    [
                      _c("template", { slot: "title" }, [
                        _c("span", [_vm._v("暂无权限，请联系管理员")]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "a-button",
                        _vm._b(
                          {
                            class: _vm.buttonComponentClass,
                            style: _vm.style,
                            attrs: { disabled: _vm.disabled },
                          },
                          "a-button",
                          _vm.$attrs,
                          false
                        ),
                        [
                          _vm.icon
                            ? _c("a-icon", { attrs: { type: _vm.icon } })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._t("default", function () {
                            return [
                              _vm._v(
                                _vm._s(
                                  _vm.text ||
                                    _vm.textMap[_vm.buttonType] ||
                                    _vm.buttonType
                                )
                              ),
                            ]
                          }),
                        ],
                        2
                      ),
                    ],
                    2
                  ),
            ],
            1
          )
        : !_vm.hasPermission
        ? _c(
            "a-tooltip",
            { attrs: { placement: "top", mouseLeaveDelay: 0 } },
            [
              _c("template", { slot: "title" }, [
                _c("span", [_vm._v("暂无权限，请联系管理员")]),
              ]),
              _vm._v(" "),
              _c(
                "a-button",
                _vm._b(
                  {
                    class: _vm.buttonComponentClass,
                    style: _vm.style,
                    attrs: { disabled: _vm.disabled },
                    on: { click: _vm.handleClick },
                  },
                  "a-button",
                  _vm.$attrs,
                  false
                ),
                [
                  _vm.icon
                    ? _c("a-icon", { attrs: { type: _vm.icon } })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._t("default", function () {
                    return [
                      _vm._v(
                        _vm._s(
                          _vm.text ||
                            _vm.textMap[_vm.buttonType] ||
                            _vm.buttonType
                        )
                      ),
                    ]
                  }),
                ],
                2
              ),
            ],
            2
          )
        : _c(
            "a-button",
            _vm._b(
              {
                class: _vm.buttonComponentClass,
                style: _vm.style,
                attrs: { disabled: _vm.disabled },
                on: { click: _vm.handleClick },
              },
              "a-button",
              _vm.$attrs,
              false
            ),
            [
              _vm.icon ? _c("a-icon", { attrs: { type: _vm.icon } }) : _vm._e(),
              _vm._v(" "),
              _vm._t("default", function () {
                return [
                  _vm._v(
                    _vm._s(
                      _vm.text || _vm.textMap[_vm.buttonType] || _vm.buttonType
                    )
                  ),
                ]
              }),
            ],
            2
          ),
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-798a4770";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

// Vue 插件安装方法
__vue_component__.install = function (Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
};

// 全局安装方法
var _install = function install(Vue) {
  if (_install.installed) return;
  _install.installed = true;
  Vue.component('ActionAuthButton', __vue_component__);
};

// 自动安装（在浏览器环境中）
if (typeof window !== 'undefined' && window.Vue) {
  _install(window.Vue);
}

// 默认导出
var index = {
  ActionAuthButton: __vue_component__,
  authorityUtils: authorityUtils,
  install: _install
};

// UMD 格式支持
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ActionAuthButton: __vue_component__,
    authorityUtils: authorityUtils,
    install: _install
  };
}

exports.ActionAuthButton = __vue_component__;
exports.authorityUtils = authorityUtils;
exports["default"] = index;
exports.install = _install;
