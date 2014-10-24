var appH = appH || {};
var ENTER_KEY = 13;

$(document).ready(function() {
	console.log(">>> KICK OFF");


	// Kick thinks off by creating the App
	new appH.AppView();
	// ScollReveal.js initialization
	window.sr = new scrollReveal({
		easing: "hustle",
		reset: true,
		delay: "onload"
	});
});


/* IE 8 */
if (typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}


// Handlebars helper for if condition with equality check
Handlebars.registerHelper('if_eq', function(a, b, opts) {
	if (a == b) // Or === depending on your needs
		return opts.fn(this);
	else
		return opts.inverse(this);
});
