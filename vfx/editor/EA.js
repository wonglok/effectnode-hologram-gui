import { Scene } from "three";
import { makeShallowStore } from "../utils/make-shallow-store";

export const EA = makeShallowStore({
  workspace: "SceneComposer",
});

export const ETree = {
  children: [
    {
      id: 1,
      name: "home",
      execID: "",
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      position: [0, 0, 0],
      children: [],
    },
    {
      id: 7,
      name: "wasm",
      execID: "",
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      position: [0, 0, 0],
      children: [
        {
          id: 5,
          name: "branch-A",
          execID: "",
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          position: [1, 0, 0],
          children: [],
        },
      ],
    },
    {
      id: 2,
      name: "about",
      execID: "",
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      position: [0, 0, 0],
      children: [
        {
          id: 3,
          name: "team",
          execID: "",
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          position: [0, 0, 0],
          children: [],
        },
        {
          id: 4,
          name: "company",
          execID: "",
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          position: [0, 0, 0],
          children: [],
        },
      ],
    },
  ],
};
