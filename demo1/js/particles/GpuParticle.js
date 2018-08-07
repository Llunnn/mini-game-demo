import * as THREE from '../libs/three'
import TWEEN from '../libs/Tween'
import ObjectLoader from '../models/ObjectLoader'

import vs from '../shaders/verticeShader';
import fs from '../shaders/fragmentShader';

let loading = 0;
let particleSystem;
let geometry1;
let geometry2;
let verticesTo;
let verticesFrom;
let obj1;
let obj2;

const loader = new THREE.ObjectLoader();

function createParticles(scene) {
  const path1 = 'https://raw.githubusercontent.com/Llunnn/mini-game-demo/master/models/pikachu-pokemon-go.json';
  const path2 = 'https://raw.githubusercontent.com/Llunnn/mini-game-demo/master/models/moltres-pokemon-go.json';

  let loadFrom = new Promise( function(resolve) {
    loader.load(path1, (obj) => {
      let pMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1
      });
      obj.children[0].children.forEach((item) => {
        if (!geometry1) {
          geometry1 = item.geometry;
        } else {
          geometry1.merge(item.geometry);
        }
      });
      obj1 = new THREE.BufferGeometry().fromGeometry(geometry1);

      verticesFrom = obj1.attributes.position.array;
      resolve();
    });
  });

  let loadTo = new Promise( function(resolve) {
    loader.load(path2, (obj) => {
      obj.children[0].children.forEach((item) => {
        if (!geometry2) {
          geometry2 = item.geometry;
        } else {
          geometry2.merge(item.geometry);
        }
      });
      
      // geometry2.merge(geometry2);
      obj2 = new THREE.BufferGeometry().fromGeometry(geometry2);
      verticesTo = obj2.attributes.position.array;
      resolve();
    })
  })
  
  Promise.all([loadFrom, loadTo])
    .then(function() {
      obj1.addAttribute('verticesTo', new THREE.BufferAttribute(verticesTo, 3));
      var uniforms = {
        val: {value: 1.0}
      };
      var shaderMaterial = new THREE.ShaderMaterial({
        uniforms:     uniforms,
        vertexShader:   vs,
        fragmentShader: fs,
        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true
      });
      particleSystem = new THREE.Points(obj1, shaderMaterial);
      particleSystem.position.set(0, -12, 400);
      particleSystem.scale.set(0.6, 0.6, 0.6);
      particleSystem.rotation.set(Math.PI * 1.75, 0, 0);

      updateParticles(particleSystem);
      scene.add(particleSystem)
    })
}

function updateParticles(particleSystem) {
  let pos = {
    val: 1.5
  };
  let tween = new TWEEN.Tween(pos).to({val: -0.5}, 4).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(onUpdate).start();
  let tweenBack = new TWEEN.Tween(pos).to({val: 1.5}, 4).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(onUpdate);


  tween.chain(tweenBack);
  tweenBack.chain(tween);

  // 每次都将更新的val值赋值给uniforms，让其传递给shader
  function onUpdate() {
    // console.log(particleSystem.material.uniforms.val)
    if (pos.val < 0 || pos.val > 1) return;
    particleSystem.material.uniforms.val.value = pos.val;
  }
}
export {
  createParticles,
  updateParticles
};