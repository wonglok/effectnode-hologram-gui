import { Core } from "../Core";
import { RunTreeHTML } from "../TreeSceneHTML/RunTreeHTML";

export function Outline() {
  return (
    <div className={"overflow-y-scroll h-full"}>
      <div className=" cursor-default my-2 px-2">3D Layout & Content:</div>
      <RunTreeHTML root={Core.scene}></RunTreeHTML>
    </div>
  );
}

// // mini engine
