export default Backbone.View.extend({
  tagName: "div",
  template: App.templates.lane,
  initialize(name) {
    this.name = name;
    this.render();
  },
  render() {
    this.$el.html(this.template({ name: this.name }));
    return this;
  }
});