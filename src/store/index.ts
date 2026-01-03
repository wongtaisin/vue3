/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-26 16:36:47
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-11-30 15:46:28
 * @FilePath: \aiComputer\src\stores\index.ts
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 可持续化

export default pinia
