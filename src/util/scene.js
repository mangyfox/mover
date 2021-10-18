/**
 * Setup for a ThreeJS Scene
 */
import * as THREE from 'three';
import { Vector3 } from 'three';

const TAU = 2 * Math.PI;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
const loader = new THREE.TextureLoader();

const car = new THREE.Group();

const cubeGeo = new THREE.BoxBufferGeometry(1, 0.3, 0.5);
const cubeMat = new THREE.MeshPhongMaterial({ color: "#f00" });
const cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.position.y = 0.1;
cube.castShadow = true;
car.add(cube);


const wheelGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 16);
const wheelMat = new THREE.MeshPhongMaterial({ color: "#111" });
const wheelFL = new THREE.Mesh(wheelGeo, wheelMat);
wheelFL.rotateX(TAU / 4);
wheelFL.position.x = 0.3;
wheelFL.position.z = -0.3;
wheelFL.castShadow = true;
car.add(wheelFL);

const wheelFR = wheelFL.clone();
wheelFR.position.z = 0.3;
car.add(wheelFR);

const wheelRL = wheelFL.clone();
wheelRL.position.x = -0.3;
car.add(wheelRL);

const wheelRR = wheelRL.clone();
wheelRR.position.z = 0.3;
car.add(wheelRR);

car.position.y = 0.15;

const groundGeo = new THREE.PlaneGeometry(70, 50);
const groundMat = new THREE.MeshStandardMaterial({ color: "#090" });
const grassTexture = loader.load('/img/grass.jpg');
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(35, 25);
groundMat.map = grassTexture;
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotateX(-TAU / 4);
ground.position.x = 35;
ground.position.z = 25;
ground.receiveShadow = true;

const light = new THREE.DirectionalLight('#ffe', 1);
light.position.add(new Vector3(-5,20,5));
light.shadow.camera.top = 70;
light.shadow.camera.bottom = 0;
light.shadow.camera.left = 0;
light.shadow.camera.right = 70;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.castShadow = true;
light.lookAt(ground.position);
const ambient = new THREE.AmbientLight('#999', 0.5);

let renderer;
scene.add(car);
scene.add(ground);
scene.add(light);
scene.add(ambient);
camera.position.z = car.position.z + 15;
camera.position.y = 15;
camera.position.x = car.position.x;
camera.lookAt(car.position);

const resize = (el) => {
  renderer.setSize(el.width, el.height);
  camera.aspect = el.width / el.height;
  camera.updateProjectionMatrix();
};

export const createScene = (el, state) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  renderer.setClearColor('#87cefa');
  renderer.shadowMap.enabled = true;
  resize(el);
  console.log(state.track);
}

export const updateScene = (state) => {
  wheelFL.rotation.z = state.car.steering * TAU / 12;
  wheelFR.rotation.z = state.car.steering * TAU / 12;
  car.rotation.y = -state.car.rotation;
  car.position.x = state.car.pos.x / 20;
  car.position.z = state.car.pos.y / 20;
  camera.position.z = car.position.z + 15;
  camera.position.x = car.position.x;
  renderer.render(scene, camera);
}

