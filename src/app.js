import AppRouter from 'routers/app-router'

window.App = {} || window.App;

App.router = new AppRouter();

Backbone.history.start();
