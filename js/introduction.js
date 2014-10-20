// Define a Todo Model
var Todo = Backbone.Model.extend({
	// Default todo attribute values
	defaults: {
		title: null,
		completed: false
	},
	validate: function(attributes) {
		console.log("Todo.validate");
		if (attributes.hasOwnProperty("title") && (attributes.title === null || attributes.title === undefined)) {
			return "Remember to set a title for your todo !";
		}
	},
	initialize: function() {
		console.log("Todo.initialize");

		this.on('change', function() {
			console.log('- Values for this model have changed.');
		});

		this.on('change:completed', function() {
			console.log('Completed status has changed');
		});

		this.on("invalid", function(model, error) {
			console.log(error);
		});
	},

	setTitle: function(newTitle) {
		this.set({
			title: newTitle
		});
	}
});

// Define a Todo View
var TodoView = Backbone.View.extend({

	tagName: "li", // required, but defaults to 'div' if not set
	className: "container", // optional, you can assign multiple classes to his property like so: 'container homepage'
	id: 'todos', // optional


	// Cache the template function for a single item
	todoTpl: _.template($(".content #item-template").html()),

	events: {
		"click .toggle": "toggleCompleted",
		"dblclick label": "edit",
		"keypress .edit": "updateOnEnter",
		"click .destroy": "clear",
		"blur .edit": "close"
	},

	initialize: function(options) {
		console.log("TodoView.initialize: ", options);
		this.options = options || {};
		this.$el = $("#todo");
		// Later we'll look at:
		// this.listenTo(someCollection, "all", this.render);
		// but you can actually run this example right now by callin todoView.render();
	},

	// Re-render the titles of the todo item
	render: function() {
		console.log("TodoView.render");
		this.$el.html(this.todoTpl(this.model.attributes));
		// $el here is a reference to the jQuery element
		// associated with the view, todoTpl is a reference
		// to an Underscore template and model.attributes
		// contains the attributes of the model/
		// Altogether, the statement is replacing the html of
		// a DOM element  with the result of instantiating a
		// template with the model's attributes.
		this.input = this.$(".edit");
		return this;
	},

	edit: function() {
		// executed when todo label is double clicked
		console.log("TodoView.edit");
	},

	close: function() {
		// executed when todo loses focus
		console.log("TodoView.close");
	},

	updateOnEnter: function() {
		// executed one each keypress when in todo edit mode,
		// but we'll wait for enter to get in action
	}
});

var ListView = Backbone.View.extend({
	render: function() {

		// Assume our model exposes the items we will
		// display in our list
		var items = this.model.get('items');

		// Loop through each of our items using the Underscore
		// _.each iterator
		_.each(items, function(item) {

			// Create a new instance of the ItemView, passing
			// it a specific model item
			var itemView = new ItemView({
				model: item
			});
			// The itemView's DOM element is appended after it
			// has been rendered. Here, the 'return this' is helpful
			// as the itemView renders its model. Later, we ask for
			// its output ("el")
			this.$el.append(itemView.render().el);
		}, this);
	}
});

/*

// Instanciate the Todo model with a title, with the completed attribute
// defaulting to false
var myTodo = new Todo({
	title: "Check attributes property of the logged models in the console."
});

// Create a view for a todo
var todoView = new TodoView({
	model: myTodo
});
// render the view
todoView.render();



console.log(myTodo.toJSON());
console.log(myTodo.get("title"));
console.log(myTodo.get("completed"));

myTodo.set("title", "Youpi");
console.log(myTodo.get("title"));

myTodo.on("change:title", function() {
	console.log('Title changed');
});
myTodo.set("title", "bla bli blou");

myTodo.set("completed", true);



// Both of the following changes trigger the listener:
myTodo.set("title", 'Go fishing on Sunday.');
console.log(myTodo.get("title"));

myTodo.setTitle('ALLLLLOOO');
console.log(myTodo.get("title"));

*/

// VALIDATION
/*
var Person = new Backbone.Model({
	name: 'Jeremy'
});

// Validate the model name
Person.validate = function(attrs) {
	console.log("Person.validate");
	if (!attrs.name) {
		return 'I need your name';
	}
};

// Change the name
Person.set({
	name: 'Samuel'
});
console.log(Person.get('name'));

// Remove the name attribute, force validation
Person.unset('name', {
	validate: true
});

var myTodo2 = new Todo();
myTodo2.set('completed', true, {validate: true}); // logs: Remember to set a title for your todo.
console.log('completed: ' + myTodo2.get('completed')); // completed: false


var emptyTodo = new Todo(null, {validate: true});
console.log(">>>", emptyTodo.validationError);

*/



// VIEW

// var todosView = new TodoView();
// console.log(todosView.el); // logs <ul id="todos" class="container"></ul>

// var todosView2 = new TodoView();
// todosView2 = new TodoView({el: $("#todo")});



/*

// We create two DOM elements representing buttons
// which could easily be containers or something else
var button1 = $('<button>button1</button>');
var button2 = $('<button><p><a><b>test</b></a></p></button>');

// Define a new view
var View = Backbone.View.extend({
	events: {
		click: function(e) {
			console.log(view.el);
			console.log(view.$el);
			console.log(view.el === e.target);
		}
	}
});

// Create a new instance of the view, applying it
// to button1
var view = new View({
	el: button1
});

// Apply the view to button2 using setElement
view.setElement(button2);
console.log(view.$('a b').html());

button1.trigger('click');
button2.trigger('click'); // returns true
*/
