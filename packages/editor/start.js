/* eslint-disable max-nested-callbacks */
// https://juejin.cn/post/6974171023025389576

// eslint-disable-next-line no-undef
const inquirer = require('inquirer')
const { execaCommandSync } = require('execa')

async function run () {
  // 解析命令行参数
  const args = process.argv.slice(2)
  const isDevMode = args.includes('--dev') || args.includes('-d')
  const isBuildMode = args.includes('--build') || args.includes('-b')
  const demoPath = args.find(arg => arg.startsWith('--demo='))?.split('=')[1] || 'http://localhost:10086'
  const skipInteractive = args.includes('--yes') || args.includes('-y')

  let action = 'serve'
  let selectedDemoPath = demoPath

  // 如果指定了模式，直接使用
  if (isBuildMode) {
    action = 'build'
  }

  // 非交互式模式或指定了参数，跳过询问
  if (skipInteractive || isDevMode || isBuildMode) {
    console.log(`🚀 启动编辑器 - 模式: ${action}, Demo路径: ${selectedDemoPath}`)
  } else {
    // 交互式模式
    const answers = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'action',
        message: '选择动作-Select Action',
        default: 'serve',
        choices: ['serve', 'build']
      }
    ])
    action = answers.action

    const demoAnswers = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'demoPath',
        message: '选择demo预览地址-Select demo preview path',
        default: 'http://localhost:10086',
        choices: ['http://localhost:10086', 'https://lowcode-designable-taro-react-mobile.vercel.app']
      }
    ])
    selectedDemoPath = demoAnswers.demoPath
  }

  // 设置环境变量
  process.env.demoPath = selectedDemoPath
  process.env.TARO_ENV = 'h5'
  process.env.TARO_PLATFORM = 'web'
  process.env.EDITOR = true

  console.log(`📝 配置: 动作=${action}, Demo路径=${selectedDemoPath}`)

  const actionMap = {
    'serve': 'npm run serve',
    'build': 'npm run build'
  }

  try {
    // 执行命令
    execaCommandSync(actionMap[action], {
      stdio: 'inherit',
      cwd: process.cwd()
    })
  } catch (error) {
    console.error('❌ 执行失败:', error.message)
    process.exit(1)
  }
}

run()