/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-13 08:05:37
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:36:06
 * @FilePath: \vue3\src\types\vite-env.d.ts
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
/// <reference types="vite/client" />

// 通用声明：允许所有 @/ 路径下的 TypeScript 文件自动解析
declare module '@/api/*'
declare module '@/store/*'
declare module '@/utils/*'
declare module '@/components/*'
declare module '@/views/*'
declare module '@/router/*'
declare module '@/directive/*'
declare module '@/assets/*'
