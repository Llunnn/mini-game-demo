import * as THREE from '../libs/three'
// import JSONLoader from '../models/JSONLoader';

export default class Player {
  constructor(scene) {
    this.obj = new THREE.Mesh(
      new THREE.BoxGeometry(4, 4, 4),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    )
    this.obj.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0);
    this.speed = {
      x: 0,
      y: 0
    };
  }

  isLoading() {
    return this.loading;
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
    this.obj.rotation.y += this.speed.x * 0.1;
    this.obj.rotation.x += -this.speed.y * 0.1;
  }

  setPos(...pos) {
    this.obj.position.set(...pos);
  }

  setRotation(...rotation) {
    this.obj.rotation.set(...rotation);
  }
}
