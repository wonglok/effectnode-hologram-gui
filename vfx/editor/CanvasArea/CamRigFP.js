import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MathUtils } from "three";
import { Camera, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { applyAutoEvent, useAutoEvent } from "../../utils/use-auto-event";
import { Now } from "../Now";

export function CamRigFP({ cameraHeight = 1.5 }) {
  let { camera, get, gl, set } = useThree();
  let works = useRef({});
  useAutoEvent(
    `touchstart`,
    (ev) => {
      ev.preventDefault();
    },
    { passive: false }
  );

  useAutoEvent(
    `touchmove`,
    (ev) => {
      ev.preventDefault();
    },
    { passive: false }
  );

  useAutoEvent(
    `touchend`,
    (ev) => {
      ev.preventDefault();
    },
    { passive: false }
  );

  useEffect(() => {
    let orig = Now.camMode;
    Now.camMode = "first";
    Now.avatarSpeed = 1;
    return () => {
      Now.avatarSpeed = 1;
      Now.camMode = orig;
    };
  });
  //

  useAutoEvent("keydown", (ev) => {
    // console.log(ev.key);

    if (ev.key === "w") {
      Now.keyW = true;
    }
    if (ev.key === "a") {
      Now.keyA = true;
    }
    if (ev.key === "s") {
      Now.keyS = true;
    }
    if (ev.key === "d") {
      Now.keyD = true;
    }
  });
  useAutoEvent("keyup", (ev) => {
    // console.log(ev.key);

    if (ev.key === "w") {
      Now.keyW = false;
    }
    if (ev.key === "a") {
      Now.keyA = false;
    }
    if (ev.key === "s") {
      Now.keyS = false;
    }
    if (ev.key === "d") {
      Now.keyD = false;
    }
  });

  useEffect(() => {
    camera.near = 0.1;
    camera.far = 10000;
    // camera.fov = 50;
    camera.updateProjectionMatrix();

    let fakeCam = new Camera();
    fakeCam.position.z = 5;

    let orbit = new OrbitControls(fakeCam, gl.domElement);
    orbit.enableRotate = true;
    orbit.enablePan = false;
    orbit.enableZoom = false;

    orbit.enableDamping = true;
    orbit.rotateSpeed = 0.5;

    let joystick = document.createElement("div");

    get().gl.domElement.parentElement.style.position = "absolute";
    get().gl.domElement.parentElement.appendChild(joystick);
    joystick.style.cssText = `
      position: absolute;
      bottom: 10px;
      left: 10px;
      width: 80px;
      height: 80px;
      color: black;
      user-select: none;
      z-index: 20;
    `;

    let note = document.createElement("div");
    get().gl.domElement.parentElement.appendChild(note);
    note.style.cssText = `
      position: absolute;
      bottom: 20px;
      left: 30px;
      width: 80px;
      height: 80px;
      color: black;
      user-select: none;
      z-index: 10;
      text-align: center;
      opacity: 0.4;
    `;
    note.innerHTML = `Walk Around JoyStick`;

    let nipplejs = require("nipplejs");
    var manager = nipplejs.create({
      zone: joystick,
      color: "black",
      mode: "static",
      position: { left: "60px", bottom: "60px" },
    });

    let forward = new Vector3(0, 0, 0);
    let up = new Vector3(0, 1, 0);

    let ttt = 0;
    let isUsing = false;
    let isDown = false;
    let nippleAngle = 0;

    window.addEventListener("touchstart", () => {
      isDown = true;
    });
    window.addEventListener("touchend", () => {
      isDown = false;
    });

    manager.on("start move dir plain", function (evt, nipple) {
      if (nipple?.angle?.radian) {
        nippleAngle = nipple?.angle?.radian;
        orbit.enableRotate = false;

        isUsing = true;
        // Now.isDown = true;

        // clearTimeout(ttt);
        // ttt = setTimeout(() => {
        //   isUsing = false;
        // }, 100);
      }
    });

    manager.on("end", () => {
      nippleAngle = 0;
      works.current.endForward = () => {
        forward.multiplyScalar(0.8);
      };
      // Now.isDown = false;
      orbit.enableRotate = true;
      isUsing = false;
    });

    let cte = applyAutoEvent(
      gl.domElement.parentElement,
      `touchend`,
      (ev) => {
        if (!isUsing) {
          orbit.enableRotate = true;
        }
      },
      { passive: false }
    );
    let cts = applyAutoEvent(
      gl.domElement.parentElement,
      `touchstart`,
      (ev) => {
        if (!isUsing) {
          orbit.enableRotate = true;
        }
      },
      { passive: false }
    );

    let keyBoardForward = new Vector3(0, 0, 1);
    let scaler = 1;

    works.current.ctrl2 = () => {
      if (isUsing) {
        forward.set(0, 0, -1 * 0.125);
        forward.applyAxisAngle(
          up,
          orbit.getAzimuthalAngle() + nippleAngle - Math.PI * 0.5 || 0.0
        );
      }
      //
      if (Now.keyW || Now.keyA || Now.keyS || Now.keyD) {
        scaler = MathUtils.lerp(scaler, 1, 0.1);
      } else {
        scaler = MathUtils.lerp(scaler, 0.0, 0.1);
      }

      let speed = 0.3;
      let walkerSpeed = 0.2;
      // controls.getDirection(dir);
      if (Now.keyW) {
        keyBoardForward.set(0, 0, -1 * scaler * speed);
        keyBoardForward.applyEuler(camera.rotation);
        keyBoardForward.y = 0.0;
        keyBoardForward.multiplyScalar(walkerSpeed);
        Now.avatarAt.add(keyBoardForward).multiplyScalar(1);
      } else if (Now.keyA) {
        keyBoardForward.set(-1 * scaler * speed, 0, 0);
        keyBoardForward.applyEuler(camera.rotation);
        keyBoardForward.y = 0.0;
        keyBoardForward.multiplyScalar(walkerSpeed);

        Now.avatarAt.add(keyBoardForward).multiplyScalar(1);
      } else if (Now.keyS) {
        keyBoardForward.set(0, 0, 1 * scaler * speed);
        keyBoardForward.applyEuler(camera.rotation);
        keyBoardForward.y = 0.0;
        keyBoardForward.multiplyScalar(walkerSpeed);

        Now.avatarAt.add(keyBoardForward).multiplyScalar(1);
      } else if (Now.keyD) {
        keyBoardForward.set(1 * scaler * speed, 0, 0);
        keyBoardForward.applyEuler(camera.rotation);
        keyBoardForward.y = 0.0;

        keyBoardForward.multiplyScalar(walkerSpeed);
        Now.avatarAt.add(keyBoardForward).multiplyScalar(1);
      }

      Now.goingTo.copy(Now.avatarAt);
      // if (!(Now.keyW || Now.keyA || Now.keyS || Now.keyD)) {
      //   Now.avatarAt.copy(Now.avatarAt);
      // }
    };

    // grid of raycaster

    works.current.ctrl3 = () => {
      let newType = "floor";

      // let upness = Now.cursorNormal.y || 0;
      if (Now.cursorType !== newType) {
        Now.cursorType = newType;
      }
    };

    works.current.ctrl = () => {
      orbit.update();

      // Now.goingTo.add(forward);
      forward.multiplyScalar(0.4);
      Now.avatarAt.add(forward);

      camera.position.x = Now.avatarAt.x;
      camera.position.y = Now.avatarAt.y + cameraHeight;
      camera.position.z = Now.avatarAt.z;

      camera.rotation.copy(fakeCam.rotation);
    };

    let p = get().gl.domElement.parentElement;
    Now.enableFloorCursor = false;
    return () => {
      Now.enableFloorCursor = true;
      manager.off("start move end dir plain");
      manager.destroy();
      p.removeChild(joystick);

      joystick.remove();
      note.remove();
      cte();
      cts();
    };
  }, []);

  useFrame(() => {
    Object.values(works.current).forEach((e) => e());
  });
  return <group></group>;
}
