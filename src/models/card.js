import Base from 'models/base'

export default class Card extends Base {
  get estimate() {
    return this._estimate || '-';
  }

  set estimate(newEstimate) {
    this._estimate = newEstimate;
  }

  get created_at() {
    return moment(this._created_at).format('DD/MM/YYYY');
  }

  set created_at(date) {
    this._created_at = date;
  }
}