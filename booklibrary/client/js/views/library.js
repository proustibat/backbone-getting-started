var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: "#books",

	initialize: function(initialBooks) {
		// initialBooks : array of data that we pass to the app library constructor.
		// we'll use this to populate our collection with some data
		this.collection = new app.Library(initialBooks);
		this.render();
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderBook(item);
		}, this);
	},

	renderBook: function(item) {
		var bookView = new app.BookView({
			model: item
		});
		this.$el.append(bookView.render().el);
	}
});
