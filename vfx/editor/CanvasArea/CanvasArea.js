import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { Color } from "three";
import { RunTreeR3F } from "../TreeR3F/RunTreeR3F";

export function CanvasArea() {
  return (
    <div className="w-full h-full">
      <Canvas
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
  let { get } = useThree();
  get().scene.background = new Color("#000000");

  return (
    <group>
      <RunTreeR3F></RunTreeR3F>
    </group>
  );
}
