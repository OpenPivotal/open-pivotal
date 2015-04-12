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

    store.findProject((project) => {
      let indexView = new IndexView(project)
        , row = indexView.$el.find('.row');

      $('#app').html(indexView.$el);

      row.html('<div class="col-md-12"><b>Loading...</b></div>');

      store.findCards("icebox", (icebox) => {
        store.findCards("backlog", (backlog) => {
          store.findCards("doing", (doing) => {
            store.findCards("done", (done) => {
              row.html('');
              row.append(createLane('Icebox', icebox));
              row.append(createLane('Backlog', backlog));
              row.append(createLane('Doing', doing));
              row.append(createLane('Done', done));
            });
          });
        });
      });
    });
  },
  card: function (apiKey, project, id) {
    let store = new Store(apiKey, project);

    store.findProject((project) => {
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