import { useEffect, useMemo, useState } from "react";
// import { TreeArraySample } from "../utils/tree-and-array";
import { Core } from "../AppState/Core";
import { ProcedralContent } from "../VFXEditors/ProcedralContent";
import { SceneComposer } from "../VFXEditors/SceneComposer";
// import { ShadingEditor } from "./VFXEditors/ShadingEditor";

export function EditorApp() {
  Core.makeKeyReactive("workspace");

  let Compos = {
    SceneComposer,
    // ShadingEditor,
    ProcedralContent,
  };
  let cacheMap = useMemo(() => {
    return new Map();
  }, []);

  let makeFNC = (key) => {
    let Fnc = Compos[key];

    return <Fnc></Fnc>;
  };

  let makeCompo = (compoKey, cacheMap) => {
    if (cacheMap.has(compoKey)) {
      return cacheMap.get(compoKey);
    } else {
      let made = makeFNC(compoKey);
      cacheMap.set(compoKey, made);
      return cacheMap.get(compoKey);
    }
  };

  let spaceTabs = useMemo(() => {
    return [
      {
        key: "SceneComposer",
        label: "Scene Composer",
      },
      // {
      //   key: "ShadingEditor",
      //   label: "Shading",
      // },
      {
        key: "ProcedralContent",
        label: "Procedral Content",
      },
    ];
  });

  return (
    <div className="h-full w-full text-sm bg-gray-50 ">
      <div className="top-tool bg-gray-300 w-full flex justify-start px-2">
        <div
          className="inline-flex items-center h-full"
          style={{ width: "268px" }}
        >
          EffectNode
        </div>
        <div className="inline-flex items-end">
          {spaceTabs.map((e) => {
            return (
              <div
                key={e.key}
                className={`hover:bg-blue-300 flex items-center justify-center px-3 py-1 mr-2 rounded-tr-xl rounded-tl-xl cursor-pointer ${
                  Core.workspace === e.key
                    ? "bg-white text-black border-gray-200"
                    : "bg-gray-300 text-black border-t border-l border-r border-gray-200"
                }`}
                onClick={() => {
                  Core.workspace = e.key;
                }}
              >
                {e.label}

                {/* <CloseBtn
                  onClick={() => {
                    cacheMap.delete(e.key);
                    Core.reloadSpace++;
                  }}
                  cacheMap={cacheMap}
                  tab={e}
                ></CloseBtn> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className={"main-area w-full "}>
        {/*  */}
        {/*  */}
        {spaceTabs.map((e) => {
          return (
            <div
              key={e.key}
              style={{ display: e.key == Core.workspace ? "block" : "none" }}
              className="h-full w-full"
            >
              {makeCompo(e.key, cacheMap)}
            </div>
          );
        })}
      </div>

      {/*  */}

      <div className="top-tool bg-gray-300 w-full flex items-center">
        <div className="flex items-center justify-between w-full px-2">
          <div>樂樂出品必屬佳品! </div>
          <div>EffectNode {new Date().getFullYear()} ©</div>
        </div>
      </div>

      <style>{
        /* css */ `
          .top-tool {
            height: 35px;
          }
          .foot-tool {
            height: 35px;
          }
          .main-area {
            height: calc(100% - 35px * 2);
          }
        `
      }</style>
    </div>
  );
}

// function CloseBtn({ cacheMap, tab, onClick }) {
//   Core.makeKeyReactive("reloadSpace");
//   return (
//     <div className="inline-block" onClick={onClick}>
//       {cacheMap.has(tab.key) && (
//         <img
//           className="h-2 ml-2"
//           src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMuOTU0IDIxLjAzbC05LjE4NC05LjA5NSA5LjA5Mi05LjE3NC0yLjgzMi0yLjgwNy05LjA5IDkuMTc5LTkuMTc2LTkuMDg4LTIuODEgMi44MSA5LjE4NiA5LjEwNS05LjA5NSA5LjE4NCAyLjgxIDIuODEgOS4xMTItOS4xOTIgOS4xOCA5LjF6Ii8+PC9zdmc+"
//         ></img>
//       )}
//     </div>
//   );
// }
