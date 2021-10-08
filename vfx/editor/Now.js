import { Quaternion, Vector3 } from "three";
import { makeShallowStore } from "../utils/make-shallow-store";

export const Now = makeShallowStore({
  //
  startLookAt: new Vector3(0, 1.5, 1),
  startAt: new Vector3(0, 1.5, 0),
  //
  moved: 0,
  goingTo: new Vector3(),
  camAt: new Vector3(),
  avatarAtDelta: new Vector3(),
  avatarAt: new Vector3(),
  avatarFlyTo: new Vector3(),
  avatarHead: new Vector3(),
  avatarRot: new Vector3(),
  avatarFaceLook: new Vector3(),
  followerPt: new Vector3(),
  avatarLoading: true,
  avatarMode: "standing",
  avatarSpeed: 1.0,

  //
  keyW: false,
  keyA: false,
  keyS: false,
  keyD: false,
  //
  cursorPos: new Vector3(),
  cursorNormal: new Vector3(),
  cursorType: "hide",

  //
  hint: "",
  hoverData: false,
  isDown: false,

  // avatarAtPhy: new Vector3(),

  camMode: "first",

  overlay: "",

  profile: false,
  user: false,
  //-----
  //-----
  //-----
  //-----
  sceneID: false,
  theScene: false,

  scenes: [],
  items: [],
  lights: [],
  folders: [],
  glb: [],

  // layoutCursorMode: "add-hover",
  layoutCursorMode: "waiting",
  layoutCursorData: false,
  layoutCursorAt: new Vector3(),

  selectedMode: "waiting",
  selectedItemKey: false,

  isAnimatingOrbit: false,
  targetPlace: new Vector3(),
  targetQuaternion: new Quaternion(),
  fromGoingTo: new Vector3(),
  toGoingTo: new Vector3(),
});

export let makeArray = (obj, reverse = false) => {
  let arr = [];

  if (!obj) {
    return arr;
  }

  let idx = 0;
  for (let [key, val] of Object.entries(obj)) {
    if (key && val) {
      arr.push({
        idx,
        ...val,
      });
      idx++;
    }
  }

  if (reverse) {
    arr.sort((a, b) => {
      if (a.idx > b.idx) {
        return -1;
      } else if (a.idx < b.idx) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    arr.sort((a, b) => {
      if (a.idx > b.idx) {
        return 1;
      } else if (a.idx < b.idx) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  return arr;
};
