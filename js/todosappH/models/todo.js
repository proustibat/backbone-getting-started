var appH = appH || {};

// Todo Model
// ----------

appH.Todo = Backbone.Model.extend({

	// Default attributes ensure that each todo created has "title" and "completed" keys
	defaults: {
		title: "",
		completed: false
	},

	initialize: function() {
		console.log("Todo.Model.initialise");
	},

	// Toggle the "completed" state of this todo item
	toggle: function() {
		this.save({
			completed: !this.get("completed")
		});
	}
});
