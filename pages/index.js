import {
  Text,
  useGLTF,
  useProgress,
  useTexture,
  useFBO,
} from "@react-three/drei";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  Color,
  Camera,
  EquirectangularReflectionMapping,
  Object3D,
  sRGBEncoding,
  Mesh,
  ShaderMaterial,
  PlaneBufferGeometry,
  MeshStandardMaterial,
} from "three";
import { SkeletonUtils } from "three-stdlib";
import { InteractionUI } from "../vfx/classes/InteractionUI";
import { Mini } from "../vfx/classes/Mini";
import { SpaceApplication } from "../vfx/spaces/SpaceApplication";
import { SimpleBloomer } from "../vfx/postprocessing/SimpleBloomer";
import { useEnvLight } from "../vfx/utils/use-env-light";
import Login from "./login";
import router from "next/router";
import { makeShallowStore } from "../vfx/utils/make-shallow-store";
import { useAutoEvent } from "../vfx/utils/use-auto-event";
// import { EditorLayout } from "../vfx/editor/EditorLayout";

let GUI = makeShallowStore({ overlay: "" });

export default function PageRoot() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 3]}
        gl={{ alpha: true, antialias: true }}
        performance={{ min: 0.85 }}
      >
        <Suspense fallback={null}>
          {/* <Content></Content> */}
          <SimpleBloomer />
          <Spaces></Spaces>
          <Coloring></Coloring>
        </Suspense>
      </Canvas>
      <Overlay></Overlay>
    </div>
  );
}

function Overlay() {
  GUI.makeKeyReactive("overlay");
  useAutoEvent("keydown", (ev) => {
    if (ev.key === "Escape") {
      GUI.overlay = "";
    }
  });
  return GUI.overlay === "login" ? (
    <div className="absolute top-0 left-0 w-full h-full">
      <Login
        login={() => {
          //
          router.push("/places");
        }}
      ></Login>

      <div
        className="absolute top-0 right-0 p-4 lg:p-12 hover:cursor-pointer"
        onClick={() => {
          GUI.overlay = "";
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
          />
        </svg>
      </div>
    </div>
  ) : null;
}

// function Loading() {
//   let { total, loaded } = useProgress();
//   let { get } = useThree();
//   return (
//     <group>
//       {createPortal(
//         <group position={[0, 0, -3]}>
//           {/*  */}
//           <Text color={"black"}>
//             Loading: {loaded} / {total}
//           </Text>
//         </group>,
//         get().camera
//       )}
//       <primitive object={get().camera}></primitive>
//     </group>
//   );
// }

function Spaces({}) {
  // let { envMap } = useEnvLight();

  let { get } = useThree();
  let app = useMemo(() => {
    return new SpaceApplication({
      camera: get().camera,
      renderer: get().gl,
      mouse: get().mouse,
      floorURL: `/content3d/lobby/floorlab.glb`,
    });
  });

  useEffect(() => {
    get().scene.add(app.mounter);
    return () => {
      app.clean();
    };
  }, []);

  useFrame(({ scene }) => {
    if (app) {
      app.tick();
    }
  });

  return (
    <group>
      <Decoration o3d={app.mounter}></Decoration>
    </group>
  );
}

function Decoration({ o3d }) {
  let { get } = useThree();
  let detect = () => {
    get().raycaster.setFromCamera(get().mouse, get().camera);
    let res = get().raycaster.intersectObjects([o3d], true);
    if (res && res[0]) {
      return res[0];
    } else {
      return false;
    }
  };

  let sel = useRef();
  let scan = () => {
    let result = detect();

    sel.current = result;

    if (sel?.current?.object) {
      if (sel.current.object.name.indexOf("star") === 0) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "";
      }
    } else {
      document.body.style.cursor = "";
    }
  };

  scan();
  useFrame(() => {});

  let cursor = useRef({ isDown: false });
  useAutoEvent(
    "pointerdown",
    () => {
      cursor.current.move = 0;
      cursor.current.isDown = true;
    },
    { passive: true },
    get().gl.domElement.parentElement
  );
  useAutoEvent(
    "pointermove",
    () => {
      if (cursor.current.isDown) {
        cursor.current.move++;
      }

      scan();
    },
    { passive: true },
    get().gl.domElement.parentElement
  );
  useAutoEvent(
    "pointerup",
    () => {
      if (cursor.current.move <= 10) {
        if (sel.current) {
          if (sel.current.object.name.indexOf("star") === 0) {
            document.body.style.cursor = "";
            sel.current = false;
            GUI.overlay = "login";
          }
        }
      }
      cursor.current.isDown = false;
    },
    { passive: true },
    get().gl.domElement.parentElement
  );

  // useEffect(() => {
  //   return InteractionUI.fixTouchScreen({ target: get().gl.domElement });
  // }, []);
  //
  return null;
}

// function Content() {
//   let T3 = useThree();

//   let mini = useMemo(() => {
//     return new Mini({});
//   }, []);

//   useFrame(() => {
//     mini.work();
//   });
//   let o3d = new Object3D();

//   // let sim = useMemo(() => {
//   //   return new Simulation({ mini });
//   // }, []);

//   useEffect(() => {
//     for (let kn in T3) {
//       mini.set(kn, T3[kn]);
//     }
//   }, []);

//   return (
//     <group>
//       {/* {createPortal(<primitive object={anyo3d} />, o3d)} */}
//       <primitive object={o3d} />
//       {/* <directionalLight position={[1, 1, 1]} /> */}
//       {/*  */}
//       {/* <mesh>
//         <octahedronGeometry args={[8, 5]}></octahedronGeometry>
//         <meshStandardMaterial metalness={0.3}></meshStandardMaterial>
//       </mesh> */}
//       {/*  */}
//       <CamRig />
//       <Coloring></Coloring>

//       <Avatar></Avatar>
//     </group>
//   );
// }

// function CamRig() {
//   let { camera } = useThree();

//   camera.position.z = 2;
//   camera.position.y = 1.8;
//   camera.lookAt(0, camera.position.y * 0.6, 0);

//   return (
//     <group>
//       <primitive object={camera}></primitive>
//       {/*  */}
//       {/*  */}
//       {/*  */}
//     </group>
//   );
// }

// function Avatar() {
//   let gltf = useGLTF(
//     `https://d1a370nemizbjq.cloudfront.net/4cbc677b-3c53-4787-b62e-288d84f379a0.glb`
//   );

//   let ava = useMemo(() => {
//     return SkeletonUtils.clone(gltf.scene);
//   });

//   let o3d = new Object3D();
//   o3d.add(ava);

//   return (
//     <group>
//       <primitive object={o3d} />
//     </group>
//   );
// }

function Coloring() {
  // let { envMap } = useEnvLight();
  let { get } = useThree();

  let tex = useTexture(`/envmap/palace.jpg`);
  tex.encoding = sRGBEncoding;
  tex.mapping = EquirectangularReflectionMapping;

  useEffect(() => {
    get().gl.outputEncoding = sRGBEncoding;
    get().gl.physicallyCorrectLights = true;

    get().scene.background = new Color("#000000");
    get().scene.environment = tex;
  }, []);

  return (
    <group>
      {/* <mesh position={[2, 2, -2]}>
        <meshBasicMaterial envMap={envMap} />
        <sphereBufferGeometry args={[2, 25, 25]}></sphereBufferGeometry>
      </mesh> */}

      {/*  */}
      <ambientLight intensity={1} />
      <directionalLight position={[0, 30, 30]} intensity={1} />
    </group>
  );
  //
}
