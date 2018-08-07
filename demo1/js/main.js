import * as THREE from './libs/three'
import TWEEN from './libs/Tween'
import { createParticles, updateParticles } from './particles/CpuParticle'

const ctx = canvas.getContext('webgl')
const renderer = new THREE.WebGLRenderer({ context: ctx })



/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.initScene();
    this.loop();
  }

  initScene() {
    this.scene = new THREE.Scene()

    // light
    this.pointLight = new THREE.PointLight(0xffffff, 2, 1000);
    this.pointLight.position.set(0, 0, 500);
    this.scene.add(this.pointLight);
    
    // camera
    this.camera = new THREE.PerspectiveCamera(25, canvas.width / canvas.height, 1, 1001);
    this.camera.position.set(0, 0, 500);
    this.camera.lookAt(new THREE.Vector3(0, 0, -100));
    this.scene.add(this.camera);

    // particle
    createParticles(this.scene);
    // this.particles.position.z = -400;
    // this.scene.add(this.particles);
    
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    renderer.setClearColor('#000122');
    renderer.render(this.scene, this.camera);
  }

  // 游戏逻辑更新主函数
  update() {
    // if (this.particles) this.particles.rotation.z += 0.01;
    TWEEN.update();
  }

  // 实现游戏帧循环
  loop() {
    this.update();
    this.render();
    requestAnimationFrame(this.loop.bind(this), canvas);
  }
}
