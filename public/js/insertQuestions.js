function resetOptionButtons() {
    $('#optionA-chapter' + currentChapterGlobal).removeClass('btn-secondary btn-success btn-danger').addClass('btn-outline-secondary');
    $('#optionB-chapter' + currentChapterGlobal).removeClass('btn-secondary btn-success btn-danger').addClass('btn-outline-secondary');
    $('#optionC-chapter' + currentChapterGlobal).removeClass('btn-secondary btn-success btn-danger').addClass('btn-outline-secondary');
    $('#optionD-chapter' + currentChapterGlobal).removeClass('btn-secondary btn-success btn-danger').addClass('btn-outline-secondary');

    $('#optionA-chapter' + currentChapterGlobal).prop('disabled', false);
    $('#optionB-chapter' + currentChapterGlobal).prop('disabled', false);
    $('#optionC-chapter' + currentChapterGlobal).prop('disabled', false);
    $('#optionD-chapter' + currentChapterGlobal).prop('disabled', false);

    $('#optionA-chapter' + currentChapterGlobal).css('opacity', 1.00);
    $('#optionB-chapter' + currentChapterGlobal).css('opacity', 1.00);
    $('#optionC-chapter' + currentChapterGlobal).css('opacity', 1.00);
    $('#optionD-chapter' + currentChapterGlobal).css('opacity', 1.00);

    $('#optionA-chapter' + currentChapterGlobal).css('box-shadow', '0 0 0 0.2rem white');
    $('#optionB-chapter' + currentChapterGlobal).css('box-shadow', '0 0 0 0.2rem white');
    $('#optionC-chapter' + currentChapterGlobal).css('box-shadow', '0 0 0 0.2rem white');
    $('#optionD-chapter' + currentChapterGlobal).css('box-shadow', '0 0 0 0.2rem white');

    $('#checkAnswer-chapter' + currentChapterGlobal).prop('disabled', true);
    $('#checkAnswer-chapter' + currentChapterGlobal).css('opacity', 1.00);

    $('#solution-tab-chapter' + currentChapterGlobal).css("pointer-events","none");
	$('#solution-tab-chapter' + currentChapterGlobal).addClass('disabled');
	$('#question-tab-chapter' + currentChapterGlobal).trigger('click');
}

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
	$('#timesAnswered-chapter' + currentChapterGlobal).html(timesAnswered);
	$('#correctPercentage-chapter' + currentChapterGlobal).html(correctPercentage);
}

function addQuestion(questionId, questionNumber, question) {
	//Create question sidebar element
	var questionSidebar = document.createElement("a");
	questionSidebar.setAttribute("class", "list-group-item list-group-item-action " + question.difficulty);
	questionSidebar.setAttribute("id", "list-" + questionId + "-list");
	questionSidebar.setAttribute("data-toggle", "list");
	questionSidebar.setAttribute("href", "#list-" + questionId);
	questionSidebar.setAttribute("style", "border: 0px; padding-right: 12px; padding-left: 12px;");
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

	// NEW questionImage
	var questionImage = document.createElement("img");
	questionImage.setAttribute("id", "theimage");
	questionImage.setAttribute("style", "display: block; width: -webkit-fill-available; padding: 5px;");
	questionImage.setAttribute("src", "/static/dataplot.png");

	var questionParagraph = document.createElement("p");
	questionParagraph.setAttribute("id", "thequestion");
	questionParagraph.setAttribute("style", "display: block; padding: 5px; line-height: 3;");
	questionParagraph.innerHTML = question.text;

	var solutionParagraph = document.createElement("p");
	solutionParagraph.setAttribute("id", "thesolution");
	solutionParagraph.setAttribute("style", "display: none; padding: 5px; line-height: 3;");
	solutionParagraph.innerHTML = question.solution;

	if (questionNumber == 1) {
		questionSidebar.classList.add("active");
		questionDiv.classList.add("active");
		questionDiv.classList.add("show");

		resetOptionButtons();
		$('#optionA-chapter' + question.chapter).html(question.options.A);
		$('#optionB-chapter' + question.chapter).html(question.options.B);
		$('#optionC-chapter' + question.chapter).html(question.options.C);
		$('#optionD-chapter' + question.chapter).html(question.options.D);

		currentQuestionIds[parseInt(question.chapter) - 1] = questionId;

		if (parseInt(question.chapter) == 1) {
			correctOptionGlobal = question.correctOption;
			updateQuestionStats(questionId);
		}
	}

	//Append elements
    $('#list-tab-chapter' + question.chapter).append(questionSidebar);
    $('#nav-tabContent-questions-chapter' + question.chapter).append(questionDiv);
    $('#list-' + questionId).append(questionImage);
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
	    $('#optionA-chapter' + question.chapter).html(question.options.A);
		$('#optionB-chapter' + question.chapter).html(question.options.B);
		$('#optionC-chapter' + question.chapter).html(question.options.C);
		$('#optionD-chapter' + question.chapter).html(question.options.D);

		correctOptionGlobal = question.correctOption;
		currentQuestionIds[parseInt(question.chapter) - 1] = questionId;

		updateQuestionStats(questionId);

		if (getScreenWidth() <= 3) {
			document.getElementById('list-tab-chapter' + currentChapterGlobal).setAttribute('style', 'height: 50px;');
			document.getElementById('list-' + questionId + '-list').scrollIntoView();
			$('#questionDropdownButton-chapter' + currentChapterGlobal).attr('state','down');
			$('#questionDropdownButton-chapter' + currentChapterGlobal).html('&darr;');
		}

		//Render them nicely
	    MathJax.Hub.Queue(["Typeset",MathJax.Hub,questionParagraph]);
	    MathJax.Hub.Queue(["Typeset",MathJax.Hub,solutionParagraph]);
	});

    //If question is selected
	$("#question-tab-chapter" + question.chapter).click(function() {
		questionImage.setAttribute("style", "display: block; width: -webkit-fill-available; padding: 5px;");
		questionParagraph.setAttribute("style", "display: block; padding: 5px; line-height: 3;");
		solutionParagraph.setAttribute("style", "display: none; padding: 5px; line-height: 3;");
	});

	//If solution is selected
	$("#solution-tab-chapter" + question.chapter).click(function() {
		questionImage.setAttribute("style", "display: none; padding: 5px; line-height: 3;");
		questionParagraph.setAttribute("style", "display: none; padding: 5px; line-height: 3;");
		solutionParagraph.setAttribute("style", "display: block; padding: 5px; line-height: 3;");
	});

	console.log(correctOptionGlobal);
}


$(document).ready(function(){
	var questionNumbers = [1,1,1,1,1,1]; //currently support MAX 6 chapters

    get('/api/mathHLUserData', {}, function(data) {
    	QBUserData = data;

    	get('/api/questions', {}, function(questions) {
    		for (var i = 0; i < questions.length; i++) {
    			var chapterIndex = parseInt(questions[i].chapter) - 1;
		        addQuestion(questions[i].id, questionNumbers[chapterIndex], questions[i]);
    			questionNumbers[chapterIndex] = questionNumbers[chapterIndex] + 1;
		    }
			
	    });

    // 	$.getJSON( "/static/js/jsondata.js", function( data ) {
	   //  	$.each(data, function(key, val) {
	   //  		addQuestion(key, questionNumber, val);
	   //  		questionNumber = questionNumber + 1;
	   //  	});
	   //  });
    });
});
