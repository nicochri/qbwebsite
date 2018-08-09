function innerCircle(optionNumber) {
	if (optionNumber == 1) {
		var option1 = document.getElementById('option1');
		option1.style.backgroundImage = "url('/static/hoverCircle.png')";
	}
	
	else if (optionNumber == 2) {
		var option2 = document.getElementById('option2');
		option2.style.backgroundImage = "url('/static/hoverCircle.png')";
	}
	
	else if (optionNumber == 3) {
		var option3 = document.getElementById('option3');
		option3.style.backgroundImage = "url('/static/hoverCircle.png')";
	}
	
	else {
		var option4 = document.getElementById('option4');
		option4.style.backgroundImage = "url('/static/hoverCircle.png')";	
	}
	
}

function innerCircleOff(optionNumberOff) {
	if (optionNumberOff == 1) {
		var option1 = document.getElementById('option1');	
		option1.style.backgroundImage = "url('/static/ring.png')";
	}
	
	else if (optionNumberOff == 2) {
		var option2 = document.getElementById('option2');
		option2.style.backgroundImage = "url('/static/ring.png')";
	}
	
	else if (optionNumberOff == 3) {
		var option3 = document.getElementById('option3');
		option3.style.backgroundImage = "url('/static/ring.png')";
	}

	else {
		var option4 = document.getElementById('option4');
		option4.style.backgroundImage = "url('/static/ring.png')";
	}
}
