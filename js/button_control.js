//////////////////////////////////////////////////
// CONTROL BUTTONS
//////////////////////////////////////////////////

$(document).ready(function() {

	// Requiring dependencies
	var nw = require('nw.gui'),
		win = nw.Window.get();

	// Selecting the buttons
	var btn_minimise = $("#minimise"),
		btn_close = $("#close");

	//////////////////////////////////////////////////
	// Listening for clicks on the control buttons
	//////////////////////////////////////////////////

	// Minimise
	btn_minimise.on('click', function() {
		win.minimize();
	});

	// Close
	btn_close.on('click', function() {
		win.close();
	});

});