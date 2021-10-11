import * as cloudainry from "cloudinary";

export function prepareCloudinary() {
  let cloudinaryURL = process.env.CLOUDINARY_URL;
  let short = cloudinaryURL.replace("cloudinary://", "");
  let [api_pair, cloud_name] = short.split("@");
  let [api_key, api_secret] = api_pair.split(":");

  cloudainry.v2.config({
    cloud_name,
    api_key,
    api_secret,
  });
}
