var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: "#books",

	events: {
		'click #add': 'addBook'
	},

	initialize: function(initialBooks) {
		console.log("Hello LibraryView");
		// initialBooks : array of data that we pass to the app library constructor.
		// we'll use this to populate our collection with some data
		this.collection = new app.Library(initialBooks);
		this.render();

		// console.log($("#add"));
		// $("#add").on('click', function(event) {
		// 	event.preventDefault();
		// 	console.log("ALLO");
		// });


		// Need to make the view render again when a new model is added
		this.listenTo(this.collection, "add", this.renderBook)
	},

	// render library by rendering each book in its collection
	render: function() {
		this.collection.each(function(item) {
			this.renderBook(item);
		}, this);
	},

	// render a book by creating a BookView and appending the
	// element it renders to the library's element
	renderBook: function(item) {
		var bookView = new app.BookView({
			model: item
		});
		this.$el.append(bookView.render().el);
	},

	// When the user clicks the add button : take the data in the form and use it to create a new model.
	addBook: function(e) {
		console.log("LibraryView.addBook");
		e.preventDefault();
		var formData = {};

		$("#addBook div").children("input").each(function(i, el) {
			if ($(el).val() != "") {
				formData[el.id] = $(el).val();
			}
		});

		this.collection.add(new app.Book(formData));
	}
});
