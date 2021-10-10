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
