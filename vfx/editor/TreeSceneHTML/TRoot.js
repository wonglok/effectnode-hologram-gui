import React from "react";

import { TBranch } from "./TBranch";

export const TRoot = function ({ roots = [] }) {
  return (
    <div>
      {roots.map((item, idx) => {
        return (
          <TBranch key={"TBranch" + item.id} idx={idx} item={item} level={0} />
        );
      })}
    </div>
  );
};
