#!/bin/bash

echo "🚀 开始发布 Vue Action Auth Button..."

# 检查是否登录 npm
echo "📋 检查 npm 登录状态..."
npm whoami || {
  echo "❌ 请先登录 npm: npm login"
  exit 1
}

# 安装依赖
echo "📦 安装依赖..."
npm install

# 运行测试（如果有）
# echo "🧪 运行测试..."
# npm test

# 构建包
echo "🔨 构建包..."
npm run build

# 检查包
echo "🔍 检查包..."
npm pack --dry-run

# 发布到 npm
echo "🎯 发布到 npm..."
npm publish

echo "✅ 发布完成！"

# 显示包信息
echo "📋 包信息："
npm info vue-action-auth-button