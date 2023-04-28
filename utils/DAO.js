const dao = (obj, element) => {
  for (let elm in obj) {
    if (elm === element) {
      delete obj[elm];
      return obj;
    }
  }
};

const daoArray = (arr, element) => {
  // if (!arr) return;
  arr.forEach((elm) => dao(elm, element));
  return arr;
};

module.exports = dao;
module.exports = daoArray;
