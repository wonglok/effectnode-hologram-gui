import { login } from "../vfx/api/fire";
import router from "next/router";
export default function loginPage() {
  return (
    <div>
      <button
        onClick={() => {
          //
          login().then((s) => {
            if (s?.user?.uid) {
              router.router.push("/app");
            }
          });

          //
        }}
      >
        Login
      </button>
    </div>
  );
}

//
