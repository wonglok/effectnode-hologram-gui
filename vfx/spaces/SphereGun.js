import { MeshStandardMaterial } from "three";
import { SphereGeometry } from "three";
import { Mesh, Vector3, Sphere } from "three";

const NUM_SPHERES = 100;
const SPHERE_RADIUS = 0.2;
//
const GRAVITY = 30;

const vector1 = new Vector3();
const vector2 = new Vector3();
const vector3 = new Vector3();

export class SphereGun {
  constructor({ mini, mounter, mainActor, camera }) {
    this.mounter = mounter;
    this.camera = camera;
    this.mainActor = mainActor;
    this.spheres = [];

    this.mini = mini;
    this.sphereIdx = 0;
    const sphereGeometry = new SphereGeometry(SPHERE_RADIUS, 32, 32);
    const sphereMaterial = new MeshStandardMaterial({
      color: 0x888855,
      roughness: 0.8,
      metalness: 0.5,
    });

    for (let i = 0; i < NUM_SPHERES; i++) {
      const sphere = new Mesh(sphereGeometry, sphereMaterial);

      this.mounter.add(sphere);
      this.mini.onClean(() => {
        this.mounter.remove(sphere);
      });

      this.spheres.push({
        mesh: sphere,
        collider: new Sphere(new Vector3(0, -100, 0), SPHERE_RADIUS),
        velocity: new Vector3(),
      });
    }

    this.mini.autoEvent(
      "mouseup",
      (event) => {
        //
        this.throwBall();
      },
      document,
      {
        passive: true,
      }
    );
  }

  throwBall() {
    const sphere = this.spheres[this.sphereIdx];

    this.camera.getWorldDirection(this.mainActor.playerDirection);

    sphere.collider.center
      .copy(this.mainActor.playerCollider.end)
      .addScaledVector(
        this.mainActor.playerDirection,
        this.mainActor.playerCollider.radius * 1.5
      );

    // throw the ball with more force if we hold the button longer, and if we move forward

    const impulse =
      15 + 30 * (1 - Math.exp((this.mouseTime - performance.now()) * 0.001));

    sphere.velocity
      .copy(this.mainActor.playerDirection)
      .multiplyScalar(impulse);
    sphere.velocity.addScaledVector(this.mainActor.playerVelocity, 2);

    this.sphereIdx = (this.sphereIdx + 1) % this.spheres.length;
    this.mouseTime = performance.now();
  }

  playerSphereCollision(sphere) {
    const center = vector1
      .addVectors(
        this.mainActor.playerCollider.start,
        this.mainActor.playerCollider.end
      )
      .multiplyScalar(0.5);

    const sphere_center = sphere.collider.center;

    const r = this.mainActor.playerCollider.radius + sphere.collider.radius;
    const r2 = r * r;

    // approximation: player = 3 this.spheres

    for (const point of [
      this.mainActor.playerCollider.start,
      this.mainActor.playerCollider.end,
      center,
    ]) {
      const d2 = point.distanceToSquared(sphere_center);

      if (d2 < r2) {
        const normal = vector1.subVectors(point, sphere_center).normalize();
        const v1 = vector2
          .copy(normal)
          .multiplyScalar(normal.dot(this.mainActor.playerVelocity));
        const v2 = vector3
          .copy(normal)
          .multiplyScalar(normal.dot(sphere.velocity));

        this.mainActor.playerVelocity.add(v2).sub(v1);
        sphere.velocity.add(v1).sub(v2);

        const d = (r - Math.sqrt(d2)) / 2;
        sphere_center.addScaledVector(normal, -d);
      }
    }
  }

  spheresCollisions() {
    for (let i = 0, length = this.spheres.length; i < length; i++) {
      const s1 = this.spheres[i];

      for (let j = i + 1; j < length; j++) {
        const s2 = this.spheres[j];

        const d2 = s1.collider.center.distanceToSquared(s2.collider.center);
        const r = s1.collider.radius + s2.collider.radius;
        const r2 = r * r;

        if (d2 < r2) {
          const normal = vector1
            .subVectors(s1.collider.center, s2.collider.center)
            .normalize();
          const v1 = vector2
            .copy(normal)
            .multiplyScalar(normal.dot(s1.velocity));
          const v2 = vector3
            .copy(normal)
            .multiplyScalar(normal.dot(s2.velocity));

          s1.velocity.add(v2).sub(v1);
          s2.velocity.add(v1).sub(v2);

          const d = (r - Math.sqrt(d2)) / 2;

          s1.collider.center.addScaledVector(normal, d);
          s2.collider.center.addScaledVector(normal, -d);
        }
      }
    }
  }

  updateSpheres({ deltaTime, worldOctree }) {
    this.spheres.forEach((sphere) => {
      sphere.collider.center.addScaledVector(sphere.velocity, deltaTime);

      const result = worldOctree.sphereIntersect(sphere.collider);

      if (result) {
        sphere.velocity.addScaledVector(
          result.normal,
          -result.normal.dot(sphere.velocity) * 1.5
        );
        sphere.collider.center.add(result.normal.multiplyScalar(result.depth));
      } else {
        sphere.velocity.y -= GRAVITY * deltaTime;
      }

      const damping = Math.exp(-1.5 * deltaTime) - 1;
      sphere.velocity.addScaledVector(sphere.velocity, damping);

      this.playerSphereCollision(sphere);
    });

    this.spheresCollisions();

    for (const sphere of this.spheres) {
      sphere.mesh.position.copy(sphere.collider.center);
    }
  }
}
