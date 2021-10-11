import { getMe, login, firebase, logout } from "../vfx/api/fire";
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
          logout();

          //
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          //
          login().then((s) => {
            //
            console.log(s);
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
            if (firebase.auth().currentUser) {
              firebase
                .auth()
                .currentUser.getIdToken(/* forceRefresh */ true)
                .then((idToken) => {
                  tryToken({ token: idToken });
                  // Send token to your backend via HTTPS
                  // ...
                })
                .catch(function (error) {
                  // Handle error
                });
            }

            //
            //
            // let me = firebase.auth().currentUser;
            // if (me) {
            //   let token = await me.getIdTokenResult(true);
            //   tryToken({ token });
            // }
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
