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

		$('#optionA').html(question.options.A);
		$('#optionB').html(question.options.B);
		$('#optionC').html(question.options.C);
		$('#optionD').html(question.options.D);
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

	    $('#optionA').html(question.options.A);
		$('#optionB').html(question.options.B);
		$('#optionC').html(question.options.C);
		$('#optionD').html(question.options.D);
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













