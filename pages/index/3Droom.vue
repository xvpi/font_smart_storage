<template>
  <view>
    <a-scene>
      <!-- 添加光源 -->
      <a-light type="ambient" color="#FFF"></a-light>
      <a-light type="directional" position="-1 1 1" intensity="0.5"></a-light>

      <!-- 创建一个透明的房间模型 -->
      <a-box position="0 1 -5" depth="5" height="2" width="5" color="#4CC3D2" opacity="0.5"></a-box>

      <!-- 在房间内部添加不同颜色的容器 -->
      <a-box position="-1 1 -4" depth="0.5" height="1" width="1" color="#EF2D5E" draggable></a-box>
      <a-box position="1 1 -4" depth="0.5" height="1" width="1" color="#FFC65D" draggable></a-box>
      <a-box position="0 1 -3" depth="0.5" height="1" width="1" color="#7ED321" draggable></a-box>
      <a-sphere position="2 1 -4" radius="0.25" color="#D81B60" draggable></a-sphere>
      
      <!-- 添加摄像机 -->
      <a-camera position="2 2 0"></a-camera>

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
      // 检查组件是否已经注册
      if (!AFRAME.components['draggable']) {
        // 自定义拖动组件
        AFRAME.registerComponent('draggable', {
          schema: {
            isDragging: { type: 'boolean', default: false },
            initialPosition: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
          },
          init: function () {
            this.data.initialPosition = this.el.object3D.position.clone();

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
              const mousePos = this.getMousePosition();
              this.el.object3D.position.set(mousePos.x, mousePos.y, mousePos.z);
            }
          },
          getMousePosition: function () {
            // 获取鼠标在场景中的位置
            const mousePos = new THREE.Vector3();
            const raycaster = new THREE.Raycaster();

            // 获取鼠标在屏幕上的位置
            const mouse = new THREE.Vector2();
            mouse.x = (this.el.sceneEl.mouse.x / window.innerWidth) * 2 - 1;
            mouse.y = -(this.el.sceneEl.mouse.y / window.innerHeight) * 2 + 1;

            // 创建射线
            raycaster.setFromCamera(mouse, this.el.sceneEl.camera);

            // 计算物体与射线的交点
            const intersects = raycaster.intersectObject(this.el.sceneEl.object3D, true);

            if (intersects.length > 0) {
              mousePos.copy(intersects[0].point);
            } else {
              mousePos.copy(this.data.initialPosition);
            }

            return mousePos;
          },
        });
      }
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
