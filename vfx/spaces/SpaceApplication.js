import { Mini } from "../classes/Mini";
import { ColliderWorld } from "./ColliderWorld";
import { ColliderFloor } from "./ColliderFloor";
import { ColliderActor } from "./ColliderActor";
import { KeyboardControls } from "./KeyboardControls";
import { DragScreenControls } from "./DragScreenControls";
import { JoyStickControls } from "./JoyStickControls";

import { SphereGun } from "./SphereGun";

import { Clock, Vector3 } from "three";

export class SpaceApplication {
  constructor({ mounter, camera, renderer, floorURL }) {
    this.STEPS_PER_FRAME = 5;

    this.floorURL = floorURL;
    this.renderer = renderer;
    this.camera = camera;
    this.mounter = mounter;
    this.clock = new Clock();
    this.mini = new Mini({});
    this.mini.set("core", this);

    this.colliderWorld = new ColliderWorld({ mini: this.mini });

    this.colliderFloor = new ColliderFloor({
      mounter: this.mounter,
      mini: this.mini,
      floorURL: this.floorURL,
      octree: this.colliderWorld.octree,
      keyname: "floorGLB",
    });

    this.mainActor = new ColliderActor({
      mini: this.mini,
      camera: this.camera,
      octree: this.colliderWorld.octree,
      keyname: "mainActor",
    });

    this.keyboardControls = new KeyboardControls({
      mini: this.mini,
      //
      mainActor: this.mainActor,
      camera: this.camera,
    });

    this.dragControls = new DragScreenControls({
      //
      mini: this.mini,
      camera: this.camera,
      renderer: this.renderer,
    });

    this.joystickControls = new JoyStickControls({
      //
      mini: this.mini,
      camera: this.camera,
      mainActor: this.mainActor,
    });

    this.sphereGun = new SphereGun({
      mini: this.mini,
      mounter: this.mounter,
      camera: this.camera,
      mainActor: this.mainActor,
    });

    this.tick = () => {
      this.mini.work();
    };
    this.clean = () => {
      this.mini.clean();
    };

    this.register();
    this.setup();
    this.done = this.mini.ready.done;
  }
  async register() {
    this.mini.set("mounter", this.mounter);
  }
  async setup() {
    this.mini.onChange("floorGLB", (floorGLB) => {
      if (floorGLB.scene) {
        let place = floorGLB.scene.getObjectByName("startAt");

        if (place) {
          let vp = new Vector3();
          place.getWorldPosition(vp).sub(this.camera.position);
          //
          this.mainActor.playerCollider.translate(vp);
        }
      }

      this.mounter.add(floorGLB.scene);

      this.mini.onClean(() => {
        this.mounter.remove(floorGLB.scene);
      });
    });

    //

    this.mini.onLoop(() => {
      const deltaTime =
        Math.min(0.05, this.clock.getDelta()) / this.STEPS_PER_FRAME;

      // we look for collisions in substeps to mitigate the risk of
      // an object traversing another too quickly for detection.
      for (let i = 0; i < this.STEPS_PER_FRAME; i++) {
        this.keyboardControls.controls(deltaTime);
        this.mainActor.updatePlayer(deltaTime);
        this.sphereGun.updateSpheres({
          deltaTime,
          worldOctree: this.colliderWorld.octree,
        });
      }
    });

    this.mini.set("done", true);
  }
}
