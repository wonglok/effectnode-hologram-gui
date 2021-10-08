import React, { useState } from "react";

import { Core } from "../AppState/Core";
import { TNode } from "./TNode";

export function TBranch({ item, level, readonly, idx = 0 }) {
  const [expanded, setExpand] = useState(item.selected || true);

  const hasChildren = item.children && item.children.length !== 0;

  const renderBranches = () => {
    if (hasChildren) {
      const newLevel = level + 1;

      return item.children
        .filter((kid) => {
          if (kid?.userData?.hideFromTree) {
            return false;
          }

          return true;
        })
        .map((child, idx) => {
          return (
            <TBranch
              key={"branch" + child.id}
              idx={idx}
              item={child}
              readonly={readonly}
              level={newLevel}
            />
          );
        });
    }

    return null;
  };

  const toggleSelected = () => {
    setExpand((prev) => !prev);
    Core.selectedTreeItem = item.id;
  };

  return (
    <div>
      {!(item?.userData?.isSystemContent || item?.userData?.hideFromTree) && (
        <TNode
          readonly={readonly}
          item={item}
          selected={expanded}
          hasChildren={hasChildren}
          level={level}
          onToggle={toggleSelected}
        />
      )}

      {expanded && renderBranches()}
    </div>
  );
}
