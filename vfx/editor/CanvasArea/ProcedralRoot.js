import { createPortal } from "@react-three/fiber";
import { Core } from "../Core";
import { RenderWorkBench } from "./RenderWorkBench";
import { Group } from "three";
import { useEffect } from "react";

export function ProcedralRoot() {
  // let o3d = new Group();
  // o3d.name = "Procedral Root";
  // useEffect(() => {
  //   Core.systemContent.add(o3d);
  //   return () => {
  //     Core.systemContent.remove(o3d);
  //   };
  // }, [o3d]);
  Core.makeKeyReactive("workspace");

  useEffect(() => {}, [Core.workspace]);

  return (
    <group>
      <RenderWorkBench workspace={"ProcedralContent"}></RenderWorkBench>
    </group>
  );
}
