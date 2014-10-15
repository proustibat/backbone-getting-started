// Backbone router
Tutorial.Router = Backbone.Router.extend({
  routes: { // sets the routes
    '': 'index', // root
    'edit/:id': 'edit' // root/#edit/7
  },
  // the same as we did for click events, we now define function for each route
  index: function() {
    alert('index route');
    alert("try #edit/2");
  },
  edit: function(id) {
    alert('edit route with id: ' + id);
  }
});

var newRouter = new Tutorial.Router();
Backbone.history.start(); // start Backbone history
