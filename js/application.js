// MODEL
var Animal = Backbone.Model.extend({
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

// VIEWS
var AnimalView = Backbone.View.extend({
  tagName: 'li', // defaults to div if not specified
  className: 'animal', // optional, can also set multiple like 'animal dog'
  id: 'dogs', // also optional
  events: {
    'click': 'alertTest',
    'click .edit': 'editAnimal',
    'click .delete': 'deleteAnimal'
  },
  // initialize function watches for changes in a model and executes code as soon as a new model instance is created
  initialize: function() {
    this.on('change', function() {
      console.log('Something has changed');
    });
    this.render(); // render is an optional function that defines the logic for rendering a template
  },
  render: function() {
    this.$el.html(this.model.get('name') + ' is ' + this.model.get('color') + ' and says ' + this.model.get('sound'));
  }
});


// TEMPLATES: inline templates
var AnimalView2 = Backbone.View.extend({
  tagName: 'li', // defaults to div if not specified
  className: 'animal', // optional, can also set multiple like 'animal dog'
  id: 'dogs', // also optional
  events: {
    'click': 'alertTest',
    'click .edit': 'editAnimal',
    'click .delete': 'deleteAnimal'
  },
  template: _.template('The dog called <%= name %> is <%= color %> and says <%= sound %>.'), // inline template
  // initialize function watches for changes in a model and executes code as soon as a new model instance is created
  initialize: function() {
    this.on('change', function() {
      console.log('Something has changed');
    });
    this.render(); // render is an optional function that defines the logic for rendering a template
  },
  render: function() {
    // the below line represents the code prior to adding the template
    this.$el.html(this.template(this.model.toJSON())); // calls the template
  }
});

// TEMPLATES: external templates
var AnimalView3 = Backbone.View.extend({
  tagName: 'li', // defaults to div if not specified
  className: 'animal', // optional, can also set multiple like 'animal dog'
  id: 'dogs', // also optional
  events: {
    'click': 'alertTest',
    'click .edit': 'editAnimal',
    'click .delete': 'deleteAnimal'
  },
  newTemplate: _.template($('#dogTemplate').html()), // external template
  initialize: function() {
    this.render(); // render is an optional function that defines the logic for rendering a template
  },
  render: function() {
    // the below line represents the code prior to adding the template
    this.$el.html(this.newTemplate(this.model.toJSON())); // calls the template
  }
});

// COLLECTIONS
var AnimalCollection = Backbone.Collection.extend({
  model: Animal
});



// PART 1: MODEL
// var dog = new Animal();
// console.log(dog);
// console.log(dog.get("name"));
// dog.set("name", "Dog 1");
// console.log(dog.get("name"));
// dog.set({
//   name: "Dog 1",
//   color: "brown",
//   sound: "arf"
// });
// console.log(dog.toJSON());
// var dog2 = new Animal({
//   name: 'Dog 2',
//   color: 'brown',
//   sound: 'arf'
// });
// dog2.set("name", "Y", {
//   validate: true
// });
// console.log(dog2.toJSON());



// PART 2: VIEWS
// var dog = new Animal();
// var dogView = new AnimalView({
//   model: dog
// });
// console.log(dogView);
// console.log(dogView.el);
// $(document.body).html(dogView.el);



// PART 3: TEMPLATES (inline)
// var dog = new Animal();
// var dogView = new AnimalView2({
//   model: dog
// });
// console.log(dogView);
// console.log(dogView.el);
// $(document.body).html(dogView.el);

// PART 3: TEMPLATES (external)
// var dog = new Animal();
// var dogView = new AnimalView3({
//   model: dog
// });
// console.log(dogView.el);
// console.log(dog.toJSON());
// $(document.body).html(dogView.el);



// PART 4: collections
// adding individual models to collection
var chihuahua = new Animal({
  name: 'Sugar',
  color: 'black',
  sound: 'woof'
});
var chihuahuaView = new AnimalView({
  model: chihuahua
});
// only need to create the collection once
var animalCollection = new AnimalCollection();
animalCollection.add(chihuahua);
var pug = new Animal({
  name: 'Gizmo',
  color: 'tan',
  sound: 'woof'
});
var pugView = new AnimalView({
  model: pug
});
// can now directly add to animalCollection
animalCollection.add(pug);

console.log(animalCollection);
console.log(animalCollection.toJSON());


// adding multiple models to collection
var animalCollection2 = new AnimalCollection([{
  name: 'Bla',
  color: 'black',
  sound: 'woof'
}, {
  name: 'Bli',
  color: 'tan',
  sound: 'woof'
}, {
  name: 'Blou',
  color: 'brown',
  sound: 'arf'
}]);

console.log(animalCollection2);
console.log(animalCollection2.toJSON());
