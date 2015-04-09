import IndexView from 'views/index'
import LaneView from 'views/lane'
import CardView from 'views/card'
import Store from 'store'

export default Backbone.Router.extend({
  routes: {
    ":api_key/:project": "index"
  },
  index: (apiKey, project) => {
    let store = new Store(apiKey, project)
      , createLane;

    createLane = (row, laneName, cards) => {
      let lane = new LaneView(laneName).$el;
      row.append(lane);
      cards.cards.forEach((card) => {
        lane.find('.cards').append(new CardView(card).$el);
      });
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
              createLane(row, 'Icebox', icebox);
              createLane(row, 'Backlog', backlog);
              createLane(row, 'Doing', doing);
              createLane(row, 'Done', done);
            });
          });
        });
      });
    });
  }
});