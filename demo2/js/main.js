import * as THREE from './libs/three'
import TWEEN from './libs/Tween'
import CubeFactory from './cubes/CubeFactory'
import Player from './player/Player'

const ctx = canvas.getContext('webgl')
const renderer = new THREE.WebGLRenderer({ context: ctx })



/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.initScene();
    this.initPlayer();
    this.generateCube();
    this.initEvent();
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
    
  }

  initPlayer () {
    this.player = new Player();
    this.player.setPos(0, 0, 400);
    this.scene.add(this.player.obj);
  }

  initEvent() {
    this.isTouching = false;

    let startPos = {};

    wx.onTouchStart((res) => {
      var raycaster = new THREE.Raycaster(); // create once
      var mouse = new THREE.Vector2(); // create once

      mouse.x = (res.touches[0].clientX / renderer.domElement.width) * 2 - 1;
      mouse.y = - (res.touches[0].clientY / renderer.domElement.height) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);

      var intersects = raycaster.intersectObjects([this.player.obj], true);
      if (intersects.length === 1) {
        this.player.obj.material.color.setHex(Math.random() * 0xffffff);
      }

      startPos.x = res.touches[0].clientX;
      startPos.y = res.touches[0].clientY;
      this.isTouching = true;
      this.player.setSpeed({x: 0, y: 0});
    })
    wx.onTouchMove((e) => {
      let x = (e.changedTouches[0].clientX - startPos.x) * 0.005;
      let y = -(e.changedTouches[0].clientY - startPos.y) * 0.005;
      let speed = {
        x: Math.abs(x)-1 > 0 ? (x > 0 ? 1 : -1) : x,
        y: Math.abs(y)-1 > 0 ? (y > 0 ? 1 : -1) : y
      }
      this.player.setSpeed(speed);
    })
    wx.onTouchEnd((e) => {
      this.isTouching = false;
      this.player.setSpeed({
        x: 0,
        y: 0
      });
    })
  }

  generateCube() {
    let cubeCreation = true;
    function addcube(){
      let cube = CubeFactory.addCube()
      cube.receiveShadow = true;
      this.scene.add(cube.box)
      if (cubeCreation) {
        setTimeout(addcube.bind(this), 500);
      }
    }

    wx.onHide(() => { cubeCreation = false; })
    wx.onShow(() => { 
      cubeCreation = true;
      addcube.apply(this);
    });
  }

  restart() {
  }


  // 全局碰撞检测
  collisionDetection(fn) { 
    let collideMeshList = CubeFactory.getActiveCubeList().map((item)=>(item.box));
    let movingCube = this.player.obj;
    let originPoint = movingCube.position.clone();
    for (let vertexIndex = 0; vertexIndex < movingCube.geometry.vertices.length; vertexIndex++) {
        // 顶点原始坐标
        let localVertex = movingCube.geometry.vertices[vertexIndex].clone();
        // 顶点经过变换后的坐标
        let globalVertex = localVertex.applyMatrix4(movingCube.matrix);
        // 获得由中心指向顶点的向量
        let directionVector = globalVertex.sub(movingCube.position);

        // 将方向向量初始化
        let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        // 检测射线与多个物体的相交情况
        let collisionResults = ray.intersectObjects(collideMeshList);
        // 如果返回结果不为空，且交点与射线起点的距离小于物体中心至顶点的距离，则发生了碰撞
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            let crash = true;   // crash 是一个标记变量
            console.log('crash')
        }
    }
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
    CubeFactory.getActiveCubeList().forEach((cube)=>{
      let pos = cube.moveForward();
      if (pos.z > this.camera.position.z) {
        this.scene.remove(cube.box);
        CubeFactory.removeCube(cube.cubeId);
        // console.log('remove');
      }
    });
    if (this.isTouching) {
      this.player.move();
    };
  }

  // 实现游戏帧循环
  loop() {
    if (!this.player.loading) {
      this.update();
      this.collisionDetection();
      this.render();
    }
    requestAnimationFrame(this.loop.bind(this), canvas)
  }
}
