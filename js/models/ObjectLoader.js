import * as THREE from '../libs/three'

const models = {};

class ObjectLoader {
  constructor() {
    this.loader = new THREE.ObjectLoader();
  }
  
  loadModel(path, fn) {
    this.loader.load(path,function ( obj ) {
      fn(obj);
    });
  }
}

export default new ObjectLoader();