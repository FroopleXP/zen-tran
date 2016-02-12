//////////////////////////////////////////////////
// MAIN CONTROL SCRIPT
//////////////////////////////////////////////////
$(document).ready(function() {

	//////////////////////////////////////////////////
	// BOOK SUBMISSION
	//////////////////////////////////////////////////
	var book_form = $("#book_form");

	// Form submission
	book_form.on('submit', function() {

		// Parsing the form data
		var book_data = form_parse(book_form),
			book_url = book_data['book_url'];

		// FOR TESTING!
		show_noti(0, book_url);

		// Stopping the form from submitting
		return false;

	});

});

// Function for parsing the form data
function form_parse(form) {
	// Serializing the data
	var book_form_data = form.serializeArray(),
		data_obj = {};

	// Pushing the data to an array
	for (var i = 0, l = book_form_data.length; i < l; i++) {
	    data_obj[book_form_data[i].name] = book_form_data[i].value;
	}

	// Returning the object
	return data_obj;
}

// Function for displaying an error
function show_noti(stat, message) {
	// Declaring the notification box
	var noti_box = $("#error_box");
	// Checking the stat
	switch (stat) {
		case 0:
			// Error notification
			noti_box.removeClass('alert alert-success');
			noti_box.addClass('alert alert-danger');
			break;
		case 1:
			// Good notification
			noti_box.removeClass('alert alert-danger');
			noti_box.addClass('alert alert-success');
			break;
	}
	// Adding the message to the noti box
	noti_box.html(message);
}