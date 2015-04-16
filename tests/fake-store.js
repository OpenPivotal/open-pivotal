import Cards from 'collections/cards';
import Card from 'models/card';
import Project from 'models/project';
import CARDS_BACKLOG from 'fixtures/cards-backlog';
import CARDS_DOING from 'fixtures/cards-doing';
import CARDS_DONE from 'fixtures/cards-done';
import CARDS_ICEBOX from 'fixtures/cards-icebox';
import CARD from 'fixtures/card';
import PROJECT from 'fixtures/project';

export default class Store {
  constructor(apiKey, project) {
    this.apiKey = apiKey;
    this.project = project;
  }

  findProject() {
    return new Promise((resolve) => {
      resolve(new Project(PROJECT));
    });
  }

  findCard(id) {
    return new Promise((resolve) => {
      resolve(CARD);
    });
  }

  findCards(filter) {
    return new Promise((resolve) => {
      resolve(new Cards({
        "icebox": CARDS_ICEBOX,
        "backlog": CARDS_BACKLOG,
        "doing": CARDS_DOING,
        "done": CARDS_DONE
      }[filter]));
    });
  }
}