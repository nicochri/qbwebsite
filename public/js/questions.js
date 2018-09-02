function renderQuestions(logInsStatus) {
    if (logInsStatus == 'in') {
        //Question and solution central div
        var QandACols = document.getElementsByClassName('QandACol');
        for (var i = 0; i < QandACols.length; i++) {
            QandACols[i].classList.remove('d-none');
        }

        //Right side multiple choice divs
        var optionCols = document.getElementsByClassName('optionCol');
        for (var i = 0; i < optionCols.length; i++) {
            optionCols[i].classList.remove('d-none');
        }
        
        document.getElementById('otherSignIn').classList.add('d-none');
        var signIns = document.getElementsByClassName('forceSignIn');
        for (var i = 0; i < signIns.length; i++) {
            signIns[i].classList.add('d-none');
        }
    }
    else {
        //Question and solution central div
        var QandACols = document.getElementsByClassName('QandACol');
        for (var i = 0; i < QandACols.length; i++) {
            QandACols[i].classList.add('d-none');
        }

        //Right side multiple choice divs
        var optionCols = document.getElementsByClassName('optionCol');
        for (var i = 0; i < optionCols.length; i++) {
            optionCols[i].classList.add('d-none');
        }

        document.getElementsByClassName('forceSignIn')[0].classList.remove('d-none');
    }
}

var selectedOptionGlobal = 'undefined';

//General option button click function
function optionChapterClick(remove, add) {
    $('#optionA-chapter' + currentChapterGlobal).removeClass(remove[0]).addClass(add[0]);
    $('#optionB-chapter' + currentChapterGlobal).removeClass(remove[1]).addClass(add[1]);
    $('#optionC-chapter' + currentChapterGlobal).removeClass(remove[2]).addClass(add[2]);
    $('#optionD-chapter' + currentChapterGlobal).removeClass(remove[3]).addClass(add[3]);

    $('#checkAnswer-chapter' + currentChapterGlobal).prop('disabled', false);
    $('#checkAnswer-chapter' + currentChapterGlobal).css('opacity', 1.00);
}

//General check Answer Click Function
function checkAnswerClick() {
    if (selectedOptionGlobal != 'undefined' && correctOptionGlobal != 'undefined') {
        //Prepare db data
        const dbData = {
            questionId: currentQuestionIds[parseInt(currentChapterGlobal) - 1],
            correct: 'undefined',
        };       

        //See if correct
        if (selectedOptionGlobal == correctOptionGlobal) {
            $('#option' + correctOptionGlobal + '-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-success');
            dbData.correct = 'y';
        }
        else {
            $('#option' + correctOptionGlobal + '-chapter' + currentChapterGlobal).removeClass('btn-outline-secondary').addClass('btn-success');
            $('#option' + selectedOptionGlobal + '-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-danger');
            dbData.correct = 'n';
        }

        //update visuals
        $('#option' + correctOptionGlobal + '-chapter' + currentChapterGlobal).css('box-shadow', '0 0 0 0.2rem rgba(40,167,69,0.5)');
        $('#option' + correctOptionGlobal + '-chapter' + currentChapterGlobal).prop('disabled', true);
        $('#option' + correctOptionGlobal + '-chapter' + currentChapterGlobal).css('opacity', 1.00);

        $('#option' + selectedOptionGlobal + '-chapter' + currentChapterGlobal).prop('disabled', true);
        $('#option' + selectedOptionGlobal + '-chapter' + currentChapterGlobal).css('opacity', 1.00);

        var possibleOptions = ['A', 'B', 'C', 'D'];
        for (var i = 0; i < 4; i++) {
            if (possibleOptions[i] != selectedOptionGlobal && possibleOptions[i] != correctOptionGlobal) {
                $('#option' + possibleOptions[i] + '-chapter' + currentChapterGlobal).prop('disabled', true);
                $('#option' + possibleOptions[i] + '-chapter' + currentChapterGlobal).css('opacity', 1.00);
            }
        }

        $('#checkAnswer-chapter' + currentChapterGlobal).prop('disabled', true);
        $('#checkAnswer-chapter' + currentChapterGlobal).css('opacity', 1.00);

        $('#solution-tab-chapter' + currentChapterGlobal).css("pointer-events","auto");
        $('#solution-tab-chapter' + currentChapterGlobal).removeClass("disabled");
        $('#solution-tab-chapter' + currentChapterGlobal).trigger('click');

        //DB updates
        post('/api/story', dbData);
        QBUserData.push({ question_id: currentQuestionIds[parseInt(currentChapterGlobal) - 1], correct: dbData.correct });

        updateQuestionStats(currentQuestionIds[parseInt(currentChapterGlobal) - 1]);
    }
}

// Add functionality to the chapter 1 option buttons
$('#optionA-chapter' + "1").click(function() {
    optionChapterClick(
        ['btn-outline-secondary', 'btn-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'A';
})

$('#optionB-chapter' + "1").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'B';
})

$('#optionC-chapter' + "1").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-ouline-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'C';
})

$('#optionD-chapter' + "1").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-secondary', 'btn-outline-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary']
    )

    selectedOptionGlobal = 'D';
})

// Add functionality to the chapter 2 option buttons
$('#optionA-chapter' + "2").click(function() {
    optionChapterClick(
        ['btn-outline-secondary', 'btn-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'A';
})

$('#optionB-chapter' + "2").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'B';
})

$('#optionC-chapter' + "2").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-ouline-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'C';
})

$('#optionD-chapter' + "2").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-secondary', 'btn-outline-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary']
    )

    selectedOptionGlobal = 'D';
})

//Add functionality to the check answer
$('#checkAnswer-chapter' + "1").click(function() {
    checkAnswerClick();
})

$('#checkAnswer-chapter' + "2").click(function() {
    checkAnswerClick();
})