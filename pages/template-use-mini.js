import { Text, useProgress } from "@react-three/drei";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Color, Object3D } from "three";
import { InteractionUI } from "../vfx/classes/InteractionUI";
import { Mini } from "../vfx/classes/Mini";
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

function Content() {
  let T3 = useThree();

  let mini = useMemo(() => {
    return new Mini({});
  }, []);

  useFrame(() => {
    mini.work();
  });
  let o3d = new Object3D();

  // let sim = useMemo(() => {
  //   return new Simulation({ mini });
  // }, []);

  useEffect(() => {
    T3.get().scene.background = new Color("#000000");

    for (let kn in T3) {
      mini.set(kn, T3[kn]);
    }
  }, []);

  useEffect(() => {
    return InteractionUI.fixTouchScreen({ target: T3.gl.domElement });
  }, []);
  //

  //st

  return (
    <group>
      {/* {createPortal(<primitive object={anyo3d} />, o3d)} */}

      <primitive object={o3d} />

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
