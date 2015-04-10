import Cards from 'collections/cards'
import Card from 'models/card'
import Project from 'models/project'

export default class Store {
  constructor(apiKey, project) {
    this.apiKey = apiKey;
    this.project = project;
  }


  findProject(next) {
    let _this = this;

    $.ajax({
      url: `https://www.pivotaltracker.com/services/v5/projects/${_this.project}`,
      headers: {
        'X-TrackerToken': _this.apiKey
      }
    }).done(function (project) {
      next(new Project(project));
    });
  }

  findCard(id, next) {
    let _this = this;

    $.ajax({
      url: `https://www.pivotaltracker.com/services/v5/projects/${_this.project}/stories/${id}`,
      headers: {
        'X-TrackerToken': _this.apiKey
      }
    }).done(function (project) {
      next(new Card(project));
    });
  }

  findCards(filter, next) {
    let states = {
          "icebox": [ 'unscheduled' ],
          "backlog": [ 'unstarted', 'planned' ],
          "doing": [ 'delivered', 'started', 'rejected' ],
          "done": [ 'accepted', 'finished' ]
        }
      , state = states[filter].join(',')
      , _this = this;

    $.ajax({
      url: `https://www.pivotaltracker.com/services/v5/projects/${_this.project}/stories?filter=state:${state} label:public`,
      headers: {
        'X-TrackerToken': _this.apiKey
      }
    }).done(function (cards) {
      next(new Cards(cards));
    });
  }
}