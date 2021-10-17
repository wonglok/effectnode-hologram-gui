import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Octree } from "three/examples/jsm/math/Octree";
export class ColliderFloor {
  constructor({ mini, mounter, floorURL, octree, keyname = "floorGLTF" }) {
    this.mini = mini;
    this.mounter = mounter;

    /** @type {Octree} */
    this.octree = octree;

    this.floorURL = floorURL;
    const loader = new GLTFLoader();
    loader.load(this.floorURL, (gltf) => {
      this.mini.set(keyname, gltf);
      this.octree.fromGraphNode(gltf.scene);
    });
  }
}
