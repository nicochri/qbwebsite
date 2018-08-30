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
	console.log(question.difficulty);
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
		currentQuestionId = questionId;
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

	$.getJSON( "/static/js/jsondata.js", function( data ) {
    	$.each(data, function(key, val) {
    		addQuestion(key, questionNumber, val);
    		questionNumber = questionNumber + 1;
    	});
    });

    // NEW
    get('/api/questions', {}, function(questions) {
    	if (Object.keys(questions).length > 0) {
    		console.log('insert questions');
    	}
    });
});
