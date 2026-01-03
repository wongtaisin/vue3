/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-13 08:04:56
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:28:13
 * @FilePath: \vue3\vite.config.ts
 * @Description: Vite 配置文件
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import path, { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

const isProd = process.env.NODE_ENV === 'production'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'], // 自动导入vue相关函数，如：ref，reactive，toRef等

      // 📜 自动生成类型声明
      dts: path.resolve(pathSrc, 'types/auto-imports.d.ts'),

      // 自动导入自己的组合函数（可选）
      dirs: ['src/composables'], // 会自动导入该目录下所有 export 的函数

      // 支持 Vue 模板中使用（非 <script setup> 场景）
      vueTemplate: true,

      // ESLint 支持（解决 no-undef）
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }, //eslint 报 no-undef 错误，添加此项会生成.eslintrc-auto-import.json 文件

      resolvers: [
        ElementPlusResolver() // 配置Element-plus自动按需导入
        // 自动引入图标组件
        // IconsResolver({
        //   prefix: 'Icon'
        // })
      ]
    }),
    Components({
      // 📂 扫描目录
      dirs: ['src/components'], // 自动注册 components 目录下的组件

      // 🔌 支持的文件扩展名
      extensions: ['vue', 'tsx'], // 自动注册 vue, tsx 文件

      // 🔍 是否深度扫描子目录
      deep: true, // 深度搜索组件目录，包括子目录

      // 📜 自动生成全局组件类型声明
      dts: path.resolve(pathSrc, 'types/auto-components.d.ts'),
      // dtsTsx: true, // 自动生成 tsx 类型声明文件（如果使用 TSX）

      // 🧬 命名空间：启用目录作为前缀
      directoryAsNamespace: true, // 允许子目录作为组件的命名空间前缀，如：<CommonHeader />
      collapseSamePrefixes: true, // 合并文件夹和组件的相同前缀（区分驼峰式命名空间）；以防止命名空间组件名称中出现重复；避免 User/UserCard → UserUserCard，会合并为 UserCard

      // 🌐 全局命名空间（可选）：允许 <Common/Button /> 写法
      globalNamespaces: ['Common'], // 可以在任何组件中直接使用 Common/组件名 来引用, 如：<Common/Button /> ；如不需要路径式写法，可设为 []

      // 🪝 自动导入指令（默认扫描 src/directives）
      directives: true,
      // directiveDirs: ['src/directives'], // 如需自定义路径可取消注释

      // 🎯 控制“在哪些文件中自动注入 import”
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        /\.[jt]sx?$/ // 支持 .ts, .tsx, .js, .jsx
      ],

      // 🚫 排除不需要处理的目录
      exclude: [
        /[\\/]node_modules[\\/]/, // 排除 node_modules 目录
        /[\\/]src\/components\/code\/compute\.vue$/ // 排除 code/compute.vue 文件
      ],

      // 🛡️ 安全选项：
      allowOverrides: false, // 禁止同名组件覆盖
      importPathTransform: v => v, // 🔄 导入路径转换（一般无需修改）

      // Vue 版本（可省略，自动检测）
      version: 3,

      // 从 ElementPlus 导入组件
      resolvers: [
        ElementPlusResolver() // 配置Element-plus自动按需导入
      ]
    }),
    Icons({ autoInstall: true })
  ],
  base: isProd ? '/app' : '/', // 打包路径，根据实际环境来
  css: {
    preprocessorOptions: {
      // CSS 预处理器配置
      scss: {
        // 设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin，element-plus的命名空间）
        additionalData: `@use "@/assets/css/mixin.scss" as *;`
      }
    },
    modules: {
      // 生成的类名格式
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      // 是否启用 camelCase 转换
      localsConvention: 'camelCase' // 驼峰命名
    }
  },

  assetsInclude: [resolve(__dirname, './src/assets'), '**/*.json'], // 静态资源处理

  // 路径解析配置
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'], // 导入时可以省略的扩展名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // src 路径别名
      assets: resolve(__dirname, 'assets'), // 资源路径别名
      build: path.resolve(__dirname, 'build') // 构建路径别名
    }
  },
  server: {
    host: true, // 监听所有地址
    port: 8001, // 开发服务器端口
    open: true, // 自动打开浏览器
    cors: false, // 禁用 CORS
    origin: '/', // 配置本地查看图片 iconfont 的路径需要
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  // 构建配置
  build: {
    target: 'modules', // 浏览器兼容目标 'es2015'
    outDir: 'dist', // 输出目录
    assetsDir: 'assets', // 静态资源目录
    sourcemap: false, // 不生成 source map
    minify: 'esbuild', // 使用 esbuild 压缩
    chunkSizeWarningLimit: 1000, // 文件大小警告阈值(kb)
    cssTarget: 'chrome61', // 兼容 Android WebView
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
      }
    }
  },
  esbuild: {
    drop: isProd ? ['console', 'debugger'] : []
  }
})
