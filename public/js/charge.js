function savePayment(user) {
	const data = {
		content: 'This payment turned out to be successful',
	};

	post('/api/story', data);
}

function handleUser(user){
	if (user._id) {
		console.log('logged in');
	}
	else {
		console.log('logged out');
		const loggedInDiv = document.getElementById('loggedInDiv');
		loggedInDiv.style.display = 'none';
	}

	const hasPaid = document.getElementById('SECRET_CODE');

	if (hasPaid && window.location.href.toString().split(window.location.host)[1] === '/charge') {
		console.log('it fucking worked mate');
		savePayment(user);
	}
}

function mainCharge(){
	get('/api/whoami', {}, function(user) {
    	handleUser(user);
	});
}

mainCharge();