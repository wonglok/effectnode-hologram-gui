import { Euler, Vector3 } from "three";
import { makeShallowStore, ShallowStoreMethods } from "./make-shallow-store";

let getInternal = () => {
  return {
    //
    startRotation: new Euler(0, 0, 0, "XYZ"),
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
    locked: false,
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

    reload: [],
    onlineUID: [],
  };
};

export const makeNow = () => {
  let Type = {
    ...getInternal(),
    ...ShallowStoreMethods,
  };

  /** @type {Type} */
  return makeShallowStore(getInternal());
};
