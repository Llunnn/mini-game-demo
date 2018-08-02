import * as THREE from '../libs/three'
import Loader from '../models/loader';

export default class Player {
  constructor(scene) {
    // this.obj = new THREE.Mesh(
    //   new THREE.BoxGeometry(8, 8, 8),
    //   new THREE.MeshPhongMaterial({ color: 0xffffff })
    // )
    this.loading = true;
    console.log(Loader.loadModel)
    // const path = 'https://raw.githubusercontent.com/diegoxdc99/introtowebgl/master/assets/BoilerplateApp/Models/gooseFull.js';
    const path = 'https://raw.githubusercontent.com/Llunnn/mini-game-demo/init/models/lion-cub.js';
    Loader.loadModel(path, (mesh) => {
      this.obj = mesh;
      this.loading = false;
      console.log('loaded')
      this.obj.position.set(0,0,400);
      this.obj.scale.set(12, 12, 12);
      this.addToScene(scene)
    });
    // this.obj.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0);
    this.speed = {
      x: 0,
      y: 0
    };
  }

  isLoading() {
    return this.loading;
  }
  addToScene(scene) {
    scene.add(this.obj);
  }
  move() {
    this.obj.position.x += this.speed.x;
    this.obj.position.y += this.speed.y;
    if (Math.abs(this.obj.position.x) - 32 > 0)  {
      this.obj.position.x = this.obj.position.x > 0 ? 32 : -32;
    }
    if (Math.abs(this.obj.position.y) - 16 > 0) {
      this.obj.position.y = this.obj.position.y > 0 ? 16 : -16;
    }
  }

  setSpeed(speed) {
    this.speed = speed;
    this.obj.rotation.y = this.speed.x * 0.5;
    this.obj.rotation.x = -this.speed.y * 0.5;
  }

  setPos(...pos) {
    this.obj.position.set(...pos);
  }

  setRotation(...rotation) {
    this.obj.rotation.set(...rotation);
  }
}
