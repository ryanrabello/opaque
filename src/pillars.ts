import * as THREE from "three";
import { Material, Mesh } from "three";
import { scaleLinear } from "d3-scale";
import { default as SimplexNoise } from "simplex-noise";
import { ScaleLinear } from "d3";

export class Pillars {
  private objs: {
    mesh: Mesh;
    x: number;
    y: number;
  }[];
  private material: Material;
  private simplex: SimplexNoise;
  private simplexTime: number;
  private zScale: ScaleLinear;

  constructor() {
    this.objs = [];

    this.material = new THREE.MeshPhysicalMaterial({
      color: "#2c2c2c",
      reflectivity: 1,
    });

    // setup coordinates
    const pillarCounts = [40, 40];
    const range = [-5, 5];
    const xScale = scaleLinear().domain([0, pillarCounts[0]]).range(range);
    const yScale = scaleLinear().domain([0, pillarCounts[1]]).range(range);
    const zScale = scaleLinear().domain([0, 1]).range([1, 5]);
    this.zScale = zScale;

    // Noise
    const simplex = new SimplexNoise(6543456);
    this.simplex = simplex;
    this.simplexTime = 0;

    for (let i = 0; i < pillarCounts[0]; i++) {
      for (let j = 0; j < pillarCounts[0]; j++) {
        const r = (range[1] - range[0]) / pillarCounts[0];
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(r, r), this.material);
        const x = xScale(i);
        const y = yScale(j);
        mesh.position.x = x;
        mesh.position.y = y;
        this.setZ(mesh, x, y);

        this.objs.push({
          x,
          y,
          mesh,
        });
      }
    }
  }

  getObjects() {
    return this.objs.map((g) => g.mesh);
  }

  updateGeometry() {
    this.simplexTime += 0.0015; // TODO: base on framerate
    this.objs.forEach((obj) => {
      this.setZ(obj.mesh, obj.x, obj.y);
    });
  }

  setZ(mesh: Mesh, x: number, y: number) {
    const simplexScale = 0.4;
    const z = this.zScale(
      this.simplex.noise3D(
        simplexScale * x,
        simplexScale * y,
        this.simplexTime
      ) + 1
    );

    mesh.scale.z = z;
    mesh.position.z = z / 2;
  }
}
