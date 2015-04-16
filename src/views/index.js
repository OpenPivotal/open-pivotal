export default Backbone.View.extend({
  tagName: "div",
  className: "container",
  template: App.templates.index,
  initialize(project) {
    this.project = project;
    this.render();
  },
  render() {
    let _this = this;

    _this.$el.html(this.template(this.project));

    return this;
  }
});