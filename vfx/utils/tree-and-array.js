export const NULL_OID = false;

let flatten = (
  children,
  extractChildren,
  level = 0,
  parentId,
  primaryKN = "id",
  parentKN = "parentId"
) =>
  Array.prototype.concat.apply(
    children.map((x) => ({
      ...x,
      level: level || 1,
      [parentKN]: parentId || NULL_OID,
    })),
    children.map((x) =>
      flatten(
        extractChildren(x) || [],
        extractChildren,
        (level || 1) + 1,
        x[primaryKN],
        primaryKN,
        parentKN
      )
    )
  );

let extractChildren = (x) => x.children;

export function treeToArray(
  tree = { children: [] },
  primaryKN = "id",
  parentKN = "parentId"
) {
  let treeToArrayResult = flatten(
    extractChildren(tree),
    extractChildren,
    0,
    NULL_OID,
    primaryKN,
    parentKN
  ).map((x) => {
    delete x.children;
    delete x.level;

    return x;
  });

  return treeToArrayResult;
}

// ------------

export function arrayToTree(list, primaryKN = "id", parentKN = "parentId") {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i][primaryKN]] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];

    if (
      node[parentKN] &&
      map[node[parentKN]] &&
      list[map[node[parentKN]]] &&
      list[map[node[parentKN]]].children &&
      list[map[node[parentKN]]].children.push
    ) {
      // if (node[parentKN] !== NULL_OID) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node[parentKN]]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return {
    children: roots,
  };
}

export const traverse = (object, fnc) => {
  if (object) {
    fnc(object);
  }
  if (object.children && object.children.length > 0) {
    object.children.forEach((k) => {
      traverse(k, fnc);
    });
  }
};

export const getObjectByName = (object, name) => {
  let list = [];
  traverse(object, (item) => {
    list.push(item);
  });
  return list.find((i) => i.name === name);
};

export const getObjectByID = (object, id) => {
  let list = [];
  traverse(object, (item) => {
    list.push(item);
  });
  return list.find((i) => i.id === id);
};

//-----

export class TreeArraySample {
  static run() {
    let tree = {
      children: [
        {
          id: 1,
          title: "home",
          parentId: NULL_OID,
          children: [],
        },
        {
          id: 2,
          title: "about",
          parentId: NULL_OID,
          children: [
            {
              id: 3,
              title: "team",
              parentId: 2,
              children: [],
            },
            {
              id: 4,
              title: "company",
              parentId: 2,
              children: [
                {
                  id: 6,
                  title: "branch-A",
                  parentId: 4,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 7,
          title: "PR",
          parentId: NULL_OID,
          children: [],
        },
      ],
    };

    let log = (...v) => console.log(JSON.stringify(v, null, "  "));

    log("original", tree);

    let array = treeToArray(tree, "id", "parentId");

    log("array", array);

    let tree2 = arrayToTree(array, "id", "parentId");

    log("restored", tree2);

    //
    console.log(
      JSON.stringify(tree, null, "  ") === JSON.stringify(tree2, null, "  ")
    );
  }
}
