import { useEffect } from "react";
import { Core } from "../../AppState/Core";
import { ColumnView } from "./ColumnView";
import { PreviewColumn } from "./PreviewColumn";

export function ColumnGroup({ panelHeight }) {
  Core.makeKeyReactive("files");
  Core.makeKeyReactive("columns");

  return (
    <div className="w-full overflow-x-auto">
      <AutoSaver />
      <div className="text-xs" style={{ width: `${Core.columns * 280}px` }}>
        {/*  */}
        {/*  */}
        {/*  */}
        <ColumnView
          panelHeight={panelHeight}
          fileTree={Core.fileTree}
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
