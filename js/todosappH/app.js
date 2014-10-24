var appH = appH || {};
var ENTER_KEY = 13;

$(document).ready(function() {
	console.log(">>> KICK OFF");
	// Kick thinks off by creating the App
	new appH.AppView();
});


if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}


Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});
