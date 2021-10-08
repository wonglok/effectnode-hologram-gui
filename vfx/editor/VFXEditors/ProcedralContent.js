import { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import { CanvasArea } from "../CanvasArea/CanvasArea";
import { ProcedralRoot } from "../CanvasArea/ProcedralRoot";
// import { Outline } from "../Outline/Outline";

// import { SceneComposerCamRigFP } from "./CanvasArea/SceneComposerCamRigFP";
// import { ToolPanel } from "./ToolPanel/ToolPanel";

export function ProcedralContent() {
  let [ww, setWW] = useState(700);
  let [hh, setHH] = useState(700);

  useEffect(() => {
    let h = () => {
      setWW(window.innerWidth);
      setHH(window.innerHeight);
    };
    h();

    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("resize", h);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <SplitPane
        //
        split="vertical"
        defaultSize={ww / 2}
        style={{ height: `${hh - 35 * 2}px` }}
      >
        {/* <SplitPane split="horizontal" defaultSize={280}>
          <div className="w-full h-full bg-gray-100">
            <Outline></Outline>
          </div>
          <div>
          </div>
        </SplitPane>
        <SplitPane split="vertical" defaultSize={canvasHeightMax}> */}
        {/* </SplitPane> */}

        <div className=" h-full bg-white">
          <CanvasArea>
            <ProcedralRoot></ProcedralRoot>
          </CanvasArea>
        </div>
        <div className=" h-full bg-gray-100">Procedral Graph</div>
      </SplitPane>

      <style>
        {
          /* css */ `


          .Resizer {
            background: #000;
            opacity: 0.2;
            z-index: 1;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -moz-background-clip: padding;
            -webkit-background-clip: padding;
            background-clip: padding-box;
          }

          .Resizer:hover {
            -webkit-transition: all 2s ease;
            transition: all 2s ease;
          }

          .Resizer.horizontal {
            height: 11px;
            margin: -5px 0;
            border-top: 5px solid rgba(255, 255, 255, 0);
            border-bottom: 5px solid rgba(255, 255, 255, 0);
            cursor: row-resize;
            width: 100%;
          }

          .Resizer.horizontal:hover {
            border-top: 5px solid rgba(0, 0, 0, 0.5);
            border-bottom: 5px solid rgba(0, 0, 0, 0.5);
          }

          .Resizer.vertical {
            width: 11px;
            margin: 0 -5px;
            border-left: 5px solid rgba(255, 255, 255, 0);
            border-right: 5px solid rgba(255, 255, 255, 0);
            cursor: col-resize;
          }

          .Resizer.vertical:hover {
            border-left: 5px solid rgba(0, 0, 0, 0.5);
            border-right: 5px solid rgba(0, 0, 0, 0.5);
          }
          .Resizer.disabled {
            cursor: not-allowed;
          }
          .Resizer.disabled:hover {
            border-color: transparent;
          }
        `
        }
      </style>
    </div>
  );
}
