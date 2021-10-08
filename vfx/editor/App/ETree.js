// let id = ;
// Tree Life
import { getID } from "../../utils/get-id";

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
