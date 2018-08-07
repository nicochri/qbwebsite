function savePayment(user, code) {
	const data = {
		content: code,
	};
	post('/api/qbinstance', data);
}

function handleUser(user){
	if (!user._id) {
		console.log('logged out');
		const loggedInDiv = document.getElementById('loggedInDiv');
		loggedInDiv.style.display = 'none';
	}

	const code = document.getElementById('ACCESS_CODE');

	if (code && window.location.href.toString().split(window.location.host)[1] === '/charge') {
		savePayment(user, code.innerHTML);
	}
}

function mainCharge(){
	get('/api/whoami', {}, function(user) {
    	handleUser(user);
	});
}

mainCharge();