import { useEffect, useState } from "react";
// import { Graph } from "../Graph/Graph";
import { Navbar } from "../Navbar/Navbar";

export const Dashboard = () => {
  //
  let [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  let genRandomTree = () => {
    return {
      nodes: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ],
      links: [
        {
          source: 1,
          target: 2,
        },
        {
          source: 1,
          target: 3,
        },
      ],
    };
  };

  return (
    <div
      className="w-full h-full p-8"
      style={{
        backgroundImage: `url("https://source.unsplash.com/6fErfa9kGw8/1024x1024")`,
        backgroundSize: "cover",
        backgroundPosition: "100% 80%",
        backgroundColor: "gray",
      }}
    >
      <div className="glass rounded-3xl p-4 w-full h-full">
        <div className="h-20">
          <Navbar></Navbar>
        </div>

        <div
          className=""
          style={{
            height: `calc(100% - 5rem)`,
          }}
        >
          {/* <Graph></Graph> */}
        </div>
      </div>
    </div>
  );
};
