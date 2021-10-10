import { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import { AssetBrowser } from "../AssetBrowser/AssetBrowser";
import { CanvasArea } from "../CanvasArea/CanvasArea";
// import { SceneComposerCamRigFP } from "../CanvasArea/SceneComposerCamRigFP";
import { SceneComposerRoot } from "../CanvasArea/SceneComposer/SceneComposerRoot";
import { Outline } from "../Outline/Outline";
import { ToolPanel } from "../ToolPanel/ToolPanel";

export function SceneComposer() {
  let [hh, setHH] = useState(1024);
  let [ww, setWW] = useState(700);
  let [boxH, setBoxH] = useState(280);
  let [assetBrowserH, setAssetBrowserH] = useState(280);

  useEffect(() => {
    let h = () => {
      setHH(window.innerHeight);
      setWW(window.innerWidth);
    };
    h();

    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("resize", h);
    };
  }, []);

  let tt = 0;
  let onChange = (v) => {
    clearTimeout(tt);
    tt = setTimeout(() => {
      setBoxH(v);
    }, 50);
  };

  return (
    <div className="w-full h-full">
      <SplitPane
        //
        split="vertical"
        defaultSize={275} // toolbox width
        style={{ height: `${hh - 35 * 2}px`, width: `${ww}px` }}
      >
        <SplitPane onChange={onChange} split="horizontal" defaultSize={boxH}>
          <div className="w-full h-full bg-gray-100">
            <Outline></Outline>
          </div>
          <div className="w-full h-full bg-gray-100">
            <ToolPanel height={hh - 35 * 2 - boxH}></ToolPanel>
          </div>
        </SplitPane>
        <SplitPane
          onChange={(upper) => {
            setAssetBrowserH(hh - 35 * 2 - upper);
          }}
          split="horizontal"
          defaultSize={hh - 300}
        >
          <div className="w-full h-full bg-white">
            <CanvasArea>
              {/*  */}
              <SceneComposerRoot></SceneComposerRoot>
              {/*  */}
            </CanvasArea>
          </div>
          <div className="w-full h-full bg-gray-100">
            <AssetBrowser panelHeight={assetBrowserH}></AssetBrowser>
            {/* Asset Browser */}
          </div>
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
