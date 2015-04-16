export default Backbone.View.extend({
  tagName: "div",
  className: "well",
  template: App.templates.card,
  events: {
    "click .open": "open"
  },
  initialize(card, apiKey, project) {
    this.card = card;
    this.apiKey = apiKey;
    this.project = project;
    this.render();
  },
  render() {
    this.$el.html(this.template(this.card));
    return this;
  },
  open() {
    App.router.navigate(`/${this.apiKey}/${this.project}/cards/${this.card.id}`, {trigger: true});
  }
});

