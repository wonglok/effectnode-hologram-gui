import { Vector3 } from "three";

export class JoyStickControls {
  constructor({ mini, camera, mainActor }) {
    //
    this.mini = mini;
    this.camera = camera;
    this.mainActor = mainActor;

    let joystick = document.createElement("div");

    document.body.appendChild(joystick);
    joystick.style.cssText = `
      position: absolute;
      bottom: 30px;
      left: 30px;
      width: 80px;
      height: 80px;
      color: white;
      user-select: none;
      z-index: 30;
    `;

    let note = document.createElement("div");
    document.body.appendChild(note);
    note.style.cssText = `
      position: absolute;
      bottom: 50px;
      left: 50px;
      width: 80px;
      height: 80px;
      color: white;
      user-select: none;
      z-index: 20;
      text-align: center;
      opacity: 0.4;
    `;
    note.innerHTML = `Walk Around JoyStick`;

    let nipplejs = require("nipplejs");
    var manager = nipplejs.create({
      zone: joystick,
      color: "white",
      mode: "static",
      position: { left: "60px", bottom: "60px" },
    });

    let forward = new Vector3(0, 0, 0);
    let up = new Vector3(0, 1, 0);

    let isUsing = false;
    let nippleAngle = 0;

    // window.addEventListener('touchstart', () => {
    //   isDown = true
    // })
    // window.addEventListener('touchend', () => {
    //   isDown = false
    // })
    let force = 1;
    manager.on("start move dir plain", function (evt, nipple) {
      if (nipple?.angle?.radian) {
        force = nipple.force;

        nippleAngle = nipple?.angle?.radian;

        isUsing = true;
        // Now.isDown = true;
      }
    });

    manager.on("end", () => {
      nippleAngle = 0;
      force = 0;

      // Now.isDown = false;
      isUsing = false;
    });

    // camera.rotation.y;

    this.mini.onLoop(() => {
      if (!isUsing) {
        forward.multiplyScalar(0.8);
      } else {
        forward.set(0, 0, -1);
        forward.applyAxisAngle(
          up,
          this.camera.rotation.y + nippleAngle - Math.PI * 0.5 || 0.0
        );

        //
        forward.multiplyScalar(0.3333);
      }

      this.mainActor.playerCollider.translate(forward);
    });
  }
}
