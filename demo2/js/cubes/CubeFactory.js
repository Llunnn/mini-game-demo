import {Vector3} from '../libs/three'
import Cube from './Cube'

class CubeFactory {
  constructor(width, height) {
    this.cubeList = [];
    this.availList = [];
    this.screenWidth = width;
    this.screenHeight = height;
  }

  removeCube (cubeId) {
    this.cubeList[cubeId].active = false;
    this.availList.push(this.cubeList[cubeId]);
  }
  addCube () {
    let cube;
    if (this.availList.length !== 0) {
      cube = this.availList.pop();
    } else {
      cube = new Cube(this.cubeList.length);
      this.cubeList.push(cube);
    }
    cube.active = true;
    cube.setPos(...getRandomPos.apply(this));
    cube.setScale(...getRandomScale());
    cube.setRotation(...getRandomRotation());
    cube.setColor(getRandomColor());
    cube.setSpeed(getRandomSpeed());
    // console.log(cube)
    return cube;
  }
  getCubeById (cubeId) {
    return this.cubeList[cubeId];
  }
  getActiveCubeList () {
    return this.cubeList.filter((item) => (item.active));
  }

}
function getRandomRotation() {
  return [
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI,
  ]
}
function getRandomScale() {
  return [
    Math.random() * 3 + 0.2,
    Math.random() * 3 + 0.2,
    Math.random() * 3 + 0.2,
  ];
}
function getRandomPos() {
  let x = (Math.random()-0.5) * this.screenWidth * 0.7 //+ this.screenLeft;
  let y = (Math.random()-0.5) * this.screenHeight * 0.7 //+ this.screenBottom;
  return [x, y, -500.0];
}
function getRandomColor() {
  return Math.random() * 0xffffff;
}

function getRandomSpeed() {
  return Math.random() * 5 + 0.5;
}

export default new CubeFactory(canvas.width, canvas.height);