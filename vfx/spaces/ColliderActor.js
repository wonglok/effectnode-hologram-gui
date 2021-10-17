import { Vector3 } from "three";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
const GRAVITY = 30;
// const NUM_SPHERES = 100;
// const SPHERE_RADIUS = 0.2;

export class ColliderActor {
  constructor({ mini, octree, camera, keyname = "actor" }) {
    this.mini = mini;
    this.octree = octree;
    this.camera = camera;
    this.playerCollider = new Capsule(
      new Vector3(0, 0.35, 0),
      new Vector3(0, 1, 0),
      0.35
    );

    this.playerVelocity = new Vector3();
    this.playerDirection = new Vector3();
    this.playerOnFloor = false;

    this.mini.set(keyname, this);

    this.temp = new Vector3();
  }

  updatePlayer(deltaTime) {
    let damping = Math.exp(-4 * deltaTime) - 1;

    if (!this.playerOnFloor) {
      this.playerVelocity.y -= GRAVITY * deltaTime;

      // small air resistance
      damping *= 0.1;
    }

    this.playerVelocity.addScaledVector(this.playerVelocity, damping);

    const deltaPosition = this.temp
      .copy(this.playerVelocity)
      .multiplyScalar(deltaTime);

    this.playerCollider.translate(deltaPosition);

    this.playerCollisions();

    this.camera.position.copy(this.playerCollider.end);
  }

  playerCollisions() {
    const result = this.octree.capsuleIntersect(this.playerCollider);

    this.playerOnFloor = false;

    if (result) {
      this.playerOnFloor = result.normal.y > 0;

      if (!this.playerOnFloor) {
        this.playerVelocity.addScaledVector(
          result.normal,
          -result.normal.dot(this.playerVelocity)
        );
      }

      this.playerCollider.translate(result.normal.multiplyScalar(result.depth));
    }
  }
}
