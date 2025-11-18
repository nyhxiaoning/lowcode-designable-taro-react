#!/usr/bin/env node

/**
 * 本地快速启动脚本
 * 用于快速启动拖拽编辑器开发环境
 */

const { execaCommandSync } = require('execa')
const path = require('path')

console.log('🚀 启动 Designable 拖拽编辑器...')

// 设置必要的环境变量
process.env.TARO_ENV = 'h5'
process.env.TARO_PLATFORM = 'web' 
process.env.EDITOR = true
process.env.demoPath = 'http://localhost:10086'

// 设置 Node 环境\process.env.NODE_ENV = process.env.NODE_ENV || 'development'

console.log('📋 配置信息:')
console.log('  - 运行环境:', process.env.NODE_ENV)
console.log('  - Taro环境:', process.env.TARO_ENV)
console.log('  - Demo路径:', process.env.demoPath)
console.log('')

try {
  // 执行开发服务器
  execaCommandSync('npm run serve', {
    stdio: 'inherit',
    cwd: __dirname
  })
} catch (error) {
  console.error('❌ 启动失败:', error.message)
  console.log('')
  console.log('💡 请确保已安装依赖:')
  console.log('  npm install')
  console.log('')
  process.exit(1)
}