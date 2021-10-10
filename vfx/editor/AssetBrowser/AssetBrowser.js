import { ColumnGroup } from "./FileTree/ColumnGroup";

export function AssetBrowser({ panelHeight = 280 }) {
  return (
    <div className="">
      <ColumnGroup panelHeight={panelHeight}></ColumnGroup>
    </div>
  );
}
