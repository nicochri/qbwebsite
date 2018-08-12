function changeBackground1() {
	var el1 = document.getElementById('option1');
	el1.style.backgroundImage = "url('/static/clickedCircle.png')";
	var el2 = document.getElementById('option2');
	var el2div = document.getElementById('option2div');
	el2.style.backgroundImage = "url('/static/ring.png')";
	el2div.classList.remove("active");
	var el3 = document.getElementById('option3');
	var el3div = document.getElementById('option3div');
	el3div.classList.remove("active");
	el3.style.backgroundImage = "url('/static/ring.png')";
	var el4 = document.getElementById('option4');
	var el4div = document.getElementById('option4div');
	el4.style.backgroundImage = "url('/static/ring.png')";
	el4div.classList.remove("active");
}

function changeBackground2() {
	var el1 = document.getElementById('option1');
	var el1div = document.getElementById('option1div');
	el1.style.backgroundImage = "url('/static/ring.png')";
	el1div.classList.remove("active");
	var el2 = document.getElementById('option2');
	el2.style.backgroundImage = "url('/static/clickedCircle.png')";
	var el3 = document.getElementById('option3');
	el3.style.backgroundImage = "url('/static/ring.png')";
	var el3div = document.getElementById('option3div');
	el3div.classList.remove("active");
	el3.style.backgroundImage = "url('/static/ring.png')";
	var el4 = document.getElementById('option4');
	var el4div = document.getElementById('option4div');
	el4.style.backgroundImage = "url('/static/ring.png')";
	el4div.classList.remove("active");
}

function changeBackground3() {
	var el1 = document.getElementById('option1');
	var el1div = document.getElementById('option1div');
	el1.style.backgroundImage = "url('/static/ring.png')";
	el1div.classList.remove("active");
	var el2 = document.getElementById('option2');
	var el2div = document.getElementById('option2div');
	el2.style.backgroundImage = "url('/static/ring.png')";
	el2div.classList.remove("active");
	var el3 = document.getElementById('option3');
	el3.style.backgroundImage = "url('/static/clickedCircle.png')";
	var el4 = document.getElementById('option4');
	var el4div = document.getElementById('option4div');
	el4.style.backgroundImage = "url('/static/ring.png')";
	el4div.classList.remove("active");
}

function changeBackground4() {
	var el1 = document.getElementById('option1');
	var el1div = document.getElementById('option1div');
	el1.style.backgroundImage = "url('/static/ring.png')";
	el1div.classList.remove("active");
	var el2 = document.getElementById('option2');
	var el2div = document.getElementById('option2div');
	el2.style.backgroundImage = "url('/static/ring.png')";
	el2div.classList.remove("active");
	var el3 = document.getElementById('option3');
	var el3div = document.getElementById('option3div');
	el3div.classList.remove("active");
	var el4 = document.getElementById('option4');
	el3.style.backgroundImage = "url('/static/ring.png')";
	el4.style.backgroundImage = "url('/static/clickedCircle.png')";
}

function innerCircle(optionNumber) {
	var option1 = document.getElementById('option1');
	if (optionNumber == 1) {
		if (!option1.style.backgroundImage.includes("clickedCircle")) {
			option1.style.backgroundImage = "url('/static/hoverCircle.png')";
		}
	}

	else if (optionNumber == 2) {
		if (!option2.style.backgroundImage.includes("clickedCircle")) {
			option2.style.backgroundImage = "url('/static/hoverCircle.png')";
		}
	}

}

function innerCircleOff(optionNumberOff) {
	var el1 = document.getElementById('option1');
	if (optionNumber == 1) {
		if (!option1.style.backgroundImage.includes("clickedCircle")) {
			option1.style.backgroundImage = "url('/static/ring.png')";
		}
	}

	else if (optionNumber == 2) {
		if (!option2.style.backgroundImage.includes("clickedCircle")) {
			option2.style.backgroundImage = "url('/static/hoverCircle.png')";
		}
	}
}

// function questionBox(questionNumber) {
// 	document.getElementsByClassName('showQuestion1')[0].remove();
// 	document.getElementsByClassName('showQuestion1')[1].remove();
// 	var h1 = document.getElementById('hint1');
// 	var cm1 = document.getElementById('commonMistakes1');
// 	var q2 = document.getElementsByClassName('showQuestion2');

// 	if (questionNumber == 1) {
// 		document.getElementsByClassName('showQuestion2')[0].remove();
// 		document.getElementsByClassName('showQuestion2')[1].remove();
// 	}

// 	else if (questionNumber == 2) {
// 		document.getElementsByClassName('showQuestion1')[0].remove();
// 		document.getElementsByClassName('showQuestion1')[1].remove();
// 	}
// }


// var myImage = document.querySelector('img');

// myImage.onclick = function() {
//     var mySrc = myImage.getAttribute('src');
//     if(mySrc === 'images/firefox-icon.png') {
//       myImage.setAttribute ('src','images/firefox2.png');
//     } else {
//       myImage.setAttribute ('src','images/firefox-icon.png');
//     }
// }













