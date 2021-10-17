export class KeyboardControls {
  constructor({ mini, mainActor, camera }) {
    this.mini = mini;
    this.mainActor = mainActor;
    this.keyStates = {};
    this.mouseTime = 0;
    this.camera = camera;
    this.camera.fov = 35 + (15 * window.innerHeight) / window.innerWidth;

    this.mini.autoEvent(
      "keydown",
      (event) => {
        //
        this.keyStates[event.code] = true;
      },
      document,
      {
        passive: true,
      }
    );
    this.mini.autoEvent(
      "keyup",
      (event) => {
        //
        this.keyStates[event.code] = false;
      },
      document,
      {
        passive: true,
      }
    );

    this.mini.autoEvent(
      "mousedown",
      (event) => {
        //
        // document.body.requestPointerLock();

        this.mouseTime = performance.now();
      },
      document,
      {
        passive: true,
      }
    );

    this.mini.autoEvent(
      "mouseup",
      (event) => {
        //
      },
      document,
      {
        passive: true,
      }
    );
  }

  getForwardVector() {
    this.camera.getWorldDirection(this.mainActor.playerDirection);
    this.mainActor.playerDirection.y = 0;
    this.mainActor.playerDirection.normalize();

    return this.mainActor.playerDirection;
  }
  //
  getSideVector() {
    this.camera.getWorldDirection(this.mainActor.playerDirection);
    this.mainActor.playerDirection.y = 0;
    this.mainActor.playerDirection.normalize();
    this.mainActor.playerDirection.cross(this.camera.up);

    return this.mainActor.playerDirection;
  }
  //
  controls(deltaTime) {
    // gives a bit of air control
    const speedDelta = deltaTime * (this.mainActor.playerOnFloor ? 25 : 8);

    if (this.keyStates["KeyW"] || this.keyStates["ArrowUp"]) {
      this.mainActor.playerVelocity.add(
        this.getForwardVector().multiplyScalar(speedDelta)
      );
    }

    if (this.keyStates["KeyS"] || this.keyStates["ArrowDown"]) {
      this.mainActor.playerVelocity.add(
        this.getForwardVector().multiplyScalar(-speedDelta)
      );
    }

    if (this.keyStates["KeyA"] || this.keyStates["ArrowLeft"]) {
      this.mainActor.playerVelocity.add(
        this.getSideVector().multiplyScalar(-speedDelta)
      );
    }

    if (this.keyStates["KeyD"] || this.keyStates["ArrowRight"]) {
      this.mainActor.playerVelocity.add(
        this.getSideVector().multiplyScalar(speedDelta)
      );
    }

    if (this.mainActor.playerOnFloor) {
      if (this.keyStates["Space"]) {
        this.mainActor.playerVelocity.y = 15;
      }
    }
  }
}
