import { useEffect } from "react";
import { AssetFiles } from "../../AppState/AssetBrowser";
import { Core } from "../../AppState/Core";
import { ColumnView } from "./ColumnView";
import { PreviewColumn } from "./PreviewColumn";

export function ColumnGroup({ panelHeight }) {
  Core.makeKeyReactive("saveFileRoot");
  Core.makeKeyReactive("columns");

  return (
    <div className="w-full overflow-x-auto border-t border-black">
      <AutoSaver />
      <div className="text-xs" style={{ width: `${Core.columns * 280}px` }}>
        {/*  */}
        {/*  */}
        {/*  */}
        <ColumnView
          panelHeight={panelHeight}
          fileTree={AssetFiles.tree}
        ></ColumnView>
        <PreviewColumn></PreviewColumn>
      </div>
    </div>
  );
}

function AutoSaver() {
  //
  Core.makeKeyReactive("saveFileRoot");

  useEffect(() => {
    //
    //
    //
    //
  }, [Core.saveFileRoot]);
  //
  return null;
}
