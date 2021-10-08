import { Canvas, createPortal, useThree } from "@react-three/fiber";
// import { Suspense, useMemo } from "react";
// import { Core } from "../AppState/Core";
// // import { Color } from "three";
import { RunTreeR3F } from "../TreeR3F/RunTreeR3F";
// import { CanvasContent } from "./CanvasContent";
// import { Loading } from "./Loading";

export function CanvasArea({ children }) {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 3]}
        gl={{ alpha: true, antialias: true }}
        performance={{ min: 0.5 }}
      >
        {children}
        <RunTreeR3F></RunTreeR3F>
      </Canvas>
    </div>
  );
}

//
