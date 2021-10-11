import { useEffect, useState } from "react";
import { Core } from "../../AppState/Core";
import { createNode } from "../../AppState/AssetBrowser";
export function CreateFolder({
  object,
  defaultName = "MyNewFolder",
  parentId = null,
}) {
  Core.makeKeyReactive("files");
  let [txt, setTxt] = useState(defaultName || "New Sub Folder");

  useEffect(() => {
    setTxt(defaultName || "New Sub Folder");
  }, [defaultName]);

  return (
    <div className="flex items-center border-b border-black">
      <textarea
        onKeyDownCapture={(e) => {
          e.stopPropagation();
        }}
        rows={1}
        className="border border-black px-1 mx-1 w-32 my-2"
        value={txt}
        // ownerName
        onInput={({ target: { value } }) => {
          setTxt(value);
        }}
        placeholder={"new folder name"}
      />

      <button
        className=" border border-black px-1 mx-1 w-23 my-2"
        onClick={() => {
          try {
            createNode({ object: object, name: txt, parentId });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Create Folder
      </button>
    </div>
  );
}

//
