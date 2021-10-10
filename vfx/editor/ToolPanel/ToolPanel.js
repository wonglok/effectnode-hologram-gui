import { useEffect, useMemo, useRef, useState } from "react";
import { makeShallowStore } from "../../utils/make-shallow-store";
import { LayoutPanel } from "./LayoutPanel";
import { SettingsPanel } from "./SettingsPanel";

const UI = makeShallowStore({
  tabs: "layout",
});

export function ToolPanel({ height }) {
  let ref = useRef();

  return (
    <div
      ref={ref}
      style={{ height: `${height}px` }}
      className="w-full relative"
    >
      <Tabs></Tabs>
      <Tools></Tools>
    </div>
  );
}

function Tabs() {
  return (
    <div style={{ height: `43px` }} className="w-full bg-gray-300">
      <TabIcon
        UI={UI}
        tab="layout"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTggMTAuMDMxdi02LjQyM2wtNi4wMzYtMy42MDgtNS45NjQgMy41Njl2Ni40OTlsLTYgMy4yMjR2Ny4yMTZsNi4xMzYgMy40OTIgNS44NjQtMy4zOTMgNS44NjQgMy4zOTMgNi4xMzYtMy40OTJ2LTcuMTc3bC02LTMuM3ptLTEuMTQzLjAzNmwtNC4zMjEgMi4zODR2LTQuOTU2bDQuMzIxLTIuNTM5djUuMTExem0tNC44OTUtOC43MWw0LjI3MiAyLjU5Ni00LjI2OCAyLjUwOS00LjE3Ni0yLjU1NCA0LjE3Mi0yLjU1MXptLS41NjkgNi4xMzR2NC45NmwtNC4yNS0yLjQyMXYtNS4xMzRsNC4yNSAyLjU5NXptLTUuODMgMTQuODQybC00LjQyMS0yLjUzOXYtNS4xNzZsNC40MjEgMi41OTV2NS4xMnptLTMuNzczLTguNzAybDQuNzc4LTIuNTMgNC4yMzcgMi40MTctNC42NjggMi42NjctNC4zNDctMi41NTR6bTQuOTE3IDMuNTg3bDQuNzIyLTIuNjk3djUuMDU2bC00LjcyMiAyLjc1N3YtNS4xMTZ6bTEwLjU4NiA1LjExNWwtNC43MjItMi43NTd2LTUuMTE2bDQuNzIyIDIuNzU0djUuMTE5em0tNC4wNzQtOC44NjFsNC4yNDctMi4zOSA0Ljc2OSAyLjU5NC00LjM2NyAyLjUwOS00LjY0OS0yLjcxM3ptOS42MzggNi4zMjNsLTQuNDIxIDIuNTM5di01LjExNmw0LjQyMS0yLjUzOHY1LjExNXoiLz48L3N2Zz4="
      ></TabIcon>
      <TabIcon
        UI={UI}
        tab="runners"
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAyM2gtMjJ2LTIwaDIydjIwem0tMS0xNGgtMjB2MTNoMjB2LTEzem0tMS03aC0yMXYxOWgtMXYtMjBoMjJ2MXptMSAyaC0yMHY0aDIwdi00eiIvPjwvc3ZnPg=="
      ></TabIcon>
    </div>
  );
}

function Tools() {
  let ref = useRef();
  UI.makeKeyReactive("tabs");

  return (
    <div
      ref={ref}
      style={{ height: `calc(100% - 43px)` }}
      className="w-full overflow-auto"
    >
      {UI.tabs === "layout" && <LayoutPanel></LayoutPanel>}
      {UI.tabs === "runners" && <SettingsPanel></SettingsPanel>}
    </div>
  );
}

function TabIcon({ UI, src, tab = "" }) {
  UI.makeKeyReactive("tabs");

  return (
    <div
      className={`icon cursor-pointer transition-all duration-300 ${
        UI.tabs === tab ? "bg-gray-100" : ""
      }  `}
      onClickCapture={() => {
        UI.tabs = tab;
      }}
    >
      <style jsx>{
        /* css */ `
          //
          .icon {
            margin-top: 6px;
            margin-left: 6px;
            padding-right: 2px;
            border-radius: 14px 14px 0px 0px;
            width: 38px;
            height: 38px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }
        `
      }</style>
      <img
        className="h-5"
        src={src}
        onClick={() => {
          UI.tabs = tab;
        }}
      />
    </div>
  );
}
