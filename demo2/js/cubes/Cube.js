import * as THREE from '../libs/three'

export default class Cube {
  constructor(id) {
    const self = this;
    this.box = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    )
    this.cubeId = id;
    this.active = false;
    this.speed = 1;
  }

  moveForward() {
    this.box.position.z += this.speed;
    return this.box.position;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setPos(...pos) {
    this.box.position.set(...pos);
  }

  setScale(...scale) {
    this.box.scale.set(...scale);
  }

  setRotation(...rotation) {
    this.box.rotation.set(...rotation);
  }

  setColor(color) {
    this.box.material.color.setHex(color);
  }
}
