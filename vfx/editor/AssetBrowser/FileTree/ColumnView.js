import { useEffect, useState } from "react";
import { removeNode, saveNode } from "../../AppState/AssetBrowser";
import { Core } from "../../AppState/Core";
import { CreateFolder } from "./CreateFolder";

export function ColumnView({
  panelHeight,
  inc = 0,
  fileTree,
  parentID = null,
}) {
  Core.makeKeyReactive("reloadFileRoot");
  let [nextTree, setNextTree] = useState(false);
  let [mode, setMode] = useState("ready");

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
          height: `${panelHeight - 40}px`,
          overflowY: "scroll",
          width: 280 + "px",
        }}
        className="float-left border-r border-black"
      >
        {/*  */}
        <CreateFolder
          object={fileTree}
          defaultName={"new folder " + fileTree.children.length}
          parentId={parentID}
        ></CreateFolder>

        <div style={{}} className="py-3">
          {fileTree.children.map((k) => {
            return (
              <div
                key={k.id}
                className={`${
                  nextTree.id === k.id ? "bg-green-300" : " hover:bg-green-200"
                }`}
              >
                <FolderEntry
                  onSelect={() => {
                    setNextTree(false);
                    setTimeout(() => {
                      setNextTree(k);
                      Core.reloadFileRoot++;
                    });
                  }}
                  //
                  onRemove={({}) => {
                    removeNode({ object: fileTree, folder: k });
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
      onClick={() => {
        onSelect();
      }}
    >
      {mode === "display" && (
        <>
          {/*  */}
          <div
            onClick={() => {
              onSelect();
            }}
            className="border border-transparent px-1 mx-1 w-32 my-1 whitespace-pre-wrap"
          >
            {folder.name}
          </div>

          {/* <button
            className=" border border-black px-1 mx-1 w-10 my-1 hidden group-hover:block"
            onClick={() => {
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
          </button> */}
        </>
      )}

      {/*  */}
      {/*  */}
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
                saveNode({ folder });
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
