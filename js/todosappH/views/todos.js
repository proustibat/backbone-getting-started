var appH = appH || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
appH.TodoView = Backbone.View.extend({

	// ...is a list tag
	tagName: "li",

	// Cache the template function for a single item
	template: Handlebars.compile( $("#item-template").html()),

	// The DOM events specific to an item
	events: {
		"dblclick label": "edit",
		"keypress .edit": "updateOnEnter",
		"blur .edit": "close",
		"click .toggle": "togglecompleted",
		"click .destroy": "clear"
	},

	// The TodoView listens for changes to its model, re-rendering. Since there's
	// a one-to-one correpondence between a Todo and a TodoView in this app, we
	// set a direct reference on the model for convenience.
	initialize: function() {
		console.log("TodoView.initialize");
		// when the todo gets updated, the application will re-render the view and visually reflect its changes
		// Note that the model passed in the arguments hash by our AppView is automatically available to us as this.model
		this.listenTo(this.model, "change", this.render);

		// a click event on the todo’s <button class="destroy" /> button
		this.listenTo(this.model, "destroy", this.remove);

		// a togglecompleted event on the todo’s checkbox
		this.listenTo(this.model, "visible", this.toggleVisible);
	},

	// Re-rendering the titles of the todo item
	render: function() {
		console.log("RENDER TODO");
		this.$el.html(this.template(this.model.attributes));

		this.toggleVisible();

		this.$el.toggleClass('completed', this.model.get('completed'));

		// Caching the input element within the instantiated template into this.$input
		this.$input = this.$(".edit");

		this.$el.find("label").attr("data-sr", "enter from right to left and hustle 5px over 0.5s");
		return this;
	},

	// Toggles visibility of item
	toggleVisible: function() {
		this.$el.toggleClass('hidden', this.isHidden());
	},

	// Determines if item should be hidden
	isHidden: function() {
		var isCompleted = this.model.get('completed');
		return ( // hidden cases only
			(!isCompleted && appH.TodoFilter === 'completed') || (isCompleted && appH.TodoFilter === 'active')
		);
	},

	// Toggle the `"completed"` state of the model.
	togglecompleted: function() {
		// The togglecompleted() function is invoked which calls toggle() on the todo model
		this.model.toggle();

		// (toggle() toggles the completed status of the todo and calls save() on the model)

		// The save generates a change event on the model which is bound to our TodoView’s render() method

		// We’ve added a statement in render() which toggles the completed class
		// on the element depending on the model’s completed state. The associated
		// CSS changes the color of the title text and strikes a line through it when the todo is completed

		// The save also results in a change:completed event on the model
		// which is handled by the AppView’s filterOne() method. If we look
		// back at the AppView, we see that filterOne() will trigger a
		// visible event on the model. This is used in conjunction with the
		// filtering in our routes and collections so that we only display
		// an item if its completed state falls in line with the current filter.
		// In our update to the TodoView, we bound the model’s visible event
		// to the toggleVisible() method. This method uses the new isHidden()
		// method to determine if the todo should be visible and updates it accordingly
	},

	// Switch this view into "editing" mode, displaying the input field
	edit: function() {
		// changes the current view into editing mode when a user
		// double-clicks on an existing item in the todo list.
		// This allows them to change the existing value of the item’s title attribute
		this.$el.addClass("editing");
		this.$input.focus();
	},

	// Close the "editing" mode, saving changes to the todo
	close: function() {
		// trims the value of the current text in our <input/> field, ensuring that
		// we don’t process it further if it does not contain any text (e.g ‘’).
		// If a valid value has been provided, we save the changes to the current
		// todo model and close editing mode by removing the corresponding CSS class
		var value = this.$input.val().trim();
		if (value) {
			this.model.save({
				title: value
			});
		} else {
			this.clear();
		}
		this.$el.removeClass("editing");
	},

	// If you hit "enter", we're through editing the item
	updateOnEnter: function(e) {
		// checks that the user has hit the return/enter
		// key and executes the close() function.
		if (e.which === ENTER_KEY) {
			this.close();
		}
	},

	// Remove the item, destroy the model from *localStorage* and delete its view.
	clear: function() {
		// The clear() method is invoked which calls destroy() on the todo model
		this.model.destroy();
		// (The todo is deleted from local storage and a destroy event is triggered)

		// In our update to the TodoView, we bound the model’s destroy event to the
		// view’s inherited remove() method. This method deletes the view and
		// automatically removes the associated element from the DOM. Since we used
		// listenTo() to bind the view’s listeners to its model, remove() also unbinds
		// the listening callbacks from the model ensuring that a memory leak does not occur.

		// destroy() also removes the model from the Todos collection,
		// which triggers a remove event on the collection

		// Since the AppView has its render() method bound to all events on the Todos
		// collection, that view is rendered and the stats in the footer are updated.
	}


});
