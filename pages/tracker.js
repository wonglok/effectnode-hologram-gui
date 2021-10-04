import { Text, useProgress } from "@react-three/drei";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import {
  Color,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneBufferGeometry,
  Vector3,
} from "three";
import { InteractionUI } from "../vfx/classes/InteractionUI";
import { Mini } from "../vfx/classes/Mini";
import { Simulation } from "../vfx/classes/Simulation";
import { TrackO3D } from "../vfx/classes/TrackO3D";
import { Sphere } from "three";
// import { EditorLayout } from "../vfx/editor/EditorLayout";

export default function Rendering() {
  return (
    <div className="w-full h-full">
      {/* <EditorLayout
        canvas={

        }
      ></EditorLayout> */}
      <Canvas
        shadows
        dpr={[1, 3]}
        gl={{ alpha: true, antialias: true }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<Loading></Loading>}>
          <Preload></Preload>
          <Content></Content>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Loading() {
  let { total, loaded } = useProgress();
  let { get } = useThree();
  return (
    <group>
      {createPortal(
        <group position={[0, 0, -3]}>
          {/*  */}
          {/*  */}
          <Text color={"black"}>
            Loading: {loaded} / {total}
          </Text>
        </group>,
        get().camera
      )}
      <primitive object={get().camera}></primitive>
    </group>
  );
}

function Preload() {
  return <group></group>;
}

function CamRig() {
  let { camera } = useThree();
  return (
    <group>
      <primitive object={camera}></primitive>
      {/*  */}
      {/*  */}
      {/*  */}
    </group>
  );
}

let enableMousePlane = async ({ node, position = new Vector3() }) => {
  let raycaster = await node.ready.raycaster;
  let mouse = await node.ready.mouse;
  let scene = await node.ready.scene;
  let camera = await node.ready.camera;
  let viewport = await node.ready.viewport;

  let geoPlane = new PlaneBufferGeometry(
    2.0 * viewport.width,
    2.0 * viewport.height,
    2,
    2
  );

  let matPlane = new MeshBasicMaterial({
    transparent: true,
    opacity: 0.0,
    color: 0xff0000,
  });

  let planeMesh = new Mesh(geoPlane, matPlane);
  planeMesh.position.z = -camera.position.z / 2;

  node.onLoop(() => {
    planeMesh.lookAt(camera.position);
    raycaster.setFromCamera(mouse, camera);
    let res = raycaster.intersectObject(planeMesh);
    if (res && res[0]) {
      position.copy(res[0].point);
    }
  });
};

function Content() {
  let ST3 = useThree();

  ST3.camera.position.z = 15;

  let mini = useMemo(() => {
    return new Mini({});
  }, []);

  useEffect(() => {
    return () => {
      mini.clean();
    };
  }, [mini]);

  useFrame(() => {
    mini.work();
  });
  let o3d = new Object3D();

  let trackers = [];

  for (let tt = 0; tt < 512; tt++) {
    trackers.push(new Object3D());
  }

  let sim = useMemo(() => {
    return new TrackO3D({
      node: mini,
      tailLength: 32, // 512, 1024
      howManyTrackers: trackers.length,
    });
  }, [trackers, trackers.length]);

  let position = new Vector3();

  //
  enableMousePlane({ node: mini, position });

  // let o3dA = ;
  // { mouse } //

  let sphere = new Sphere();
  let v3 = new Vector3();
  useFrame((st, dt) => {
    let et = st.clock.getElapsedTime();
    trackers.forEach((t, i, a) => {
      t.position.lerp(position, 0.2);

      sphere.center.copy(t.position);
      sphere.radius = 1;

      let n = (i - a.length * 0.5) * 1.0;

      let r = i / a.length;
      // t.position.x += r * (Math.sin(et) * Math.sin(et) - 0.5);
      // t.position.y += r * (Math.sin(et) * Math.cos(et));

      v3.setFromSphericalCoords(r, (Math.PI * 2.0 * i) / a.length + et, n * et);

      t.position.add(v3);

      // t.position.z += r * Math.sin(et + n);
      // t.position.y += i * 0.03;
      // t.position.z += i * 0.03;
      t.position.add(v3);
    });

    sim.track({ trackers, lerp: 1 });
  });

  useEffect(() => {
    ST3.get().scene.background = new Color("#000000");

    for (let kn in ST3) {
      mini.set(kn, ST3[kn]);
    }
  }, []);

  useEffect(() => {
    return InteractionUI.fixTouchScreen({ target: ST3.gl.domElement });
  }, []);
  //

  //st

  return (
    <group>
      {createPortal(<primitive object={sim.o3d} />, o3d)}

      <primitive object={o3d} />

      <CamRig />

      {/* <directionalLight position={[1, 1, 1]} /> */}
      {/*  */}
      {/* <mesh>
        <octahedronGeometry args={[8, 5]}></octahedronGeometry>
        <meshStandardMaterial metalness={0.3}></meshStandardMaterial>
      </mesh> */}
      {/*  */}
    </group>
  );
}
