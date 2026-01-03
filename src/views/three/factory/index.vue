<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-04-03 16:07:50
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:53:18
 * @FilePath: \vue3\src\views\three\factory\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <!-- 用一个 div 来作为 Three.js 的挂载容器 -->
  <div ref="canvasContainer" class="canvas-container" />
</template>

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasContainer = ref(null)
let renderer, scene, camera, controls, animationId

onMounted(() => {
  // 初始化场景
  scene = new THREE.Scene()

  // 初始化相机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 10, 20)

  // 初始化渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  canvasContainer.value.appendChild(renderer.domElement)

  // 轨道控制
  controls = new OrbitControls(camera, renderer.domElement)

  // 添加地面
  const groundGeometry = new THREE.PlaneGeometry(50, 50)
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)

  // 工厂主体
  const factoryGeometry = new THREE.BoxGeometry(10, 5, 6)
  const factoryMaterial = new THREE.MeshStandardMaterial({ color: 0x5555ff })
  const factory = new THREE.Mesh(factoryGeometry, factoryMaterial)
  factory.position.set(0, 2.5, 0)
  scene.add(factory)

  // 烟囱
  const chimneyGeometry = new THREE.CylinderGeometry(1, 1, 6, 32)
  const chimneyMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 })
  const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial)
  chimney.position.set(3, 6, -2)
  scene.add(chimney)

  // 小房子
  const smallHouseGeometry = new THREE.BoxGeometry(4, 3, 4)
  const smallHouseMaterial = new THREE.MeshStandardMaterial({ color: 0xff5555 })
  const smallHouse = new THREE.Mesh(smallHouseGeometry, smallHouseMaterial)
  smallHouse.position.set(-8, 1.5, 3)
  scene.add(smallHouse)

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 10, 7)
  scene.add(directionalLight)

  // 动画循环
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // 监听窗口大小变化
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  // 清理工作：移除监听器和取消动画
  window.removeEventListener('resize', onWindowResize)
  cancelAnimationFrame(animationId)
  renderer.dispose()
})

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: calc(100vh - 125px);
  overflow: hidden;
}
</style>
