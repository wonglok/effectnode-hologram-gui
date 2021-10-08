// import { Scene } from "three";
import { makeShallowStore } from "../../utils/make-shallow-store";
import { ETree } from "../App/ETree";
// import { Object3D, PerspectiveCamera, Scene } from "three";

export const Core = makeShallowStore({
  canRender: true,
  workspace: "SceneComposer",
  reloadSpace: 0,
  selectedTreeItem: "",
  //
  tree: ETree,
  reloadContent: 0,
});
