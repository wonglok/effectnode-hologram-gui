import { Core } from "../Core";
import { RenderWorkBench } from "./RenderWorkBench";
import { CamRigFP } from "./CamRigFP";
import { GridHelper, Group } from "three";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export function SceneComposerRoot() {
  Core.makeKeyReactive("workspace");
  let { get } = useThree();
  useEffect(() => {
    let root = get().scene;
    let gh = new GridHelper(100, 50, "#f00", "#00f");
    gh.name = "Virtual Floor";
    gh.userData.hideFromTree = true;
    root.add(gh);
    return () => {
      root.remove(gh);
    };
  }, []);

  return (
    <group>
      <CamRigFP></CamRigFP>
      <RenderWorkBench workspace={"SceneComposer"}></RenderWorkBench>
    </group>
  );
}
