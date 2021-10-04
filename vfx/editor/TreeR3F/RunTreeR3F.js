import { ETree } from "../EA";
import { TRoot } from "./TRoot";

export function RunTreeR3F() {
  return (
    <group>
      <TRoot roots={ETree.children}></TRoot>
    </group>
  );
}
