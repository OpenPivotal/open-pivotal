import IndexView from 'views/index'
import LaneView from 'views/lane'
import CardView from 'views/card'
import DetailedCardView from 'views/card-detailed'
import Store from 'store'

export default Backbone.Router.extend({
  routes: {
    ":api_key/:project": "index",
    ":api_key/:project/cards/:id": "card"
  },
  index: (apiKey, project) => {
    let store = new Store(apiKey, project)
      , createLane;

    createLane = (laneName, cards) => {
      let lane = new LaneView(laneName).$el;

      cards.cards.forEach((card) => {
        lane.find('.cards').append(new CardView(card, apiKey, project).$el);
      });

      return lane;
    }

    store.findProject().then((project) => {
      let indexView = new IndexView(project)
        , row = indexView.$el.find('.row');

      $('#app').html(indexView.$el);

      row.html('<div class="col-md-12"><b>Loading...</b></div>');

      Promise.all([
        store.findCards("icebox"),
        store.findCards("backlog"),
        store.findCards("doing"),
        store.findCards("done")
      ]).then(values => {
        row.html('');
        row.append(createLane('Icebox', values[0]));
        row.append(createLane('Backlog', values[1]));
        row.append(createLane('Doing', values[2]));
        row.append(createLane('Done',  values[3]));
      })
    });
  },
  card: function (apiKey, project, id) {
    let store = new Store(apiKey, project);

    store.findProject().then((project) => {
      store.findCard(id, (card) => {
        let indexView = new IndexView(project)
          , row = indexView.$el.find('.row')
          , detailedView = new DetailedCardView(card);

        $('#app').html(indexView.$el);

        row.html('<div class="col-md-12"><b>Loading...</b></div>');

        row.html(detailedView.$el);

      });
    });
  }
});