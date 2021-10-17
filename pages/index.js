import { Text, useGLTF, useProgress, useTexture } from "@react-three/drei";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  Color,
  EquirectangularReflectionMapping,
  Object3D,
  sRGBEncoding,
} from "three";
import { SkeletonUtils } from "three-stdlib";
import { InteractionUI } from "../vfx/classes/InteractionUI";
import { Mini } from "../vfx/classes/Mini";
import { SpaceApplication } from "../vfx/spaces/SpaceApplication";
import { SimpleBloomer } from "../vfx/postprocessing/SimpleBloomer";
// import { EditorLayout } from "../vfx/editor/EditorLayout";

export default function PageRoot() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 3]}
        gl={{ alpha: true, antialias: true }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<Loading></Loading>}>
          {/* <Content></Content> */}
          <Spaces></Spaces>
          <SimpleBloomer />
          <Coloring></Coloring>
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

function Spaces({}) {
  let { get } = useThree();
  let ref = useRef();
  let app = useRef();

  useEffect(() => {
    app.current = new SpaceApplication({
      mounter: ref.current,
      camera: get().camera,
      renderer: get().gl,
      floorURL: `/content3d/lobby/floorlab.glb`,
    });

    return () => {
      app.current.clean();
    };
  }, []);

  useFrame(() => {
    if (app.current) {
      app.current.tick();
    }
  });

  return <group ref={ref}></group>;
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

//   useEffect(() => {
//     return InteractionUI.fixTouchScreen({ target: T3.gl.domElement });
//   }, []);
//   //

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
  let { get } = useThree();

  let tex = useTexture(`/envmap/room.png`);
  tex.encoding = sRGBEncoding;
  tex.mapping = EquirectangularReflectionMapping;

  get().scene.background = tex;
  get().scene.environment = tex;

  get().gl.outputEncoding = sRGBEncoding;
  get().gl.physicallyCorrectLights = true;

  // get().scene.background = new Color("#000000");

  return (
    <group>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 30, 30]} intensity={3} />
    </group>
  );
  //
}
