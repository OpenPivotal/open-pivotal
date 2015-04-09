export default class Base {
  constructor(card) {
    let _this = this;

    Object.keys(card).forEach(function (key) {
      let value = card[key];
      _this[key] = value;
    });
  }
}