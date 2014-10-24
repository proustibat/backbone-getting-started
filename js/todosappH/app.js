var appH = appH || {};
var ENTER_KEY = 13;

$(document).ready(function() {
	console.log(">>> KICK OFF");


	// Kick thinks off by creating the App
	new appH.AppView();
	// ScollReveal.js initialization
	window.sr = new scrollReveal({
		enter: 'top',
		move: '8px',
		over: '2s',
		wait: '0s',
		easing: 'hustle',

		scale: {
			direction: 'up',
			power: '5%'
		},

		opacity: 0,
		mobile: true,
		reset: true,
		viewport: window.document.documentElement, // <HTML> element by default.
		delay: 'once',

		/**
		 *        vFactor changes when an element is considered in the viewport;
		 *        the default requires 60% of an element be visible.
		 */
		vFactor: 0.50,

		complete: function(el) { // Note: reset animations do not complete.
			console.log("COMPLETE");
		}
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
