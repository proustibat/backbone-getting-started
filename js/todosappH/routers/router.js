// Todo Router
// ----------


/*
When the route changes, the todo list will be filtered on
a model level and the selected class on the filter links
in the footer will be toggled as described above. When an
item is updated while a filter is active it will be updated
accordingly (e.g., if the filter is active and the item is
checked, it will be hidden). The active filter is persisted
on reload
*/

var Workspace = Backbone.Router.extend({
	// Our router uses a *splat to set up a default route which passes the string after ‘#/’ in the URL to setFilter() which sets app.TodoFilter to that string
	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function(param) {
		// Set the current filter to be used
		if (param) {
			param = param.trim();
		}
		appH.TodoFilter = param || '';

		// Trigger a collection filter event, causing hiding/unhiding of Todo view items
		appH.Todos.trigger('filter');
		// once the filter has been set, we simply trigger ‘filter’
		// on our Todos collection to toggle which items are visible
		// and which are hidden. Recall that our AppView’s filterAll()
		// method is bound to the collection’s filter event and that
		// any event on the collection will cause the AppView to re-render
	}
});

appH.TodoRouter = new Workspace();

// Finally, we create an instance of our router and call
// Backbone.history.start() to route the initial URL during page load.
Backbone.history.start();
