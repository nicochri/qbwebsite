var userGlobal = {};
var userCurrency = 'USD';

function setPaymentPriceOld() {
	$.get("http://ipinfo.io", function (response) {
		if (response.country in countryCodeToCurrency && true) {
			userCurrency = countryCodeToCurrency[response.country];
			$('#mathHLPrice').html(countryCodeToPriceDisplay[response.country]);
		}
		else {
			$('#mathHLPrice').html('$4,99');
		}

		document.getElementById('body').classList.remove('d-none');

	}, "jsonp");
}


var countryCodeToData = {
"AR": {c: "ARS", 	d: "$ ",	p: "169,00"},
"AU": {c: "AUD", 	d: "$ ",	p: "6,49"},
"AT": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"BH": {c: "BHD", 	d: "", 		p: "1,69"},
"BD": {c: "BDT", 	d: "", 		p: "399,00"},
"BE": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"BR": {c: "BRL", 	d: "R$ ",	p: "14,99"},
"BG": {c: "BGN", 	d: "", 		p: "3,99"},
"CM": {c: "XAF", 	d: "", 		p: "999,00"},
"CA": {c: "CAD", 	d: "", 		p: "6,69"},
"CL": {c: "CLP", 	d: "$ ", 	p: "2000,00"},
"CN": {c: "CNY", 	d: "¥ ", 	p: "19,00"},
"CO": {c: "COP", 	d: "", 		p: "3999,00"},
"CR": {c: "CRC", 	d: "", 		p: "1899,00"},
"CY": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"CZ": {c: "CZK", 	d: " Kč", 	p: "79,00"},
"DK": {c: "DKK", 	d: "kr. ", 	p: "39,00"},
"EC": {c: "USD", 	d: "", 		p: "3,99"},
"EG": {c: "EGP", 	d: "", 		p: "9,99"},
"SV": {c: "USD", 	d: "", 		p: "3,99"},
"EE": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"FI": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"FR": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"DE": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"GH": {c: "GHS", 	d: "", 		p: "6,99"},
"GR": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"GT": {c: "GTQ", 	d: "", 		p: "19,00"},
"HK": {c: "HKD", 	d: "HK$ ", 	p: "29,00"},
"HU": {c: "HUF", 	d: " Ft", 	p: "799,00"},
"IN": {c: "INR", 	d: "₹ ", 	p: "99,00"},
"IN": {c: "IDR", 	d: "₹ ", 	p: "24.995,00"},
"IE": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"IT": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"JP": {c: "JPY", 	d: "¥ ", 	p: "499,00"},
"JO": {c: "JOD", 	d: "", 		p: "1,49"},
"KZ": {c: "KZT", 	d: "", 		p: "549,00"},
"KE": {c: "KES", 	d: "", 		p: "229,00"},
"LV": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"LB": {c: "LBP", 	d: "", 		p: "3999,00"},
"LT": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"LU": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"MY": {c: "MYR", 	d: "RM ", 	p: "8,99"},
"MX": {c: "MXN", 	d: "$ ", 	p: "49,99"},
"MA": {c: "MAD", 	d: "", 		p: "19,00"},
"NL": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"NZ": {c: "NZD", 	d: "$ ", 	p: "8,99"},
"NG": {c: "NGN", 	d: "", 		p: "599,00"},
"NO": {c: "NOK", 	d: "kr ", 	p: "49,00"},
"PK": {c: "PKR", 	d: "", 		p: "149,00"},
"PE": {c: "PEN", 	d: "", 		p: "8,99"},
"PH": {c: "PHP", 	d: "",	 	p: "99,00"},
"PL": {c: "PLN",	d: " zł", 	p: "8,99"},
"PT": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"QA": {c: "QAR", 	d: "", 		p: "9,00"},
"RO": {c: "RON", 	d: "", 		p: "8,99"},
"RU": {c: "RUB", 	d: " p.", 	p: "119,00"},
"SA": {c: "SAR", 	d: "", 		p: "9,49"},
"RS": {c: "RSD", 	d: "", 		p: "249,00"},
"SG": {c: "SGD", 	d: "$ ", 	p: "5,99"},
"ES": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"SK": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"SI": {c: "EUR", 	d: "€ ", 	p: "3,99"},
"SE": {c: "SEK", 	d: " kr", 	p: "49,00"},
"CH": {c: "CHF", 	d: "fr. ", 	p: "6,99"},
"TH": {c: "THB", 	d: " ฿", 	p: "59,00"},
"TR": {c: "TRY", 	d: " ₺", 	p: "7,99"},
"AE": {c: "AED", 	d: "", 		p: "14,99"},
"UK": {c: "GBP", 	d: "£ ", 	p: "3,99"},
"US": {c: "USD", 	d: "$ ", 	p: "3,99"},
"UY": {c: "UYU", 	d: "", 		p: "114,95"},
"VE": {c: "VEF", 	d: "", 		p: "295,00"},
};


function setPaymentPrice() {
	$.get("http://ipinfo.io", function (response) {
		if (response.country in countryCodeToData && true) {
			userCurrency = countryCodeToData[response.country].c;
			console.log(userCurrency);

			var priceTag = '';
			if (countryCodeToData[response.country].d != "") {
				if (countryCodeToData[response.country].d.charAt(0) == " ") {
					priceTag = countryCodeToData[response.country].p + countryCodeToData[response.country].d;
				}
				else {
					priceTag = countryCodeToData[response.country].d + countryCodeToData[response.country].p;
				}
			}
			else {
				priceTag = countryCodeToData[response.country].p + ' ' + countryCodeToData[response.country].c;
			}
			$('#mathHLPrice').html(priceTag);
		}
		else {
			$('#mathHLPrice').html('3,99 USD');
		}

		document.getElementById('body').classList.remove('d-none');

	}, "jsonp");
}


function main() {
    get('/api/whoami', {}, function(user) {
		if (user._id) {
			userGlobal = user;
			document.getElementById('body').classList.remove('d-none')
			renderNavbar('in');

			//Check if on the questions page
			if (document.getElementById('questionspageloaded') != null) {
				renderQuestions('in');				
			}
			//If on payment page
			else if (document.getElementById('paymentpageloaded') != null) {
				console.log('4242424242424242');
				renderPayment('in');
				setPaymentPrice();
			}
			else if (document.getElementById('accountpageloaded') != null) {
				document.getElementById('body').classList.remove('d-none');
				document.getElementById('signInDiv').classList.add('d-none');
				document.getElementById('accountPageContent').classList.remove('d-none');

				if (user.desiredQB == 'none'){
					$('#desiredQBDivNone').removeClass('d-none');
					$('#desiredQBDiv').addClass('d-none');
				}
				else {
					$('#desiredQBDivNone').addClass('d-none');
					$('#desiredQBDiv').removeClass('d-none');
					var displayCourseTitle = {physicsHL: 'Physics HL', chemistryHL: 'Chemistry HL', economicsHL: 'Economics HL', mathsSL: 'Mathematics SL', physicsSL: 'Physics SL', chemistrySL: 'Chemistry SL', economicsSL: 'Economics SL'};var displayCourseTitle = {physicsHL: 'Physics HL', chemistryHL: 'Chemistry HL', economicsHL: 'Economics HL', mathsSL: 'Mathematics SL', physicsSL: 'Physics SL', chemistrySL: 'Chemistry SL', economicsSL: 'Economics SL'};
					$('#desiredQBSpan').html(displayCourseTitle[user.desiredQB]);
				}
				
				$('#' + user.desiredQB).attr('state', 'selected');
				$('#' + user.desiredQB).css('border', '5px solid #d2a807');
				$('#displayName').html(user.name);
				if (user.mathHL == 'y') {
					$('#subscribedStatus').html('Subscribed');
					$('#qbOwned').html('Mathematics HL<p id="unsubscribeLink" class="text-center mb-2" style="font-size: 14px;">(Unsubscribe)</p>');
					document.getElementById('unsubscribeLink').onclick = function(){
						swal({
						  title: 'Are you sure?',
						  text: "All of your Maths HL data will be lost!",
						  type: 'warning',
						  showCancelButton: true,
						  confirmButtonColor: '#3085d6',
						  cancelButtonColor: '#d33',
						  confirmButtonText: 'Yes, unsubscribe!'
						}).then((result) => {
						  if (result.value) {
						    swal({
						      title: 'Unsubscribed!',
						      text: 'You have been unsubscribed from the Mathematics HL question bank.',
						      type: 'success'
						    }).then((result) => {
						    	if (result.value) {
						    		get('/api/cancelSubscription', {}, function(res) {
						    			location.reload();
						    		});
						    	}
						    });
						  }
						});
					};
				}
				else {
					$('#subscribedStatus').html('Not Subscribed');
					$('#qbOwned').html('None');
				}
			}
		}
		else {
			renderNavbar('out');

			if (document.getElementById('homepageloaded') != null) {
				document.getElementById('body').classList.remove('d-none');	
			}
			//If on questions page
			else if (document.getElementById('questionspageloaded') != null) {
				renderQuestions('out');	
			}
			//If on payment page
			else if (document.getElementById('paymentpageloaded') != null) {
				renderPayment('out');
				setPaymentPrice();
			}
			else if (document.getElementById('accountpageloaded') != null) {
				document.getElementById('body').classList.remove('d-none');
				document.getElementById('signInDiv').classList.remove('d-none');
				document.getElementById('accountPageContent').classList.add('d-none');
			}
		}
  	});
}

main();