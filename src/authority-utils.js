/**
 * 判断当前路由是否有按钮权限
 * @param {string|number} currentPermissionId 当前路由需要的按钮权限
 * @param {string} buttonOperation 按钮操作类型
 * @returns {boolean}
 */
function hasButtonAuthority(currentPermissionId, buttonOperation) {
  if (currentPermissionId === '*') {
    return false
  }

  // 从 localStorage 获取用户信息
  const userStr = localStorage.getItem('admin.user')
  if (!userStr) {
    return false
  }

  let user
  try {
    user = JSON.parse(userStr)
  } catch (e) {
    console.error('解析用户信息失败:', e)
    return false
  }

  if (!user || !user.permissions || !Array.isArray(user.permissions) || user.permissions.length === 0) {
    return false
  }

  const hasAuth = user.permissions.find(item => item === currentPermissionId || item.id === currentPermissionId)
  if (hasAuth && hasAuth.operation) {
    return hasAuth.operation.includes(buttonOperation)
  }

  return false
}

/**
 * 检查是否有指定权限（通用方法）
 * @param {string} permission 权限标识
 * @param {string} action 操作类型
 * @returns {boolean}
 */
function checkPermission(permission, action) {
  // 可以从 Vuex store 或其他地方获取当前权限ID
  const currentPermissionId = getCurrentPermissionId()
  return hasButtonAuthority(currentPermissionId, action)
}

/**
 * 获取当前权限ID（可根据项目实际情况调整）
 * @returns {string|number}
 */
function getCurrentPermissionId() {
  // 方法1：从 Vuex store 获取
  if (typeof window !== 'undefined' && window.Vue && window.Vue.$store) {
    return window.Vue.$store.state.setting.currentPermissionId
  }

  // 方法2：从路由参数获取
  if (typeof window !== 'undefined' && window.Vue && window.Vue.$route) {
    return window.Vue.$route.meta?.permission
  }

  // 方法3：从 localStorage 获取
  try {
    const userInfo = JSON.parse(localStorage.getItem('admin.user') || '{}')
    return userInfo.currentPermissionId || '*'
  } catch (e) {
    return '*'
  }
}

export {
  hasButtonAuthority,
  checkPermission,
  getCurrentPermissionId
}

export default {
  hasButtonAuthority,
  checkPermission,
  getCurrentPermissionId
}