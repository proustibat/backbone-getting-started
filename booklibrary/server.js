// Module dependencies
// var application_root = __dirname,
var application_root = "C:wamp/www/backbone-getting-started/booklibrary",
	express = require("express"), // Web framework
	path = require("path"), // Utilities for dealing with file paths
	mongoose = require("mongoose"); // MongoDB integration


// Create server
var app = express();

// Where to serve static content
app.use(express.static(path.join(application_root, "client")));

// Start server
var port = 4711;

app.listen(port, function() {
	console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
