import admin from "firebase-admin";
import { firebaseConfig } from "../../vfx/api/fireConfig";

if (!admin.apps.length) {
  admin.initializeApp({
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
  });
}

// // // As httpOnly cookies are to be used, do not persist any state client side.

// // idToken comes from the client app
// // admin
// //   .auth()
// //   .verifyIdToken(idToken)
// //   .then((decodedToken) => {
// //     const uid = decodedToken.uid;
// //     // ...
// //   })
// //   .catch((error) => {
// //     // Handle error
// //   });

// idToken comes from the client app

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let protect = (handler) => (req, res) => {
  console.log(req.body);
  try {
    admin
      .auth()
      .verifyIdToken(req.query.token || req.body.token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;

        handler({
          uid: uid,
          token: decodedToken,
          req,
          res,
        });
      })
      .catch(() => {
        // Handle error
        res
          .status(403)
          .json({ erro: "firebase  cannot decode stuff", ok: false });
      });
  } catch (e) {
    console.log(e);
    res.status(403).json({ erro: "function cannot decode stuff", ok: false });
  }
};

let handler = ({ req, res, token, uid }) => {
  console.log(token.uid);
  console.log(token.name);
  console.log(token.picture);
  res.status(200).json({ uid, ok: true });
};

export default protect(handler);
