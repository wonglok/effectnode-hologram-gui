import { TRoot } from "./TRoot";

export function RunTree() {
  let tree = {
    children: [
      {
        id: 1,
        name: "home",
        children: [],
      },
      {
        id: 7,
        name: "wasm",

        children: [
          {
            id: 5,
            name: "branch-A",
            children: [],
          },
        ],
      },
      {
        id: 2,
        name: "about",
        children: [
          {
            id: 3,
            name: "team",
            children: [],
          },
          {
            id: 4,
            name: "company",
            children: [],
          },
        ],
      },
    ],
  };

  return (
    <group>
      <TRoot roots={tree.children}></TRoot>
    </group>
  );
}
