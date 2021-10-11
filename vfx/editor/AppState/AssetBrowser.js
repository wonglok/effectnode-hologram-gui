import { Core } from "./Core";
import { getID } from "../../utils/get-id";

export let createNode = async ({ object, name, parentId = null }) => {
  object.children = object.children || [];
  object.children.push({
    id: getID(),
    name,
    parentId,
    children: [],
  });
  Core.saveFileRoot++;
};

export let saveNode = async ({ folder }) => {
  Core.saveFileRoot++;
};

export let removeNode = ({ object, folder }) => {
  //
  let idx = object.children.findIndex((e) => e.id === folder.id);

  let copy = object.children.slice();
  copy.splice(idx, 1);

  object.children = copy;

  Core.saveFileRoot++;
};

export const makeTree = () => {
  return {
    children: [
      {
        id: getID(),
        name: "First Folder...",
        parentId: null,
        children: [],
      },
    ],
  };
};

export const AssetFiles = {
  core: {
    children: [],
  },

  get tree() {
    return AssetFiles.core;
  },

  set tree(v) {
    AssetFiles.core = v;
    Core.saveFileRoot++;
  },

  change: () => {},
};
