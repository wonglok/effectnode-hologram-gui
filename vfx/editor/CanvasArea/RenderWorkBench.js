import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Core } from "../Core";
import { SelectiveBlooming } from "./SelectiveBlooming";

export function RenderWorkBench({ workspace = "workspace" }) {
  //

  let { get, set } = useThree();

  useEffect(() => {
    return Core.onEvent("workspace", () => {
      if (Core.workspace === workspace) {
        console.log("ON", workspace);
        set({
          frameloop: "always",
        });
      } else {
        console.log("OFF", workspace);
        set({
          frameloop: "never",
        });
      }
    });
  }, [workspace]);

  return (
    <group>
      {/* <SelectiveBlooming
        gl={get().gl}
        scene={get().scene}
        camera={get().camera}
      ></SelectiveBlooming> */}
    </group>
  );
}
