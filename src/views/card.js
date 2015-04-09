export default Backbone.View.extend({
  tagName: "div",
  className: "well",
  template: App.templates.card,
  initialize: function(model) {
    this.model = model;
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model));
    return this;
  }
});

