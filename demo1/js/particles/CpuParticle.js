import * as THREE from '../libs/three'
import TWEEN from '../libs/Tween'
import ObjectLoader from '../models/ObjectLoader'

const loader = new THREE.ObjectLoader();

let loading = 0;
// let model;
let particleSystemDuck;
let particleSystem;
let verticesTo;
let verticesFrom;
let geometry;
let geometry2;

function createParticles(scene) { 
  const path1 = 'https://raw.githubusercontent.com/Llunnn/mini-game-demo/master/models/pikachu-pokemon-go.json';
  const path2 = 'https://raw.githubusercontent.com/Llunnn/mini-game-demo/master/models/moltres-pokemon-go.json';
  const self = this;
  loader.load(path1, function ( obj ) {
    let pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.8
    });
    obj.children[0].children.forEach((item) => {
      if (!geometry) {
        geometry = item.geometry;
      } else {
        geometry.merge(item.geometry);
      }
    });
    let particleSystem = new THREE.Points(geometry, pMaterial);

    particleSystem.position.set(0, -12, 400);
    particleSystem.scale.set(0.6, 0.6, 0.6);
    particleSystem.rotation.set(Math.PI * 1.75, 0, 0);
    console.log(particleSystem);

    verticesFrom = JSON.parse(JSON.stringify(particleSystem.geometry.vertices));
    
    updateParticles(particleSystem);
    scene.add(particleSystem);
    loading++;
  });

  loader.load(path2,function ( obj ) {
    obj.children[0].children.forEach((item) => {
      if (!geometry2) {
        geometry2 = item.geometry;
      } else {
        geometry2.merge(item.geometry);
      }
    });
    verticesTo = JSON.parse(JSON.stringify(geometry2.vertices));
    loading++;
  })
}

function updateParticles(particleSystem) {
  var trans = { phase: -500, color: 0xaabbff };
  var tween = new TWEEN.Tween(trans).to({phase: 1500, color: 0xffeecc}, 4).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(onUpdate).start();
  var tweenBack = new TWEEN.Tween(trans).to({phase: -500, color: 0xaabbff}, 4).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(onUpdate);

  tweenBack.chain(tween);
  tween.chain(tweenBack);

  function onUpdate(){
    const vertices = particleSystem.geometry.vertices;
    if (loading < 2) return;
    if (trans.phase <=  1000 && trans.phase >= 0) {
      vertices.forEach((particle, index) => {
        if (index < verticesTo.length) {
          particle.x = ((verticesTo[index].x - verticesFrom[index].x) * trans.phase / 1000.0 + verticesFrom[index].x);
          particle.y = ((verticesTo[index].y - verticesFrom[index].y) * trans.phase / 1000.0 + verticesFrom[index].y);
          particle.z = ((verticesTo[index].z - verticesFrom[index].z) * trans.phase / 1000.0 + verticesFrom[index].z);
        }
      });
    }
    
    particleSystem.geometry.verticesNeedUpdate = true;
  }
}
export {
  createParticles,
  updateParticles
};