export default Backbone.View.extend({
  tagName: "div",
  template: App.templates.lane,
  initialize: function(name) {
    this.name = name;
    this.render();
  },
  render: function() {
    this.$el.html(this.template({ name: this.name }));
    return this;
  }
});