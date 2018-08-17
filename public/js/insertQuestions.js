$(document).ready(function(){
	//Create question sidebar element
	var question = document.createElement("a");
	question.setAttribute("class", "list-group-item list-group-item-action");
	question.setAttribute("id", "list-halla-list");
	question.setAttribute("data-toggle", "list");
	question.setAttribute("href", "#list-halla");
	question.setAttribute("role", "tab");
	question.setAttribute("aria-controls", "settings");
	question.innerHTML = "Halla";
    
	//Create question div
	var questionDiv = document.createElement("a");
	questionDiv.setAttribute("class", "tab-pane fade");
	questionDiv.setAttribute("id", "list-halla");
	questionDiv.setAttribute("role", "tabpanel");
	questionDiv.setAttribute("aria-controls", "list-halla-list");

	var header = document.createElement("p");
	header.setAttribute("id", "header");
	header.innerHTML = "If $ax^2+bx+c=0$, then $x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$. When $a \\ne 0$, there are two solutions to \\(ax^2 + bx + c = 0\\) and they are $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$";

	//Append elements
    $('#list-tab').append(question);
    $('#nav-tabContent-questions').append(questionDiv);
	$('#list-halla').append(header);
    //
    // var math = document.getElementById("header");
	// $('#header').html("If $ax^2+bx+c=0$, then $x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$.");
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,header]);
});