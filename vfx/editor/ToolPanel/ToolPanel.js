import { useEffect, useMemo, useRef, useState } from "react";
import { makeShallowStore } from "../../utils/make-shallow-store";
import { MaterialPanel } from "./MaterialPanel";
import { LayoutPanel } from "./LayoutPanel";
import { SettingsPanel } from "./SettingsPanel";

export function ToolPanel() {
  let { current: st } = useRef({
    tabs: "layout",
  });
  const UI = makeShallowStore(st);
  return (
    <div className="flex h-full">
      <Tools UI={UI} />
      <Tabs UI={UI} />
    </div>
  );
}

function Tabs({ UI }) {
  return (
    <div className="icons bg-gray-300">
      <style jsx>{
        /* css */ `
          //
          .icons {
            height: 100%;
            width: 40px;
          }
        `
      }</style>

      <TabIcon UI={UI} tab="layout">
        <img
          onClick={() => {
            UI.tabs = "layout";
          }}
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTggMTAuMDMxdi02LjQyM2wtNi4wMzYtMy42MDgtNS45NjQgMy41Njl2Ni40OTlsLTYgMy4yMjR2Ny4yMTZsNi4xMzYgMy40OTIgNS44NjQtMy4zOTMgNS44NjQgMy4zOTMgNi4xMzYtMy40OTJ2LTcuMTc3bC02LTMuM3ptLTEuMTQzLjAzNmwtNC4zMjEgMi4zODR2LTQuOTU2bDQuMzIxLTIuNTM5djUuMTExem0tNC44OTUtOC43MWw0LjI3MiAyLjU5Ni00LjI2OCAyLjUwOS00LjE3Ni0yLjU1NCA0LjE3Mi0yLjU1MXptLS41NjkgNi4xMzR2NC45NmwtNC4yNS0yLjQyMXYtNS4xMzRsNC4yNSAyLjU5NXptLTUuODMgMTQuODQybC00LjQyMS0yLjUzOXYtNS4xNzZsNC40MjEgMi41OTV2NS4xMnptLTMuNzczLTguNzAybDQuNzc4LTIuNTMgNC4yMzcgMi40MTctNC42NjggMi42NjctNC4zNDctMi41NTR6bTQuOTE3IDMuNTg3bDQuNzIyLTIuNjk3djUuMDU2bC00LjcyMiAyLjc1N3YtNS4xMTZ6bTEwLjU4NiA1LjExNWwtNC43MjItMi43NTd2LTUuMTE2bDQuNzIyIDIuNzU0djUuMTE5em0tNC4wNzQtOC44NjFsNC4yNDctMi4zOSA0Ljc2OSAyLjU5NC00LjM2NyAyLjUwOS00LjY0OS0yLjcxM3ptOS42MzggNi4zMjNsLTQuNDIxIDIuNTM5di01LjExNmw0LjQyMS0yLjUzOHY1LjExNXoiLz48L3N2Zz4="
        />
      </TabIcon>

      <TabIcon UI={UI} tab="runners">
        <img
          onClick={() => {
            UI.tabs = "runners";
          }}
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAyM2gtMjJ2LTIwaDIydjIwem0tMS0xNGgtMjB2MTNoMjB2LTEzem0tMS03aC0yMXYxOWgtMXYtMjBoMjJ2MXptMSAyaC0yMHY0aDIwdi00eiIvPjwvc3ZnPg=="
        />
      </TabIcon>
      {/* <TabIcon UI={UI} tab="material">
        <img
          onClick={() => {
            UI.tabs = "material";
          }}
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIuMDMxIDBjLTUuMDY0IDAtOS4wMzEgMy4wNzUtOS4wMzEgN3YxMy4yNTNjMCAxLjk5NCAzIDMuNzQ3IDkuMDI5IDMuNzQ3IDUuOTQgMCA4Ljk3MS0xLjc0NSA4Ljk3MS0zLjc0N3YtMTMuMjUzYzAtMy45MjUtMy45MzktNy04Ljk2OS03em0wIDFjNC4yOTUgMCA3LjY4NiAyLjQzNyA3Ljk0MyA1LjYxMi0xLjUwMS0uOTU4LTQuNTA1LTEuNjEyLTcuOTc0LTEuNjEyLTMuNDY3IDAtNi40NzIuNjU0LTcuOTc1IDEuNjEyLjI2MS0zLjE3NSAzLjY3OC01LjYxMiA4LjAwNi01LjYxMnptLjA0NyA4Ljc4MWMtMi4wNTMgMC02LjQ4OS0uMzktNi40ODktMS4zOTEgMC0xLjAxIDMuOTg2LTEuMzkgNi40ODktMS4zOSAyLjU2OCAwIDYuNTEyLjM5IDYuNTEyIDEuMzkxIDAgMS4wMS00LjQxIDEuMzktNi41MTIgMS4zOXptLS4wNDkgMTIuMjE5Yy01LjM5NyAwLTYuOTY2LTEuNDgxLTcuMDI5LTEuNzQ3di05LjUwOGMuMy4xNTIuNjMyLjI5NCAxIC40MjN2NS4zMzJjMCAuODI5LjY3MiAxLjUgMS41IDEuNXMxLjUtLjY3MSAxLjUtMS41di0xLjVjMC0uNTUyLjQ0Ny0xIDEtMXMxIC40NDggMSAxdjNjMCAuNTUyLjQ0NyAxIDEgMXMxLS40NDggMS0xdi00YzAtLjU1Mi40NDctMSAxLTFzMSAuNDQ4IDEgMXYuNWMwIC44MjkuNjcyIDEuNSAxLjUgMS41czEuNS0uNjcxIDEuNS0xLjV2LTMuMzNjLjM2OS0uMTI5LjY5OS0uMjcyIDEtLjQyNGwuMDAyIDkuNWMtLjA2Ni4yNzMtMS42MjcgMS43NTQtNi45NzMgMS43NTR6Ii8+PC9zdmc+"
        />
      </TabIcon> */}
    </div>
  );
}

function Tools({ UI }) {
  UI.makeKeyReactive("tabs");

  return (
    <div className="my-tools">
      <style jsx>{
        /* css */ `
          .my-tools {
            height: 100%;
            width: calc(100% - 40px);
          }
        `
      }</style>

      {UI.tabs === "runners" && <SettingsPanel></SettingsPanel>}
      {UI.tabs === "layout" && <LayoutPanel></LayoutPanel>}
      {UI.tabs === "material" && <MaterialPanel></MaterialPanel>}
    </div>
  );
}

function TabIcon({ children, UI, tab = "" }) {
  UI.makeKeyReactive("tabs");
  return (
    <div
      className={`icon cursor-pointer transition-all duration-300 h-5 ${
        UI.tabs === tab ? "bg-gray-100" : ""
      }  `}
      onClick={() => {
        UI.tabs = tab;
      }}
    >
      <style jsx>{
        /* css */ `
          //
          .icon {
            margin-top: 6px;
            padding-right: 2px;
            border-radius: 0px 14px 14px 0px;
            width: 36px;
            height: 36px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }
        `
      }</style>

      {children}
    </div>
  );
}
