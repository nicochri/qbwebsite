function renderPayment(loggedInStatus) {
	if (loggedInStatus == 'in') {
		$('#stripePaymentDiv').removeClass('d-none');
		$('#signInDiv').addClass('d-none');
	}
	else if (loggedInStatus == 'out') {
		$('#stripePaymentDiv').addClass('d-none');
		$('#signInDiv').removeClass('d-none');
	}
}