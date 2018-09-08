function renderNavbar(status) {
	// var status = document.getElementById('LogInStatusHead').innerHTML;
	if (status == 'in') {
		// add logged in elements  
		var loggedInElements = document.getElementsByClassName('LoggedIn');
		var numElements = loggedInElements.length;
		for (var i = 0; i < numElements; i++) {
		    loggedInElements[i].classList.remove("d-none");
		}

		// remove the not logged in elements
		var loggedOutElements = document.getElementsByClassName('LoggedOut');
		var numElements = loggedOutElements.length;
		for (var i = 0; i < numElements; i++) {
		    loggedOutElements[i].classList.add("d-none");
		}
	}
	else {
		// remove logged in elements  
		var loggedInElements = document.getElementsByClassName('LoggedIn');
		var numElements = loggedInElements.length;
		for (var i = 0; i < numElements; i++) {
		    loggedInElements[i].classList.add("d-none");
		}

		// remove the not logged in elements
		var loggedOutElements = document.getElementsByClassName('LoggedOut');
		var numElements = loggedOutElements.length;
		for (var i = 0; i < numElements; i++) {
		    loggedOutElements[i].classList.remove("d-none");
		}
	}
}