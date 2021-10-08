// import { traverse } from "../../utils/tree-and-array";
import { Object3D } from "three";
import { Core } from "../AppState/Core";
import { TRoot } from "./TRoot";
import { createPortal } from "@react-three/fiber";

export function RunTreeR3F() {
  // console.log(traverse(ETree, (v) => console.log(v)));

  return (
    <group name="managedLayout">
      <TRoot roots={Core.tree.children}></TRoot>
    </group>
  );
}
