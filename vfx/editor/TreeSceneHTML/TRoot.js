import React from "react";

import { TBranch } from "./TBranch";

export const TRoot = function ({ readonly, roots = [] }) {
  return (
    <div>
      {roots.map((item, idx) => {
        return (
          <TBranch
            key={"TBranch" + item.id}
            readonly={readonly}
            idx={idx}
            item={item}
            level={0}
          />
        );
      })}
    </div>
  );
};

//

//

//
