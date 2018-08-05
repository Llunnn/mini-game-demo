import * as THREE from '../libs/three'

const models = {};

class JSONLoader {
  constructor() {
    this.loader = new THREE.JSONLoader();
  }
  
  loadModel(path, fn) {
    let pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.01
    });
    if (false && models[path]) {
      let mesh = new THREE.ParticleSystem(geometry, pMaterial);
      fn(mesh);
    } else {
      this.loader.load(path, function (geometry) {
        let mesh = new THREE.ParticleSystem(geometry, pMaterial);
        models[path] = geometry;
        fn(mesh);
      });
    }
  }
    
}

export default new JSONLoader()