import React, { useState } from "react";

import { TNode } from "./TNode";

export function TBranch({ item, level, idx = 0 }) {
  const [selected, setSelected] = useState(item.selected ?? false);

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

  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };

  return (
    <group position={[level * 0.3 + 0.3 * idx, -0.3 * level, 0]}>
      <TNode
        item={item}
        selected={selected}
        hasChildren={hasChildren}
        level={level}
        onToggle={toggleSelected}
      />

      {selected && renderBranches()}
    </group>
  );
}
