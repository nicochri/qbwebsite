function renderQuestions(logInsStatus) {
    if (logInsStatus == 'in') {
        document.getElementById('QandACol').classList.remove('d-none');
        document.getElementById('optionCol').classList.remove('d-none');
        
         document.getElementById('otherSignIn').classList.add('d-none');
        var signIns = document.getElementsByClassName('forceSignIn');
        for (var i = 0; i < signIns.length; i++) {
            signIns[i].classList.add('d-none');
        }
        
        if (userGlobal.mathHL == 'n') {
            var checkouts = document.getElementsByClassName('checkoutDiv');
            for (var i = 0; i < checkouts.length; i++) {
                checkouts[i].classList.remove('d-none');
            }
        }
    }
    else {
        document.getElementById('QandACol').classList.add('d-none');
        document.getElementById('optionCol').classList.add('d-none');
        document.getElementsByClassName('forceSignIn')[0].classList.remove('d-none');
    }
}

var selectedOptionGlobal = 'undefined';

// Add functionality to the option buttons
$('#optionA').click(function() {
    $('#optionA').removeClass('btn-outline-secondary').addClass('btn-secondary');
    $('#optionB').removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionC').removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionD').removeClass('btn-secondary').addClass('btn-outline-secondary');

    selectedOptionGlobal = 'A';
    $('#checkAnswer').prop('disabled', false);
    $('#checkAnswer').css('opacity', 1.00);
})

$('#optionB').click(function() {
    $('#optionB').removeClass('btn-outline-secondary').addClass('btn-secondary');
    $('#optionA').removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionC').removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionD').removeClass('btn-secondary').addClass('btn-outline-secondary');

    selectedOptionGlobal = 'B';
    $('#checkAnswer').prop('disabled', false);
    $('#checkAnswer').css('opacity', 1.00);
})

$('#optionC').click(function() {
    $('#optionC').removeClass('btn-outline-secondary').addClass('btn-secondary');
    $('#optionA').removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionB').removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionD').removeClass('btn-secondary').addClass('btn-outline-secondary');

    selectedOptionGlobal = 'C';
    $('#checkAnswer').prop('disabled', false);
    $('#checkAnswer').css('opacity', 1.00);
})

$('#optionD').click(function() {
    $('#optionD').removeClass('btn-outline-secondary').addClass('btn-secondary');
    $('#optionA').removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionB').removeClass('btn-secondary').addClass('btn-outline-secondary');
    $('#optionC').removeClass('btn-secondary').addClass('btn-outline-secondary');

    selectedOptionGlobal = 'D';
    $('#checkAnswer').prop('disabled', false);
    $('#checkAnswer').css('opacity', 1.00);
})

$('#checkAnswer').click(function() {
    if (selectedOptionGlobal != 'undefined' && correctOptionGlobal != 'undefined') {
        //Prepare db data
        const dbData = {
            questionId: currentQuestionId,
            correct: 'undefined',
        };       

        //See if correct
        if (selectedOptionGlobal == correctOptionGlobal) {
            $('#option' + correctOptionGlobal).removeClass('btn-secondary').addClass('btn-success');
            dbData.correct = 'y';
        }
        else {
            $('#option' + correctOptionGlobal).removeClass('btn-outline-secondary').addClass('btn-success');
            $('#option' + selectedOptionGlobal).removeClass('btn-secondary').addClass('btn-danger');
            dbData.correct = 'n';
        }

        //update visuals
        $('#option' + correctOptionGlobal).css('box-shadow', '0 0 0 0.2rem rgba(40,167,69,0.5)');
        $('#option' + correctOptionGlobal).prop('disabled', true);
        $('#option' + correctOptionGlobal).css('opacity', 1.00);

        $('#option' + selectedOptionGlobal).prop('disabled', true);
        $('#option' + selectedOptionGlobal).css('opacity', 1.00);

        var possibleOptions = ['A', 'B', 'C', 'D'];
        for (var i = 0; i < 4; i++) {
            if (possibleOptions[i] != selectedOptionGlobal && possibleOptions[i] != correctOptionGlobal) {
                $('#option' + possibleOptions[i]).prop('disabled', true);
                $('#option' + possibleOptions[i]).css('opacity', 1.00);
            }
        }

        $('#checkAnswer').prop('disabled', true);
        $('#checkAnswer').css('opacity', 1.00);

        $('#solution-tab').css("pointer-events","auto");
        $('#solution-tab').removeClass("disabled");
        $('#solution-tab').trigger('click');

        //DB updates
        post('/api/story', dbData);
        QBUserData.push({ question_id: currentQuestionId, correct: dbData.correct });

        updateQuestionStats(currentQuestionId);
    }
})