var selectedOptionGlobal = 'undefined';
var userGlobal = {};

function renderQuestions(logInsStatus, user) {
    userGlobal = user;
    if (logInsStatus == 'in') {
        document.getElementById('QandACol').classList.remove('d-none');
        document.getElementById('optionCol').classList.remove('d-none');
        document.getElementById('forceSignIn').classList.add('d-none');
    }
    else {
        document.getElementById('QandACol').classList.add('d-none');
        document.getElementById('optionCol').classList.add('d-none');
        document.getElementById('forceSignIn').classList.remove('d-none');
    }
}

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
        if (selectedOptionGlobal == correctOptionGlobal) {
            $('#option' + correctOptionGlobal).removeClass('btn-secondary').addClass('btn-success');
            
        }
        else {
            $('#option' + correctOptionGlobal).removeClass('btn-outline-secondary').addClass('btn-success');
            $('#option' + selectedOptionGlobal).removeClass('btn-secondary').addClass('btn-danger');
        }

        $('#option' + correctOptionGlobal).prop('disabled', true);
        $('#option' + correctOptionGlobal).css('opacity', 1.00);

        $('#option' + selectedOptionGlobal).prop('disabled', true);
        $('#option' + selectedOptionGlobal).css('opacity', 1.00);

        var possibleOptions = ['A', 'B', 'C', 'D'];
        for (var i = 0; i < 4; i++) {
            if (possibleOptions[i] != selectedOptionGlobal && possibleOptions[i] != correctOptionGlobal) {
                $('#option' + possibleOptions[i]).prop('disabled', true);
                $('#option' + possibleOptions[i]).css('opacity', 0.65);
            }
        }

        $('#checkAnswer').prop('disabled', true);
        $('#checkAnswer').css('opacity', 1.00);

        $('#solution-tab').css("pointer-events","auto");
        $('#solution-tab').removeClass("disabled");
        $('#solution-tab').trigger('click');
    }
})