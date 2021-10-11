import { protectFire } from "../../vfx/api/fireServer";

let handler = ({ req, res, token, uid }) => {
  console.log(token.uid);
  console.log(token.name);
  console.log(token.picture);

  res.status(200).json({ uid, ok: true });
};

export default protectFire(handler);

// https://cloudinary.com/documentation/image_upload_api_reference#destroy_method
