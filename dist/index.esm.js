/**
 * 判断当前路由是否有按钮权限
 * @param {string|number} currentPermissionId 当前路由需要的按钮权限
 * @param {string} buttonOperation 按钮操作类型
 * @returns {boolean}
 */
function hasButtonAuthority(currentPermissionId, buttonOperation) {
  if (currentPermissionId === '*') {
    return false;
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
      validator: (value) =>
        ['primary', 'default', 'dashed', 'danger', 'link'].includes(value),
    },
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['small', 'default', 'large'].includes(value),
    },
    icon: { type: String, default: null },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    record: {
      type: Object,
      default: () => ({}),
      validator: (value) => value !== null && typeof value === 'object',
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
    this.checkPermission();
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
      const currentPermissionId = this.$store.state.setting.currentPermissionId;
      if (!currentPermissionId || !this.currentAction) {
        this.hasPermission = false;
        return
      }
      this.hasPermission = hasButtonAuthority(
        currentPermissionId,
        this.currentAction
      );
    },
    handleClick() {
      if (!this.hasPermission) {
        this.$message.warning('暂无权限，请联系管理员');
        return
      }

      const events = {
        view: 'view',
        edit: 'edit',
        add: 'add',
        delete: 'delete',
        custom: 'click',
      };
      const eventName = events[this.type];
      const data = this.type === 'add' ? undefined : this.record;
      this.$emit(eventName, data);
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

var css_248z = ".action-btn[data-v-46507212]{align-items:center;border:1px solid transparent;border-radius:3px;color:#054898!important;cursor:pointer;display:inline-flex;justify-content:center;min-width:auto;transition:all .3s;white-space:nowrap}.action-btn .anticon[data-v-46507212]{margin-right:4px}.action-btn.disabled[data-v-46507212],.action-btn.no-permission[data-v-46507212]{color:#bfbfbf!important;cursor:not-allowed!important;opacity:.6}.action-btn.disabled[data-v-46507212]:hover,.action-btn.no-permission[data-v-46507212]:hover{background-color:transparent!important;color:#bfbfbf!important}.delete-btn[data-v-46507212]{color:#ff4d4f!important}.authority-button.no-permission[data-v-46507212]{cursor:not-allowed!important;filter:grayscale(100%);opacity:.6}";
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
    [
      _vm.isTextButton
        ? [
            _vm.type === "delete"
              ? _c(
                  "a-popconfirm",
                  {
                    attrs: {
                      title: _vm.confirmTitle,
                      disabled: !_vm.hasPermission || _vm.disabled,
                      placement: "topRight",
                    },
                    on: { confirm: _vm.handleClick },
                  },
                  [
                    !_vm.hasPermission
                      ? _c(
                          "a-tooltip",
                          { attrs: { placement: "top", mouseLeaveDelay: 0 } },
                          [
                            _c("template", { slot: "title" }, [
                              _c("span", [_vm._v("暂无权限，请联系管理员")]),
                            ]),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "action-btn delete-btn",
                                class: _vm.buttonClass,
                                on: {
                                  click: function ($event) {
                                    $event.stopPropagation();
                                  },
                                },
                              },
                              [
                                _vm.icon
                                  ? _c("a-icon", { attrs: { type: _vm.icon } })
                                  : _vm._e(),
                                _vm._v(
                                  "\n          " +
                                    _vm._s(_vm.text || _vm.textMap[_vm.type]) +
                                    "\n        "
                                ),
                              ],
                              1
                            ),
                          ],
                          2
                        )
                      : _c(
                          "span",
                          {
                            staticClass: "action-btn delete-btn",
                            class: _vm.buttonClass,
                            attrs: { disabled: _vm.disabled },
                          },
                          [
                            _vm.icon
                              ? _c("a-icon", { attrs: { type: _vm.icon } })
                              : _vm._e(),
                            _vm._v(
                              "\n        " +
                                _vm._s(_vm.text || _vm.textMap[_vm.type]) +
                                "\n      "
                            ),
                          ],
                          1
                        ),
                  ],
                  1
                )
              : [
                  !_vm.hasPermission
                    ? _c(
                        "a-tooltip",
                        { attrs: { placement: "top", mouseLeaveDelay: 0 } },
                        [
                          _c("template", { slot: "title" }, [
                            _c("span", [_vm._v("暂无权限，请联系管理员")]),
                          ]),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass: "action-btn",
                              class: _vm.buttonClass,
                              on: {
                                click: function ($event) {
                                  $event.stopPropagation();
                                },
                              },
                            },
                            [
                              _vm.icon
                                ? _c("a-icon", { attrs: { type: _vm.icon } })
                                : _vm._e(),
                              _vm._v(
                                "\n          " +
                                  _vm._s(_vm.text || _vm.textMap[_vm.type]) +
                                  "\n        "
                              ),
                            ],
                            1
                          ),
                        ],
                        2
                      )
                    : _c(
                        "span",
                        {
                          staticClass: "action-btn",
                          class: _vm.buttonClass,
                          attrs: { disabled: _vm.disabled },
                          on: { click: _vm.handleClick },
                        },
                        [
                          _vm.icon
                            ? _c("a-icon", { attrs: { type: _vm.icon } })
                            : _vm._e(),
                          _vm._v(
                            "\n        " +
                              _vm._s(_vm.text || _vm.textMap[_vm.type]) +
                              "\n      "
                          ),
                        ],
                        1
                      ),
                ],
          ]
        : [
            !_vm.hasPermission
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
                      {
                        class: { "no-permission": !_vm.hasPermission },
                        attrs: {
                          type: _vm.buttonType,
                          size: _vm.size,
                          icon: _vm.icon,
                          disabled: true,
                        },
                        on: {
                          click: function ($event) {
                            $event.stopPropagation();
                          },
                        },
                      },
                      [
                        _vm._t("default", function () {
                          return [
                            _vm._v(_vm._s(_vm.text || _vm.textMap[_vm.type])),
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
                  {
                    attrs: {
                      type: _vm.buttonType,
                      size: _vm.size,
                      icon: _vm.icon,
                      loading: _vm.loading,
                      disabled: _vm.disabled,
                    },
                    on: { click: _vm.handleClick },
                  },
                  [
                    _vm._t("default", function () {
                      return [_vm._v(_vm._s(_vm.text || _vm.textMap[_vm.type]))]
                    }),
                  ],
                  2
                ),
          ],
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-46507212";
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

export { __vue_component__ as ActionAuthButton, authorityUtils, index as default, _install as install };
