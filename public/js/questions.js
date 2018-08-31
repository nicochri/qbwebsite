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

// Add functionality to the option buttons
$('#optionA-chapter' + currentChapterGlobal).click(function() {
    $('#optionA-chapter' + currentChapterGlobal).removeClass('btn-outline-secondary').addClass('btn-secondary');
    $('#optionB-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionC-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionD-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');

    selectedOptionGlobal = 'A';
    $('#checkAnswer-chapter' + currentChapterGlobal).prop('disabled', false);
    $('#checkAnswer-chapter' + currentChapterGlobal).css('opacity', 1.00);
    console.log('yes mate')
})

$('#optionB-chapter' + currentChapterGlobal).click(function() {
    $('#optionB-chapter' + currentChapterGlobal).removeClass('btn-outline-secondary').addClass('btn-secondary');
    $('#optionA-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionC-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionD-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');

    selectedOptionGlobal = 'B';
    $('#checkAnswer-chapter' + currentChapterGlobal).prop('disabled', false);
    $('#checkAnswer-chapter' + currentChapterGlobal).css('opacity', 1.00);
})

$('#optionC-chapter' + currentChapterGlobal).click(function() {
    $('#optionC-chapter' + currentChapterGlobal).removeClass('btn-outline-secondary').addClass('btn-secondary');
    $('#optionA-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionB-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionD-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');

    selectedOptionGlobal = 'C';
    $('#checkAnswer-chapter' + currentChapterGlobal).prop('disabled', false);
    $('#checkAnswer-chapter' + currentChapterGlobal).css('opacity', 1.00);
})

$('#optionD-chapter' + currentChapterGlobal).click(function() {
    $('#optionD-chapter' + currentChapterGlobal).removeClass('btn-outline-secondary').addClass('btn-secondary');
    $('#optionA-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionB-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionC-chapter' + currentChapterGlobal).removeClass('btn-secondary').addClass('btn-outline-secondary');

    selectedOptionGlobal = 'D';
    $('#checkAnswer-chapter' + currentChapterGlobal).prop('disabled', false);
    $('#checkAnswer-chapter' + currentChapterGlobal).css('opacity', 1.00);
})

$('#checkAnswer-chapter' + currentChapterGlobal).click(function() {
    if (selectedOptionGlobal != 'undefined' && correctOptionGlobal != 'undefined') {
        //Prepare db data
        const dbData = {
            questionId: currentQuestionId,
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
        QBUserData.push({ question_id: currentQuestionId, correct: dbData.correct });

        updateQuestionStats(currentQuestionId);
    }
})