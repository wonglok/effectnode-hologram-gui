import * as admin from "firebase-admin";

let protect = (handler) => (req, res) => {
  if (admin.apps.length === 0) {
    let str = process.env.FIREBASE_ENCODE_JSON;

    str = JSON.parse(decodeURIComponent(str));

    admin.initializeApp({
      credential: admin.credential.cert(str),
      databaseURL: "https://effectnode.firebaseio.com",
    });
  }

  try {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;

        handler({
          uid: uid,
          token: decodedToken,
          req,
          res,
        });
      })
      .catch((e) => {
        console.log(e);
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
