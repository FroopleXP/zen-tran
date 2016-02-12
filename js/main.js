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

		// Requesting the book
		request_book(book_url);

		// Stopping the form from submitting
		return false;

	});

});

// Function for actually getting the book
function request_book(url) {
	// Somewhat validating the data
	if (url.length === 0) {
		// No URL
		show_noti(0, "You must enter a URL");
	} else {
		// Setting the progress
		show_progress_text(1, "Getting data...");
		// URL present, sending GET request to the server
		$.ajax({
			method: "GET",
			url: url,
			timeout: 10000,
			success: function(data) {
				// Yay! We have data.
				console.log(data);
				show_noti(1, "<b>Success! </b>Data was collected from that URL");
				show_progress_text(0);
			},
			error: function(xhr) {
				// Oops! Somthing went wrong... Checking the response code
				switch (xhr.status) {
					case 404:
						show_noti(0, "<b>404 </b>Site does not exist, check the URL");
						break;
					case 500:
						show_noti(0, "<b>500 </b>There's currently a problem with that server. Try again later");
						break;
					default:
						show_noti(0, "<b>Oops! </b>Request timed out! Try again");
						break;
				}

				// Resetting the progress
				show_progress_text(0);
			}
		});
	}
}

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

// Function for showing progress
function show_progress_text(active, text) {
	// Declaring the text box
	var show_progress = $("#progress_text");
	// Checking active bit
	switch (active) {
		case 0:
			show_progress.text("");
			break;			
		case 1:
			show_progress.text(text);
			break;
		default:
			show_progress.text("");
			break;
	}
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