import { useEffect, useMemo, useState } from "react";
import { getObjectByID, traverse } from "../../utils/tree-and-array";
import { Core } from "../AppState/Core";

export function LayoutPanel() {
  let [selected, setActive] = useState(false);

  Core.makeKeyReactive("selectedTreeItem");
  useEffect(() => {
    let obj = getObjectByID(Core.tree, Core.selectedTreeItem);
    setActive(obj);
  }, [Core.selectedTreeItem]);

  return (
    <div>
      {selected && <Selected selected={selected} />}
      {/* <div>{JSON.stringify(selected, null, "  ")}</div> */}
      {/* 134 */}
    </div>
  );
}

function Selected({ selected }) {
  return (
    <div>
      <div></div>
    </div>
  );
}

//

//

//

//
