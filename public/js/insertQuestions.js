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

    $('#checkAnswer').prop('disabled', true);
    $('#checkAnswer').css('opacity', 0.65);

    $('#solution-tab').css("pointer-events","none");
	$('#solution-tab').addClass('disabled');
	$('#question-tab').trigger('click');
}

var correctOptionGlobal = 'undefined';

function addQuestion(questionId, questionNumber, question) {
	//Create question sidebar element
	var questionSidebar = document.createElement("a");
	questionSidebar.setAttribute("class", "list-group-item list-group-item-action");
	questionSidebar.setAttribute("id", "list-" + questionId + "-list");
	questionSidebar.setAttribute("data-toggle", "list");
	questionSidebar.setAttribute("href", "#list-" + questionId);
	questionSidebar.setAttribute("role", "tab");
	questionSidebar.setAttribute("aria-controls", "settings");
	questionSidebar.innerHTML = questionNumber + ". " + question.title;
    
	//Create question div
	var questionDiv = document.createElement("a");
	questionDiv.setAttribute("class", "tab-pane");
	questionDiv.setAttribute("id", "list-" + questionId);
	questionDiv.setAttribute("role", "tabpanel");
	questionDiv.setAttribute("aria-controls", "list-" + questionId + "-list");

	var questionParagraph = document.createElement("p");
	questionParagraph.setAttribute("id", "thequestion");
	questionParagraph.setAttribute("style", "display: block;");
	questionParagraph.innerHTML = question.text;

	var solutionParagraph = document.createElement("p");
	solutionParagraph.setAttribute("id", "thesolution");
	solutionParagraph.setAttribute("style", "display: none;");
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
	}

	//Append elements
    $('#list-tab').append(questionSidebar);
    $('#nav-tabContent-questions').append(questionDiv);
	$('#list-' + questionId).append(questionParagraph);
	$('#list-' + questionId).append(solutionParagraph);

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
	});

    //If question is selected
	$("#question-tab").click(function() {
		questionParagraph.setAttribute("style", "display: block;");
		solutionParagraph.setAttribute("style", "display: none;");
	});

	//If solution is selected
	$("#solution-tab").click(function() {
		questionParagraph.setAttribute("style", "display: none;");
		solutionParagraph.setAttribute("style", "display: block;");
	});
}

$(document).ready(function(){
	var questionNumber = 1;

	if (!userGlobal.mathHL || userGlobal.mathHL == 'n') {
		$.getJSON( "/static/js/jsondata.js", function( data ) {
	    	$.each(data, function(key, val) {
	    		addQuestion(key, questionNumber, val);
	    		questionNumber = questionNumber + 1;
	    	});
	    });
	}
	else {
		console.log('he has access to all questions');
		$.getJSON( "/static/js/jsondata2.js", function( data ) {
	    	$.each(data, function(key, val) {
	    		addQuestion(key, questionNumber, val);
	    		questionNumber = questionNumber + 1;
	    	});
	    });
	}
});
