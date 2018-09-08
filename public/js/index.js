userGlobal = {};

function main() {
    get('/api/whoami', {}, function(user) {
		if (user._id) {
			userGlobal = user;
			console.log(user);
			document.getElementById('body').classList.remove('d-none')
			renderNavbar('in');

			//Check if on the questions page
			if (document.getElementById('questionspageloaded') != null) {
				renderQuestions('in');				
			}
			//If on payment page
			else if (document.getElementById('paymentpageloaded') != null) {
				renderPayment('in');
				document.getElementById('body').classList.remove('d-none');
			}
			else if (document.getElementById('accountpageloaded') != null) {
				document.getElementById('body').classList.remove('d-none');
			}
		}
		else {
			renderNavbar('out');

			//If on questions page
			if (document.getElementById('questionspageloaded') != null) {
				renderQuestions('out');	
			}
			//If on payment page
			else if (document.getElementById('paymentpageloaded') != null) {
				renderPayment('out');
				document.getElementById('body').classList.remove('d-none');
			}
			else if (document.getElementById('accountpageloaded') != null) {
				document.getElementById('body').classList.remove('d-none');
			}
		}
  	});
}

main();