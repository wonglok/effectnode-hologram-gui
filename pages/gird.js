import { useEffect, useState } from "react";
import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

function GridApple() {
  let [width, setWidth] = useState(1200);

  useEffect(() => {
    let r = () => setWidth(window.innerWidth);

    window.addEventListener("resize", r);
    return () => {
      window.removeEventListener("resize", r);
    };
  });

  let rowHeight = 50;
  let cols = Math.floor(width / rowHeight);
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={cols}
      rowHeight={rowHeight}
      width={width}
      compactType={null}
    >
      <div className="border bg-gray-200" key="a">
        a
      </div>
      <div className="border bg-gray-200" key="b">
        b
      </div>
      <div className="border bg-gray-200" key="c">
        c
      </div>
    </GridLayout>
  );
}

export default function Page() {
  return (
    <div className="w-full h-full overflow-scroll">
      <GridApple></GridApple>
    </div>
  );
}
