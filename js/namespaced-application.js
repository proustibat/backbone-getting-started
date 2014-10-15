// defines the namespace
window.Tutorial = { // top level namespace is declared on the window
	Models: {},
	Collections: {},
	Views: {}
};

// Animal model
Tutorial.Models.Animal = Backbone.Model.extend({
	defaults: {
		name: 'Fido',
		color: 'black',
		sound: 'woof'
	},
	validate: function(attrs, options) {
		if (!attrs.name) {
			alert('Your animal must have a name!');
		}
		if (attrs.name.length < 2) {
			alert('Your animal\'s name must have more than one letter!');
		}
	},
	sleep: function() {
		alert(this.get('name') + ' is sleeping.');
	}
});

// Animal view
Tutorial.Views.Animal = Backbone.View.extend({
	tagName: 'li', // defaults to div if not specified
	className: 'animal', // optional, can also set multiple like 'animal dog'
	id: 'dogs', // also optional
	events: {
		// 'click': 'alertTest',
		'click .edit': 'editAnimal',
		'click .delete': 'deleteAnimal'
	},
	newTemplate: _.template($('#dogTemplate').html()), // external template
	initialize: function() {
		var self = this;
		this.render(); // render is an optional function that defines the logic for rendering a template
		this.model.on("change", this.render, this); // calls render function once name changed
		this.model.on('destroy', this.removeItem, this); // calls remove function once model deleted
	},
	render: function() {
		// the below line represents the code prior to adding the template
		this.$el.html(this.newTemplate(this.model.toJSON())); // calls the template
	},
	// alertTest: function() {
	// 	alert("Backbone click event works");
	// }
	removeItem: function() {
		this.$el.remove(); // removes the HTML element from view when delete button clicked/model deleted
	},
	editAnimal: function() {
		var newName = prompt("New animal name:", this.model.get("name")); // prompts for new name
		if (!newName) {
			return; // no change if user hits cancel
		}
		this.model.set("name", newName);
	},
	deleteAnimal: function() {
		this.model.destroy();
	}
});

// Animal collection
Tutorial.Collections.Animal = Backbone.Collection.extend({
	model: Tutorial.Models.Animal
});



// adding multiple models to collection (this will override the above Tutorial.Collections.Animal)
var animalCollection = new Tutorial.Collections.Animal([{
	name: 'Sugar',
	color: 'black',
	sound: 'woof'
}, {
	name: 'Gizmo',
	color: 'tan',
	sound: 'woof'
}, {
	name: 'Biscuit',
	color: 'brown',
	sound: 'arf'
}]);

// View for all animals (collection)
Tutorial.Views.Animals = Backbone.View.extend({ // plural to distinguish as the view for the collection
	tagName: 'ul',
	initialize: function() {
		this.collection;
	},
	render: function() {
		this.collection.each(function(Animal) {
			var animalView = new Tutorial.Views.Animal({
				model: Animal
			});
			$(document.body).append(animalView.el);
		});
	}
});

// creates view for collection and renders collection
var animalsView = new Tutorial.Views.Animals({
	collection: animalCollection
});
animalsView.render();
