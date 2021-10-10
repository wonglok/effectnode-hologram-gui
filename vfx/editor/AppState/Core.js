// import { Scene } from "three";
import { makeShallowStore } from "../../utils/make-shallow-store";
import { makeETree } from "./ETree";
// import { makeArray } from "../../utils/make-array";
// import { Vector3 } from "three";
// import { fireDB, getMe } from "../../api/fire";
import { getID } from "../../utils/get-id";
// import { Object3D, PerspectiveCamera, Scene } from "three";

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
  fileTree: {
    children: [
      {
        id: getID(),
        name: "First Folder",
        parentId: null,
        children: [],
      },
    ],
  },
  columns: 1,
});

export const DBTypes = {
  Folder: "folder",
  UserCache: "user-cache",
};

export let createFolder = async ({ object, name, parentId = null }) => {
  object.children = object.children || [];
  object.children.push({
    id: getID(),
    name,
    parentId,
    children: [],
  });
  Core.reloadFileRoot++;
  Core.saveFileRoot++;
};

export let saveFolder = async ({ folder }) => {
  Core.reloadFileRoot++;
  Core.saveFileRoot++;
};

export let removeFolder = ({ object, folder }) => {
  //
  let idx = object.children.findIndex((e) => e.id === folder.id);

  let copy = object.children.slice();
  copy.splice(idx, 1);

  object.children = copy;

  Core.reloadFileRoot++;
  Core.saveFileRoot++;
};

export let streamFolderList = async (onClean) => {};
