export default Backbone.View.extend({
  tagName: "div",
  className: "col-md-8 col-md-offset-2",
  template: App.templates['card-detailed'],
  initialize(card, apiKey, project) {
    this.card = card;
    this.apiKey = apiKey;
    this.project = project;
    this.render();
  },
  render() {
    this.$el.html(this.template(this.card));
    return this;
  }
});

