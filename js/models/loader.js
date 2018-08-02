import * as THREE from '../libs/three'

const models = {};

class Loader {
  constructor() {
    this.loader = new THREE.ObjectLoader();
  }
  
  loadModel(path, fn) {
    let pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 4
    });
    if (models[path]) {
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

export default new Loader();