// import { useEffect } from "react";
import { Core } from "../AppState/Core";
import { TRoot } from "./TRoot";

export function RunTreeHTML({ readonly = false, root }) {
  Core.makeKeyReactive("reloadContent");

  // useEffect(() => {
  //   let last = 0;
  //   let now = 0;
  //   let tt = setInterval(() => {
  //     root.traverse(() => {
  //       now++;
  //     });
  //     if (last !== 0 && now !== 0 && last !== now) {
  //       setTimeout(() => {
  //         Core.reloadContent++;
  //       });
  //     } else {
  //     }
  //     last = now;
  //   }, 100);

  //   return () => {
  //     clearInterval(tt);
  //   };
  // }, []);

  return (
    <div>
      <TRoot readonly={readonly} roots={Core.tree.children}></TRoot>
    </div>
  );
}
