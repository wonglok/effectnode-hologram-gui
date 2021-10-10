import { cloudName } from "./cloudConfig";

export class Cloudinary {
  static getURLfromCloudinary({ cloudinary }) {
    return {
      thumb: cloudinary.secure_url.replace(
        "/upload/",
        "/upload/w_256,h_256,c_fill,g_auto:0,q_auto/"
      ),
      banner: cloudinary.secure_url.replace(
        "/upload/",
        "/upload/w_1024,q_auto/"
      ),
      square: cloudinary.secure_url.replace(
        "/upload/",
        "/upload/w_1024,h_1024,c_fill,g_auto:0,q_auto/"
      ),
      img: cloudinary.secure_url.replace(`/upload/`, `/upload/q_auto/`),
      raw: cloudinary.secure_url,
    };
  }

  static UPLOAD_VIDEO_URL = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
  static UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  static UPLOAD_GLB_URL = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

  /* eslint-disable */
  static snapshotResize(srcData, width, height) {
    var imageObj = new Image(),
      canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      xStart = 0,
      yStart = 0,
      aspectRadio,
      newWidth,
      newHeight;

    imageObj.src = srcData;
    canvas.width = width;
    canvas.height = height;

    aspectRadio = imageObj.height / imageObj.width;

    if (imageObj.height < imageObj.width) {
      //horizontal
      aspectRadio = imageObj.width / imageObj.height;
      (newHeight = height), (newWidth = aspectRadio * height);
      xStart = -(newWidth - width) / 2;
    } else {
      //vertical
      (newWidth = width), (newHeight = aspectRadio * width);
      yStart = -(newHeight - height) / 2;
    }

    return new Promise((resolve) => {
      imageObj.onload = () => {
        ctx.drawImage(imageObj, xStart, yStart, newWidth, newHeight);

        let res = canvas.toDataURL("image/jpeg", 0.75);
        resolve(res);
      };
    });
  }
  /* eslint-enable */

  static dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Old Code
    // write the ArrayBuffer to a blob, and you're done
    // var bb = new BlobBuilder();
    // bb.append(ab);
    // return bb.getBlob(mimeString);

    // New Code
    return new Blob([ab], { type: mimeString });
  }
  static toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  static imageToURI(image, isURI) {
    return new Promise((resolve) => {
      var canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth; // or 'width' if you want a special/scaled size
      canvas.height = image.naturalHeight; // or 'height' if you want a special/scaled size

      canvas.getContext("2d").drawImage(image, 0, 0);

      // Get raw image data
      if (isURI) {
        resolve(canvas.toDataURL("image/jpg"));
      } else {
        resolve(
          canvas
            .toDataURL("image/jpg")
            .replace(/^data:image\/(png|jpg)base64,/, "")
        );
      }
    });
  }
}
