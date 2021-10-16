import { EditorApp } from "../vfx/editor/App/EditorApp";
// import dynamic from "next/dynamic";

// const EditorApp = dynamic(
//   () => import("../vfx/editor/App/EditorApp").then((d) => d.EditorApp),
//   { ssr: false }
// );

export default function Page() {
  return <EditorApp></EditorApp>;
}
