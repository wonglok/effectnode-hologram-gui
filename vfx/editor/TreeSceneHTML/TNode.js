import { Core } from "../AppState/Core";

export function TNode({
  item,
  readonly,
  selected,
  hasChildren,
  level,
  onToggle,
}) {
  Core.makeKeyReactive("selectedTreeItem");
  //
  return (
    <div
      className={`group ${
        Core.selectedTreeItem === item.id ? "bg-green-200" : ""
      } flex items-center hover:bg-green-200 h-8 px-3 cursor-pointer`}
      onClick={() => {
        Core.selectedTreeItem = item.id;
      }}
    >
      <div style={{ paddingLeft: `${level * 18}px` }}></div>

      <div className=" border-l-2 border-red-500 pl-3">
        {item.name || item.type}{" "}
      </div>

      {hasChildren && (
        <div
          className={
            "ml-3 px-2 py-0 rounded-xl select-none " +
            " " +
            (selected ? "bg-green-300 " : "bg-green-100 ")
          }
          onClick={onToggle}
        >
          {selected ? <div>-</div> : <div>+</div>}
        </div>
      )}

      {!readonly && (
        <div className="hidden group-hover:inline-block">
          <div
            className={"ml-1 px-2 py-0 rounded-xl bg-blue-200 "}
            onClick={() => {
              //
            }}
          >
            Edit
          </div>
        </div>
      )}

      {/*  */}
    </div>
  );
}

//
