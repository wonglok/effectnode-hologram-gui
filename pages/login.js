import { getMe, login } from "../vfx/api/fire";
export default function loginPage() {
  let tryToken = ({ token }) => {
    return fetch(`/api/fire`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((r) => r.json())
      .then(console.log);
  };

  return (
    <div>
      <button
        onClick={() => {
          //
          login().then((s) => {
            if (s?.user?.uid) {
              let token = s.user.getIdToken(/* forcerefresh */ true);

              token.then((val) => {});

              //
              // router.router.push("/app");
            }
          });

          //
        }}
      >
        Login
      </button>

      <button
        onClick={() => {
          //
          let fnc = async () => {
            //
            //
            let me = await getMe();
            let token = await me.getIdToken(true);
            console.log(token);
            tryToken({ token });
            //
            //
          };
          fnc();
        }}
      >
        Tester
      </button>
    </div>
  );
}

//
