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


var dog = new Animal();

console.log(dog);
console.log(dog.get("name"));

dog.set("name", "Dog 1");
console.log(dog.get("name"));

dog.set({name: "Dog 1", color: "brown", sound: "arf"});
console.log(dog.toJSON());


var dog2 = new Animal({name: 'Dog 2', color: 'brown', sound: 'arf'});
dog2.set("name", "Y", {validate: true});
console.log(dog2.toJSON());
