export function TNode({
  item,
  selected,
  hasChildren,
  level,
  onToggle,
  idx,
  height,
}) {
  return (
    <div className="mb-2">
      <span>{item.name}</span>

      {item.type === "mesh" && (
        <span>
          <span className={"px-2 py-1 rounded-xl bg-purple-200 "}>Geo</span>
          <span className={"px-2 py-1 rounded-xl bg-blue-200 "}>Mat</span>
        </span>
      )}

      {hasChildren && (
        <span
          className={
            "ml-3 px-2 py-1 rounded-xl " +
            " " +
            (selected ? "bg-green-200 " : "bg-gray-200 ")
          }
          onClick={onToggle}
        >
          {selected ? <span>Hide</span> : <span>Expand</span>}
        </span>
      )}
    </div>
  );
}
