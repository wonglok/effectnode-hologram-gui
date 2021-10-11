// import { Scene } from "three";
import { makeShallowStore } from "../../utils/make-shallow-store";
import { makeETree } from "./ETree";
// import { makeArray } from "../../utils/make-array";
// import { Vector3 } from "three";
// import { fireDB, getMe } from "../../api/fire";
import { getID } from "../../utils/get-id";
// import { Object3D, PerspectiveCamera, Scene } from "three";
import { fileTree } from "./AssetBrowser";

export const Core = makeShallowStore({
  canRender: true,
  workspace: "SceneComposer",
  reloadSpace: 0,
  selectedTreeItem: "",
  tree: makeETree(),
  reloadContent: 0,
  //
  //
  //
  //
  //
  reloadFileRoot: 0,
  saveFileRoot: 0,
  selectedFileItem: "",
  columns: 1,
});

export const DBTypes = {
  Folder: "folder",
  UserCache: "user-cache",
};
