import "./style.css";
import * as THREE from "three";
import { Pillars } from "./pillars";
import {Fog} from "three";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Point LIGHT
const pointLight = new THREE.PointLight("white", 1);
pointLight.position.set(-15, 0, 10);
scene.add(pointLight);
// const sphereSize = 0.2;
// const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
// scene.add(pointLightHelper);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;
const position = {
  x: 6.878317755292773,
  y: 0.030015498380718375,
  z: 9.60440123733311,
};

camera.position.x = position.x;
camera.position.y = position.y;
camera.position.z = position.z;

camera.lookAt(-100, 0, 0);

// Fog
scene.fog = new Fog('black', 5, 10);

// const controls = new OrbitControls(camera, renderer.domElement);

// @ts-ignore
window.camera = camera;

// Geometries
const geoms = new Pillars();

scene.add(...geoms.getObjects());

function animate() {
  requestAnimationFrame(animate);
  // controls.update();

  geoms.updateGeometry();

  renderer.render(scene, camera);
}

animate();
