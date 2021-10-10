import { useEffect, useState } from "react";
import { Core, removeFolder, saveFolder } from "../../AppState/Core";
import { CreateFolder } from "./CreateFolder";

export function ColumnView({
  panelHeight,
  inc = 0,
  fileTree,
  parentID = null,
}) {
  Core.makeKeyReactive("reloadFileRoot");
  let [nextTree, setNextTree] = useState(false);

  useEffect(() => {
    Core.columns += 1;
    return () => {
      Core.columns -= 1;
    };
  }, []);
  useEffect(() => {
    setNextTree(false);
  }, [parentID]);

  return (
    <>
      <div
        style={{
          width: 280 + "px",
        }}
        className="float-left border-r border-black"
      >
        <CreateFolder
          object={fileTree}
          defaultName={"new folder " + fileTree.children.length}
          parentId={parentID}
        ></CreateFolder>

        <div
          style={{
            height: `${panelHeight - 35}px`,
            overflowY: "scroll",
          }}
          className="py-3"
        >
          {fileTree.children.map((k) => {
            return (
              <div
                key={k.id}
                onClick={() => {
                  setNextTree(k);
                }}
                className={`${nextTree.id === k.id ? "bg-green-300" : ""}`}
              >
                <FolderEntry
                  onSelect={() => {
                    setNextTree(k);
                    Core.reloadFileRoot++;
                  }}
                  onRemove={({}) => {
                    removeFolder({ object: fileTree, folder: k });
                    setNextTree(false);
                  }}
                  folder={k}
                ></FolderEntry>
              </div>
            );
          })}
        </div>
      </div>

      {nextTree && (
        <>
          {
            <ColumnView
              panelHeight={panelHeight}
              inc={inc + 1}
              fileTree={nextTree}
              parentID={nextTree.id}
            ></ColumnView>
          }
        </>
      )}
    </>
  );
}

export function FolderEntry({
  folder,
  onSelect = () => {},
  onRemove = () => {},
}) {
  let [mode, setMode] = useState("display");

  return (
    <div
      className="inline-flex w-full items-center group"
      onKeyDownCapture={(e) => {
        e.stopPropagation();
      }}
    >
      {mode === "display" && (
        <>
          <div className="border border-transparent px-1 mx-1 w-32 my-1 whitespace-pre-wrap">
            {folder.name}
          </div>

          <button
            className=" border border-black px-1 mx-1 w-10 my-1 hidden group-hover:block"
            onClick={() => {
              //
              //
              onSelect();
            }}
          >
            Open
          </button>

          <button
            className=" border border-black px-1 mx-1 w-20 my-1 hidden group-hover:block"
            onClick={() => {
              //
              setMode("edit");
            }}
          >
            Rename
          </button>
          <button
            className=" border border-black px-1 mx-1 w-20 my-1 hidden group-hover:block"
            onClick={() => {
              //
              onRemove({ folder });
            }}
          >
            Remove
          </button>
        </>
      )}
      {mode === "edit" && (
        <>
          <textarea
            rows={1}
            className="border border-black px-1 mx-1 w-32 my-1"
            defaultValue={folder.name}
            // ownerName
            // ownerName
            onInput={({ target: { value } }) => {
              folder.name = value;
            }}
            placeholder={"new folder name"}
          />

          <button
            className=" border border-black px-1 mx-1 w-32 my-1"
            onClick={() => {
              try {
                saveFolder({ folder });
                setMode("display");
              } catch (e) {
                console.log(e);
              }
            }}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}

//
