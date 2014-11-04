// Module dependencies
// var application_root = __dirname,
var application_root = "C:wamp/www/backbone-getting-started/booklibrary",
	express = require("express"), // Web framework
	path = require("path"), // Utilities for dealing with file paths
	mongoose = require("mongoose"); // MongoDB integration



// Create server
var app = express();

app.configure(function(){
  app.use(express.bodyParser());
});

// Where to serve static content
app.use(express.static(path.join(application_root, "client")));

// Start server
var port = 4711;

app.listen(port, function() {
	console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});

// Routes
app.get("/api", function(req, res) {
	res.send("Library API is running ma gueule !");
});



// Connect to the database
mongoose.connect('mongodb://localhost:8017/library_database', function(err) {
	if (err) {
		console.log(err);
	}
});

// Schemas
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date
});

// Models
var BookModel = mongoose.model( 'Book', Book );



// Get a list of all books
app.get("/api/books", function(req, res) {
	// The find function of Model is defined like this: function find (conditions, fields, options, callback)
	// but since we want a function that returns all books we only need the callback parameter.
	return BookModel.find(function(err, books) {
		if (!err) {
			return res.send(books);
		} else {
			return console.log(err);
		}
	});
});

// Insert a new book
app.post('/api/books', function(request, response) {
	console.log("ACCESSING API w/ POST");
	// anyone calling this operation in the API needs to supply a JSON
	// object containing the title, author, and releaseDate attributes.
	// Actually, the caller can omit any or all attributes since we
	// have not made any of them mandatory
	var book = new BookModel({
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate
	});

	// The reason we return the BookModel and not just “success”
	// or similar string is that when the BookModel is saved it
	// will get an _id attribute from MongoDB, which the client
	// needs when updating or deleting a specific book
	return book.save(function(err) {
		if (!err) {
			console.log("CREATED");
			return response.send(book);
		} else {
			console.log(err);
		}
	});
});
