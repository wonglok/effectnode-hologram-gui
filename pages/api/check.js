// import { admin, setupAdmin } from "../../vfx/api/fireServer";

export default function goCheckAdmin(req, res) {
  // setupAdmin();
  // let email = req.query.email || req.body.email;
  // //
  // let dbAdminRef = admin.database().ref(`/admin`);
  // dbAdminRef.get().then(
  //   (e) => {
  //     if (e) {
  //       let val = e.val() || {};
  //       let vals = Object.values(val);
  //       if (vals.includes(email)) {
  //         res.status(200).json({ canGo: true });
  //       } else {
  //         res.status(403).json({ msg: "cannot find email" });
  //       }
  //     } else {
  //       res.status(403).json({ msg: "server cannot access admin" });
  //     }
  //   },
  //   () => {
  //     res.status(403).json({ msg: "server cannot access admin" });
  //   }
  // );

  res.json({ hi: 123 });
}
