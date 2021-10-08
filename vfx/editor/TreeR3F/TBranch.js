import React from "react";

import { TNode } from "./TNode";

export function TBranch({ item, level }) {
  const hasChildren = item.children && item.children.length !== 0;

  const renderBranches = () => {
    if (hasChildren) {
      const newLevel = level + 1;

      return item.children.map((child) => {
        return (
          <TBranch key={"branch" + child.id} item={child} level={newLevel} />
        );
      });
    }

    return null;
  };

  return (
    <group
      position={item.position || [0, 0, 0]}
      scale={item.scale || [1, 1, 1]}
      rotation={item.rotation || [0, 0, 0]}
    >
      <TNode item={item} hasChildren={hasChildren} level={level} />
      {renderBranches()}
    </group>
  );
}
