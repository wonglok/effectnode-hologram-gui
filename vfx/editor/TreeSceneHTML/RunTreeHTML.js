import { ETree } from "../EA";
import { TRoot } from "./TRoot";

export function RunTreeHTML() {
  let tree = ETree;

  return (
    <div>
      <TRoot roots={tree.children}></TRoot>
    </div>
  );
}
