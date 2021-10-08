// import { Scene } from "three";
import { makeShallowStore } from "../utils/make-shallow-store";
import { getID } from "../utils/get-id";
import { Object3D, PerspectiveCamera, Scene } from "three";

// let id = ;
// Tree Life
export const ETree = {
  children: [
    {
      id: getID(),
      name: "home",
      runID: "",
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      position: [0, 0, 0],
      children: [],
    },
    {
      id: getID(),
      name: "wasm",
      runID: "",
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      position: [0, 0, 0],
      children: [
        {
          id: getID(),
          name: "branch-A",
          runID: "",
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          position: [0, 0, 0],
          children: [
            {
              id: getID(),
              name: "about",
              runID: "",
              rotation: [0, 0, 0],
              scale: [1, 1, 1],
              position: [0, 0, 0],
              children: [
                {
                  id: getID(),
                  name: "team",
                  runID: "",
                  rotation: [0, 0, 0],
                  scale: [1, 1, 1],
                  position: [0, 0, 0],
                  children: [],
                },
                {
                  id: getID(),
                  name: "company",
                  runID: "",
                  rotation: [0, 0, 0],
                  scale: [1, 1, 1],
                  position: [0, 0, 0],
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const Core = makeShallowStore({
  canRender: true,
  workspace: "SceneComposer",
  reloadSpace: 0,
  selectedTreeItem: "",
  //
  tree: ETree,
  reloadContent: 0,
});
