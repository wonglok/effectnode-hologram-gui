// import { Scene } from "three";
import {
  makeShallowStore,
  ShallowStoreMethods,
} from "../../utils/make-shallow-store";
import { makeETree } from "./ETree";

import { getID } from "../../utils/get-id";
import { fileTree } from "./AssetBrowser";
// import { makeArray } from "../../utils/make-array";
// import { Vector3 } from "three";
// import { fireDB, getMe } from "../../api/fire";
// import { Object3D, PerspectiveCamera, Scene } from "three";

let internal = () => {
  return {
    canRender: true,
    workspace: "SceneComposer",
    reloadSpace: 0,
    selectedTreeItem: "",
    tree: makeETree(),
    reloadContent: 0,
    //
    //
    //
    reloadFileRoot: 0,
    saveFileRoot: 0,
    selectedFileItem: "",
    columns: 1,
  };
};

let inside = internal();

let Type = { ...inside, ...ShallowStoreMethods };

/** @type {Type} */
export const Core = makeShallowStore(inside);
