import "./style.css";
import * as THREE from "three";
import { Pillars } from "./pillars";
import { Fog } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Point LIGHT
const pointLight = new THREE.PointLight("white", 1);
pointLight.position.set(-20, 15, 0);
scene.add(pointLight);
const sphereSize = 0.2;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;
// const position = {
//   x: 6.878317755292773,
//   y: 0.030015498380718375,
//   z: 9.60440123733311,
// };
const zoom = 5;
camera.position.x = 0;
camera.position.y = 2.3;
camera.position.z = zoom;

const ENABLE_ORBIT = false;

let controls: undefined | OrbitControls;
if (ENABLE_ORBIT) {
  // FOG
  controls = new OrbitControls(camera, renderer.domElement);
} else {
  scene.fog = new Fog("black", 5, 10);
}

// @ts-ignore
window.camera = camera;

// Geometries
const pillars = new Pillars();
const group = new THREE.Group();
group.add(...pillars.getObjects());
group.rotation.x = -Math.PI / 2;
let tiltAmount = 0.2;
group.rotation.x += tiltAmount;
// group.rotation.y += tiltAmount;

scene.add(group);

function animate() {
  requestAnimationFrame(animate);
  if (controls) {
    controls.update();
  }

  pillars.updateGeometry();

  renderer.render(scene, camera);
}

animate();
