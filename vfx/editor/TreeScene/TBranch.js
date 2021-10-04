import React, { useState } from "react";

import { TNode } from "./TNode";

export function TBranch({ item, level, idx = 0 }) {
  const hasChildren = item.children && item.children.length !== 0;

  const renderBranches = () => {
    if (hasChildren) {
      const newLevel = level + 1;

      return item.children.map((child, idx) => {
        return (
          <TBranch
            key={"branch" + child.id}
            idx={idx}
            item={child}
            level={newLevel}
          />
        );
      });
    }

    return null;
  };

  return (
    <group position={item.position || [0, 0, 0]}>
      <TNode item={item} hasChildren={hasChildren} level={level} />
      {renderBranches()}
    </group>
  );
}
