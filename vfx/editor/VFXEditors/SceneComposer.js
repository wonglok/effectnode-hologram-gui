import { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import { CanvasArea } from "../CanvasArea/CanvasArea";
// import { SceneComposerCamRigFP } from "../CanvasArea/SceneComposerCamRigFP";
import { SceneComposerRoot } from "../CanvasArea/SceneComposerRoot";
import { Outline } from "../Outline/Outline";
import { ToolPanel } from "../ToolPanel/ToolPanel";

export function SceneComposer() {
  let [splitAreaHeight, setSplitAreaHeight] = useState(1024);
  let [canvasHeightMax, canvasHeightMaxSetter] = useState(700);

  useEffect(() => {
    let h = () => {
      setSplitAreaHeight(window.innerHeight - 35 * 2);
      canvasHeightMaxSetter(window.innerHeight - 280);
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
        defaultSize={275} // toolbox width
        style={{ height: `${splitAreaHeight}px` }}
      >
        <SplitPane split="horizontal" defaultSize={280}>
          <div className="w-full h-full bg-gray-100">
            <Outline></Outline>
          </div>
          <div className="w-full h-full bg-gray-100">
            <ToolPanel></ToolPanel>
          </div>
        </SplitPane>
        <SplitPane split="horizontal" defaultSize={canvasHeightMax}>
          <div className="w-full h-full bg-white">
            <CanvasArea>
              {/*  */}
              <SceneComposerRoot></SceneComposerRoot>
              {/*  */}
            </CanvasArea>
          </div>
          <div className="w-full h-full bg-gray-100">Asset Browser</div>
        </SplitPane>
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
