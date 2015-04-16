import Card from 'models/card';

export default class Cards {
  constructor(cards) {
    this.cards = cards.map((card) => new Card(card))
  }
}