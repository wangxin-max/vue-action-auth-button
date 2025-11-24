declare namespace _default {
    export { hasButtonAuthority };
    export { checkPermission };
    export { getCurrentPermissionId };
}
export default _default;
/**
 * 判断当前路由是否有按钮权限
 * @param {string|number} currentPermissionId 当前路由需要的按钮权限
 * @param {string} buttonOperation 按钮操作类型
 * @returns {boolean}
 */
export function hasButtonAuthority(currentPermissionId: string | number, buttonOperation: string): boolean;
/**
 * 检查是否有指定权限（通用方法）
 * @param {string} permission 权限标识
 * @param {string} action 操作类型
 * @returns {boolean}
 */
export function checkPermission(permission: string, action: string): boolean;
/**
 * 获取当前权限ID（可根据项目实际情况调整）
 * @returns {string|number}
 */
export function getCurrentPermissionId(): string | number;
