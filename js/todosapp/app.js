var app = app || {};
var ENTER_KEY = 13;

$(document).ready(function() {
	console.log(">>> KICK OFF");
	// Kick thinks off by creating the App
	new app.AppView();
});


if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}
