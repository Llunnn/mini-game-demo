import * as THREE from '../libs/three'
import TWEEN from '../libs/Tween'
import Loader from '../models/loader'

let loading = true;
// let model;
let particleSystem;

function createParticles(scene) { 
  loading = true;
  // const path = 'https://raw.githubusercontent.com/diegoxdc99/introtowebgl/master/assets/BoilerplateApp/Models/gooseFull.js';
  // const path = 'https://github.com/Llunnn/mini-game-demo/blob/init/models/lion-cub.js';
  // const self = this;
  // Loader.loadModel(path, (mesh) => {
  //   particleSystem = mesh;
  //   loading = false;
  //   particleSystem.position.set(0,-10,400);
  //   particleSystem.scale.set(2, 2, 2);
  //   // particleSystem.rotation.y = Math.PI * 0.5;
  //   // updateParticles(particleSystem)
  //   scene.add(particleSystem);
  // });
}

function updateParticles(particleSystem) {
  var pos = { x: 0 }; // Start at (0, 0)
  var tween = new TWEEN.Tween(pos).to({x: 2}, 2).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(onUpdate).start();
  var tweenBack = new TWEEN.Tween(pos).to({ x: 0 }, 2).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(onUpdate).start();

  tween.chain(tweenBack);
  tweenBack.chain(tween);

  var particles = particleSystem.geometry.vertices;
  const origin = particles.map(particle => ({...particle}));
  function onUpdate(){
    console.log(particles[0].z)
    particles.forEach((particle, index) => {
      particle.z = origin[index].z + pos.x;
      // particle.y += pos.y;
    });
    particleSystem.geometry.verticesNeedUpdate = true;
  }
}
export {
  createParticles,
  updateParticles
};