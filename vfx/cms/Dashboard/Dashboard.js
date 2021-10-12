import { DashGrid } from "../DashGrid/DashGrid";
import { Navbar } from "../Navbar/Navbar";

export const Dashboard = () => {
  //
  //
  //
  //

  return (
    <div
      className="w-full min-h-full p-8"
      style={{
        backgroundImage: `url("https://source.unsplash.com/6fErfa9kGw8/1024x1024")`,
        backgroundSize: "cover",
        backgroundPosition: "100% 80%",
        backgroundColor: "gray",
      }}
    >
      <div className="glass rounded-3xl p-4 mb-4 w-full lg:h-full">
        <Navbar></Navbar>

        <div
          class="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full lg:h-full"
          style={{
            height: `calc(100% - 5rem)`,
          }}
        >
          <div className="rounded-3xl p-4 bg-white">
            {/* <MyMaps></MyMaps> */}1
          </div>
          <div className="rounded-3xl p-4 bg-white lg:col-span-2">1</div>
        </div>
      </div>
    </div>
  );
};
