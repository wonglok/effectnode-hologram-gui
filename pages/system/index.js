//

import { useEffect, useState } from "react";
import { FireAuth, fireDB, logout } from "../../vfx/api/fire";
import { Dashboard } from "../../vfx/cms/Dashboard/Dashboard";
import LoginPage from "./login.js";

export default function VisualCMS() {
  let [status, setStatus] = useState({
    reload: 0,
    mode: "ready",
    text: "Verifying Identity...",
  });

  useEffect(() => {
    return FireAuth.onAuthStateChanged((s) => {
      if (s && s.uid) {
        fireDB
          .ref(`/admin-test`)
          .set(Math.random())
          .then(
            () => {
              setStatus({
                user: s,
                mode: "showcms",
                text: "cms",
              });
            },
            () => {
              setStatus({
                user: null,
                mode: "showlogin",
                reload: Math.random(),
              });
            }
          );
      } else {
        setStatus({
          user: null,
          mode: "showlogin",
          reload: Math.random(),
        });
      }
    });
  }, [status.reload]);

  return (
    <>
      {status.mode === "ready" && (
        <div className="w-full h-full flex items-center justify-center text-2xl">
          {status.text}
        </div>
      )}

      {status.mode === "showcms" && (
        // <div className="w-full h-full flex items-center justify-center">
        //   {status.text}
        //   <button
        //     onClick={() => {
        //       //
        //       logout();
        //     }}
        //   >
        //     Logout
        //   </button>
        // </div>
        <Dashboard></Dashboard>
      )}

      {status.mode === "showlogin" && <LoginPage></LoginPage>}
      {/*  */}
      {/*  */}
      {/*  */}
    </>
  );
}
