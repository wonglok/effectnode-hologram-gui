import { Octree } from "three/examples/jsm/math/Octree.js";

export class ColliderWorld {
  constructor({ mini }) {
    this.mini = mini;
    this.octree = new Octree();
  }
}
