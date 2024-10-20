<template>
  <view>
    <a-scene>
      <!-- 添加光源 -->
      <a-light type="ambient" color="#FFF"></a-light>
      <a-light type="directional" position="-1 1 1" intensity="0.5"></a-light>

      <!-- 创建一个房间 -->
      <a-box position="-1 0.5 -3" depth="1" height="1" width="1" color="#4CC3D2" draggable></a-box>
      <a-box position="1 0.5 -3" depth="1" height="1" width="1" color="#EF2D5E" draggable></a-box>
      <a-sphere position="0 1 -3" radius="0.5" color="#FFC65D" draggable></a-sphere>

      <!-- 添加摄像机 -->
      <a-camera position="0 1.6 0"></a-camera>

      <!-- 交互提示 -->
      <a-text value="点击并拖动物体" position="0 2 -3" align="center"></a-text>
    </a-scene>
  </view>
</template>

<script>
import 'aframe'; // 引入 A-Frame

export default {
  name: 'TestPage',
  mounted() {
    // 注册自定义拖动组件
    this.registerDraggableComponent();
  },
  methods: {
    registerDraggableComponent() {
      // 自定义拖动组件
      AFRAME.registerComponent('draggable', {
        schema: {
          isDragging: { type: 'boolean', default: false },
        },
        init: function () {
          this.el.addEventListener('mousedown', (event) => {
            this.data.isDragging = true;
          });

          this.el.addEventListener('mouseup', (event) => {
            this.data.isDragging = false;
          });

          this.el.addEventListener('mouseleave', (event) => {
            this.data.isDragging = false;
          });
        },
        tick: function () {
          if (this.data.isDragging) {
            const mousePos = this.el.sceneEl.mousePosition;
            this.el.object3D.position.x = mousePos.x;
            this.el.object3D.position.y = mousePos.y;
          }
        },
      });
    },
  },
};
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
</style>
