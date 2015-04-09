export default Backbone.View.extend({
  tagName: "div",
  className: "container",
  template: App.templates.index,
  initialize: function(project) {
    this.project = project;
    this.render();
  },
  render: function() {
    let _this = this;

    _this.$el.html(this.template(this.project));

    return this;
  }
});