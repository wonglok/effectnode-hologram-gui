import { protectFire } from "../../vfx/api/fireServer";
import * as cloudainry from "cloudinary";

let handler = ({ req, res, token, uid }) => {
  console.log(token.uid);
  console.log(token.name);
  console.log(token.picture);

  res.status(200).json({ uid, ok: true });

  //

  // let cloudinaryURL = process.env.CLOUDINARY_URL;
  // let short = cloudinaryURL.replace("cloudinary://", "");
  // let [api_pair, cloud_name] = short.split("@");
  // let [api_key, api_secret] = api_pair.split(":");

  // cloudainry.v2.config({
  //   cloud_name,
  //   api_key,
  //   api_secret,
  // });

  // cloudainry.v2.api.root_folders().then((folders) => {
  //   res.status(200).json({ uid, ok: true, folders });
  // });
};

export default protectFire(handler);
