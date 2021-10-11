import { getMe, login, firebase } from "../vfx/api/fire";
export default function loginPage() {
  let tryToken = ({ token }) => {
    return fetch(`/api/me`, {
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

              token.then((val) => {
                if (firebase.auth().currentUser) {
                  console.log(val);
                  // console.log(firebase.auth().currentUser);
                }

                // let me = await getMe();
                // let token = await me.getIdToken();
                tryToken({ token: val });
              });

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
            let token = await me.getIdToken();
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
