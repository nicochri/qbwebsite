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

	var questionPar = document.createElement("p");
	questionPar.setAttribute("id", "header");
	questionPar.innerHTML = question.text;

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
	$('#list-' + questionId).append(questionPar);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,questionPar]);

    //Change option values if question is clicked
    $("#" + "list-" + questionId + "-list").click(function(){
	    $('#optionA').html(question.options.A);
		$('#optionB').html(question.options.B);
		$('#optionC').html(question.options.C);
		$('#optionD').html(question.options.D);
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
});