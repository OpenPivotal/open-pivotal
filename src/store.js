import Cards from 'collections/cards'
import Card from 'models/card'
import Project from 'models/project'

export default class Store {
  constructor(apiKey, project) {
    this.apiKey = apiKey;
    this.project = project;
  }

  get(endpoint) {
    let _this = this;
    return new Promise((resolve) => {
      $.ajax({
        url: `https://www.pivotaltracker.com/services/v5/projects/${_this.project}${endpoint}`,
        headers: {
          'X-TrackerToken': _this.apiKey
        }
      }).done(function (data) {
        resolve(data);
      });
    });
  }


  findProject() {
    return new Promise((resolve) => {
      this.get('').then((project) => {
        resolve(new Project(project));
      });
    });
  }

  findCard(id) {
    return new Promise((resolve) => {
      this.get(`/stories/${id}`).then((card) => {
        resolve(new Card(card));
      });
    });
  }

  findCards(filter, next) {
    let states = {
          "icebox": [ 'unscheduled' ],
          "backlog": [ 'unstarted', 'planned' ],
          "doing": [ 'delivered', 'started', 'rejected' ],
          "done": [ 'accepted', 'finished' ]
        }
      , state = states[filter].join(',');

    return new Promise((resolve) => {
      this.get(`/stories?filter=state:${state} label:public`).then((cards) => {
        resolve(new Cards(cards));
      });
    });
  }
}