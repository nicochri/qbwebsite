function renderLoggedIn(user) {


	var signinDiv = document.getElementById('signinDiv');
	const accountLink = document.createElement('btn');
	accountLink.className = 'btn btn-outline-danger';
	accountLink.style = "width: 100px;"
	accountLink.innerHTML = 'Log out'
	signinDiv.appendChild(accountLink);

	var els = document.getElementsByClassName('notLoggedIn');
	els[0].remove();
	els[1].remove();
}

function mainNewNavbar() {
	var status = document.getElementById('LogInStatusHead').innerHTML;
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

function mainNabar() {
	var status = document.getElementById('logInStatus');
		var url = "{{url}}";
		console.log('this is ther motuerfucking url: ', url);
	if (status.innerHTML == 'Logged in') {

		// location.href = "http://localhost:3000/account";
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
		console.log('Not logged in ');
	}

	get('/api/whoami', {}, function(user) {
	    if (user._id) {
	    	renderLoggedIn(user);
	    }
	    else {
	    	var els = document.getElementsByClassName('LoggedIn');
			els[0].remove();
	    }
  });
}
