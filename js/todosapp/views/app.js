var app = app;

// The Application
// ---------------

// Our overall AppView is the top-level piece of UI.
app.AppView = Backbone.View.extend({

	// Instead of generating a new element, bind to the existing skeleton of the App already present in the HTML
	el: "#todoapp", // refers to the matching <section id="todoapp" />

	// Our template for the line of statistics at the bottom of the app.
	statsTemplate: _.template($("#stats-template").html()),


	// Delegated events for creating new items, and clearing completed ones.
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	// At initialization we bind to the relevant events on the "Todos" collection, when items are addded or changed
	initialize: function() {
		console.log("AppView.initialize");
		this.allCheckbox = this.$("#toggle-all")[0]; // this.$() finds elements relative to this.$el
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);

		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll);

		// all event to bind any event triggered on the Todos collection to the view’s render method
		this.listenTo(app.Todos, 'all', this.render);

		// Fetching the previously saved todos from localStorage
		app.Todos.fetch();
	},

	// Re-rendering the App just means refreshing the statistics -- the rest of the app doesn't change.
	render: function() {
		console.log("AppView.render");
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		// The #main and #footer sections are displayed or hidden depending on whether there are any todos in the collection
		if (app.Todos.length) {
			this.$main.show();
			this.$footer.show();

			// The footer is populated with the HTML produced by instantiating the statsTemplate
			// with the number of completed and remaining todo items
			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));

			this.$('#filters li a')
				.removeClass('selected')
				.filter('[href="#/' + (app.TodoFilter || '') + '"]') // The value of app.TodoFilter will be set by our router
			.addClass('selected'); // Apply the class ‘selected’ to the link corresponding to the currently selected filter.
		} else {
			this.$main.hide();
			this.$footer.hide();
		}

		// The allCheckbox is updated based on whether there are remaining todos
		this.allCheckbox.checked = !remaining;
	},

	// Add a single todo item to the list by creating a view for it, and appending its element to the "<ul>".
	addOne: function(todo) {
		console.log("AppView.addOne");
		var view = new app.TodoView({
			model: todo
		});
		$('#todo-list').append(view.render().el);
	},

	// Add all items in the **Todos** collection at once.
	addAll: function() {
		console.log("AppView.addAll");
		// "this" within addAll() refers to the view because listenTo() implicitly set the callback’s context to the view when it created the binding
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	},

	// Callback on the Todos collection for a change:completed event
	filterOne: function(todo) {
		console.log("AppView.filterOne");
		// filterOne listens for changes to the completed flag for any model in the collection.
		// The affected todo is passed to the callback which triggers a custom visible event on the model.
		todo.trigger('visible');
	},

	// Callback for a filter event
	filterAll: function() {
		console.log("AppView.filterAll");
		// Its responsibility is to toggle which todo items are visible based on the filter
		// currently selected in the UI (all, completed or remaining) via calls to filterOne()
		app.Todos.each(this.filterOne, this);
	},

	// Generate the attributes for a new Todo item.
	newAttributes: function() {
		console.log("AppView.newAttributes");
		// returns an object literal composed of the title, order, and completed state
		// of the new item. Note that this is referring to the view and not the DOM
		// element since the callback was bound using the events hash
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},

	// If you hit return in the main input field, create new Todo model, persisting it to localStorage.
	createOnEnter: function(event) {
		console.log("AppView.createOnEnter");
		if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
			return;
		}
		// Creates a new Todo model and persists it in localStorage when a user hits enter inside the <input/>
		// The model is populated by newAttributes(), which returns an object literal composed of the title, order, and completed state of the new item
		// Note that this is referring to the view and not the DOM element since the callback was bound using the events hash
		app.Todos.create(this.newAttributes());

		// resets the main <input/> field value to prepare it for the next entry
		this.$input.val('');
	},

	// Clear all completed todo items, destroying their models.
	clearCompleted: function() {
		console.log("AppView.clearCompleted");
		// Removes the items in the todo list that have been marked as completed when the user clicks the clear-completed checkbox
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},

	// Allows a user to mark all of the items in the todo list as completed by clicking the toggle-all checkbox
	toggleAllComplete: function() {
		console.log("AppView.toggleAllComplete");
		var completed = this.allCheckbox.checked;

		app.Todos.each(function(todo) {
			todo.save({
				'completed': completed
			});
		});
	}

});
