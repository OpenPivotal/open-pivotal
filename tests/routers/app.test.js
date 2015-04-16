import AppRouter from 'routers/app';
import FakeStore from 'fake-store';
import CARDS_BACKLOG from 'fixtures/cards-backlog';
import CARDS_DOING from 'fixtures/cards-doing';
import CARDS_DONE from 'fixtures/cards-done';
import CARDS_ICEBOX from 'fixtures/cards-icebox';
import CARD from 'fixtures/card';
import PROJECT from 'fixtures/project';

function flatten(array) {
  return array.reduce(function(a, b){
   return a.concat(b);
  });
}

describe('AppRouter', () => {
  let dom = $('<div></div>')
    , subject = new AppRouter(FakeStore, dom);

  describe('when I navigate to the index', () => {
    before((done) => {
      subject.index('apiKey', 'projectId').then(() => done());
    });

    it('then I should see the project name', () => {
      expect(dom.html()).to.contain(PROJECT.name);
    });

    it('then I should see the project description', () => {
      expect(dom.html()).to.contain(PROJECT.name);
    });

    describe('cards', () => {
      flatten([
        CARDS_ICEBOX,
        CARDS_BACKLOG,
        CARDS_DOING,
        CARDS_DONE
      ]).forEach((card) => {
        it('then I should see the card name ' + card.name, () => {
          expect(dom.html()).to.contain(card.name);
        });
      });
    });
  });

  describe('when I navigate to a card', () => {
    before((done) => {
      subject.card('apiKey', 'projectId', 1).then(() => done());
    });

    it("then I should see it's name", () => {
      expect(dom.html()).to.contain(CARD.name);
    });

    it("then I should see it's description", () => {
      expect(dom.html()).to.contain(CARD.description);
    });

    it("then I should see it's estimate", () => {
      expect(dom.html()).to.contain(CARD.estimate);
    });
  });
});