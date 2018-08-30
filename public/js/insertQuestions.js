function resetOptionButtons() {
    $('#optionA').removeClass('btn-secondary btn-success btn-danger').addClass('btn-outline-secondary');
    $('#optionB').removeClass('btn-secondary btn-success btn-danger').addClass('btn-outline-secondary');
    $('#optionC').removeClass('btn-secondary btn-success btn-danger').addClass('btn-outline-secondary');
    $('#optionD').removeClass('btn-secondary btn-success btn-danger').addClass('btn-outline-secondary');

    $('#optionA').prop('disabled', false);
    $('#optionB').prop('disabled', false);
    $('#optionC').prop('disabled', false);
    $('#optionD').prop('disabled', false);

    $('#optionA').css('opacity', 1.00);
    $('#optionB').css('opacity', 1.00);
    $('#optionC').css('opacity', 1.00);
    $('#optionD').css('opacity', 1.00);

    $('#optionA').css('box-shadow', '0 0 0 0.2rem white');
    $('#optionB').css('box-shadow', '0 0 0 0.2rem white');
    $('#optionC').css('box-shadow', '0 0 0 0.2rem white');
    $('#optionD').css('box-shadow', '0 0 0 0.2rem white');

    $('#checkAnswer').prop('disabled', true);
    $('#checkAnswer').css('opacity', 1.00);

    $('#solution-tab').css("pointer-events","none");
	$('#solution-tab').addClass('disabled');
	$('#question-tab').trigger('click');
}

var currentQuestionId = 'undefined';
var correctOptionGlobal = 'undefined';
var QBUserData = [];

function updateQuestionStats(questionId) {
	//Counters
	timesAnswered = 0;
	correctCount = 0;
	
	//Count
	for (var i = 0; i < QBUserData.length; i++) {
	    if (QBUserData[i].question_id == questionId) {
	    	timesAnswered = timesAnswered + 1;
	    	if (QBUserData[i].correct == 'y') {
	    		correctCount = correctCount + 1;
	    	}
	    }
	}

	//Get nice correct percentage
	if (0 == timesAnswered) {
		correctPercentage = 0;
	}
	else if (correctCount == timesAnswered) {
		correctPercentage = 100;
	}
	else {
		correctPercentage = Math.floor(correctCount/timesAnswered*100);
	}

	//Set everything Math.floor(correctCount/timesAnswered)
	$('#timesAnswered').html(timesAnswered);
	$('#correctPercentage').html(correctPercentage);
}

function addQuestion(questionId, questionNumber, question) {
	//Create question sidebar element
	var questionSidebar = document.createElement("a");
	questionSidebar.setAttribute("class", "list-group-item list-group-item-action " + question.difficulty);
	questionSidebar.setAttribute("id", "list-" + questionId + "-list");
	questionSidebar.setAttribute("data-toggle", "list");
	questionSidebar.setAttribute("href", "#list-" + questionId);
	questionSidebar.setAttribute("role", "tab");
	questionSidebar.setAttribute("aria-controls", "settings");
	questionSidebar.innerHTML = question.title;

	//Create question badge
	var questionBadge = document.createElement("span");
	questionBadge.setAttribute('style', 'width: 25px; vertical-align: top; margin-top: 3px; margin-right: 8px;');
	questionBadge.setAttribute('class', 'badge badge-' + question.difficulty);
	questionBadge.innerHTML = questionNumber;
    
	//Create question div
	var questionDiv = document.createElement("a");
	questionDiv.setAttribute("class", "tab-pane");
	questionDiv.setAttribute("id", "list-" + questionId);
	questionDiv.setAttribute("role", "tabpanel");
	questionDiv.setAttribute("aria-controls", "list-" + questionId + "-list");

	var questionParagraph = document.createElement("p");
	questionParagraph.setAttribute("id", "thequestion");
	questionParagraph.setAttribute("style", "display: block; padding: 5px;");
	questionParagraph.innerHTML = question.text;

	var solutionParagraph = document.createElement("p");
	solutionParagraph.setAttribute("id", "thesolution");
	solutionParagraph.setAttribute("style", "display: none; padding: 5px;");
	solutionParagraph.innerHTML = question.solution;

	if (questionNumber == 1) {
		questionSidebar.classList.add("active");
		questionDiv.classList.add("active");
		questionDiv.classList.add("show");

		resetOptionButtons();
		$('#optionA').html(question.options.A);
		$('#optionB').html(question.options.B);
		$('#optionC').html(question.options.C);
		$('#optionD').html(question.options.D);

		correctOptionGlobal = question.correctOption;
		currentQuestionId = questionId;

		updateQuestionStats(questionId);
	}

	//Append elements
    $('#list-tab').append(questionSidebar);
    $('#nav-tabContent-questions').append(questionDiv);
	$('#list-' + questionId).append(questionParagraph);
	$('#list-' + questionId).append(solutionParagraph);
	$("#list-" + questionId + "-list").prepend(questionBadge);

	//Render them nicely
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,questionParagraph]);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,solutionParagraph]);

    //Change option values if question is clicked
    $("#" + "list-" + questionId + "-list").click(function(){
    	$('#thesolution').html(question.solution);

    	resetOptionButtons()
	    $('#optionA').html(question.options.A);
		$('#optionB').html(question.options.B);
		$('#optionC').html(question.options.C);
		$('#optionD').html(question.options.D);

		correctOptionGlobal = question.correctOption;
		currentQuestionId = questionId;

		updateQuestionStats(questionId);
	});

    //If question is selected
	$("#question-tab").click(function() {
		questionParagraph.setAttribute("style", "display: block; padding: 5px;");
		solutionParagraph.setAttribute("style", "display: none; padding: 5px;");
	});

	//If solution is selected
	$("#solution-tab").click(function() {
		questionParagraph.setAttribute("style", "display: none; padding: 5px;");
		solutionParagraph.setAttribute("style", "display: block; padding: 5px;");
	});
}


$(document).ready(function(){
	var questionNumber = 1;

    get('/api/mathHLUserData', {}, function(data) {
    	QBUserData = data;
    	$.getJSON( "/static/js/jsondata.js", function( data ) {
    	$.each(data, function(key, val) {
    		addQuestion(key, questionNumber, val);
    		questionNumber = questionNumber + 1;
    	});
    });
    });
});
