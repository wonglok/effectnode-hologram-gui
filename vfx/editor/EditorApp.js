import { useEffect, useMemo, useState } from "react";
import { TreeArraySample } from "../utils/tree-and-array";
import { EA } from "./EA";
import { SceneComposer } from "./SceneComposer";
import { ShadingEditor } from "./ShadingEditor";

export function EditorApp() {
  let spaces = useMemo(() => {
    return [
      {
        key: "SceneComposer",
        compo: <SceneComposer></SceneComposer>,
        label: "Scene Composer",
      },
      {
        key: "ShadingEditor",
        compo: <ShadingEditor></ShadingEditor>,
        label: "Shading",
      },
    ];
  });

  let [tab, setTab] = useState(null);

  useEffect(() => {
    TreeArraySample.run();

    let h = () => {
      let info = spaces.find((e) => e.key === EA.workspace);
      setTab(info);
    };
    h();
    return EA.onEvent("workspace", h);
  }, []);

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
          {spaces.map((e) => {
            return (
              <div
                key={e.key}
                className={`px-3 py-1 mr-2 rounded-tr-xl rounded-tl-xl cursor-pointer ${
                  EA.workspace === e.key ? "bg-green-200" : "bg-gray-100"
                }`}
                onClick={() => {
                  EA.workspace = e.key;
                }}
              >
                {e.label}
              </div>
            );
          })}
        </div>
      </div>
      <div className={"main-area w-full "}>{tab?.compo}</div>
      <div className="top-tool bg-gray-300 w-full flex items-center">
        <div className="flex items-center justify-end w-full px-2">
          EffectNode {new Date().getFullYear()} ©
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
