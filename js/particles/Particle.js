import * as THREE from '../libs/three'
import TWEEN from '../libs/Tween'

function createParticles() { 
  let particleCount = 600;
  
  let particles = new THREE.Geometry();
  particles.verticesNeedUpdate = true;

  let pMaterial = new THREE.PointsMaterial({ 
    color: 0xFFFFFF, 
    size: 5
  });
  // 依次创建单个粒子 
  for (let p = 0; p < particleCount; p++) {
    let pX = (Math.random() * 1000 + Math.random() * 1000 - 1000) * 0.5;
    let pY = (Math.random() * 1000 + Math.random() * 1000 - 1000) * 0.5;
    let pZ = -500; 
    let particle = new THREE.Vector3(pX, pY, pZ);
    // console.log(particle)
    // 将粒子加入粒子geometry 
    particles.vertices.push(particle); 
  }
  // 创建粒子系统 
  let particleSystem = new THREE.Points(particles, pMaterial); 
  updataParticles(particleSystem)

  return particleSystem;
}

function updataParticles(particleSystem) {
  var coords = { z: -500 }; // Start at (0, 0)
  var tween = new TWEEN.Tween(coords).to({z: -400}, 5).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(onUpdate).start();
  var tweenBack = new TWEEN.Tween(coords).to({z: -500}, 5).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(onUpdate).start();

  tween.chain(tweenBack);
  tweenBack.chain(tween);

  var particles = particleSystem.geometry.vertices;
  function onUpdate(){
      for(var i = 0; i < particles.length; i++) {
          particles[i].x = (particles[i].x + 501) % 1000 - 500;
      }
      particleSystem.geometry.verticesNeedUpdate = true;
  }
}
export {
  createParticles,
  updataParticles
};