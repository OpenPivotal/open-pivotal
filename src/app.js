import AppRouter from 'routers/app';
import Store from 'store';

window.App = {} || window.App;

App.router = new AppRouter(Store, $('#app'));

Backbone.history.start();
