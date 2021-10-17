import { Camera, Euler, Quaternion, Vector3 } from "three";
import { OrbitControls } from "three-stdlib";

export class DragScreenControls {
  constructor({ mini, camera, renderer }) {
    this.camera = camera;
    this.mini = mini;
    let fakeCam = new Camera();
    fakeCam.position.z = 10;
    let orbit = new OrbitControls(fakeCam, renderer.domElement.parentElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.1;
    this.mini.onLoop(() => {
      orbit.update();
      this.camera.rotation.copy(fakeCam.rotation);
    });
  }
}
