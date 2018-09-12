//PREPARE THE QUESTIONS PAGE
//Update specific chapter data
$('.chapter1').click(function() {
        currentChapterGlobal = 1;
        resetOptionButtons();
        updateQuestionStats(currentQuestionIds[0]);
        updateQuestionStatsBorder();
});
$('.chapter2').click(function() {
        currentChapterGlobal = 2;
        resetOptionButtons();
        updateQuestionStats(currentQuestionIds[1]);
        updateQuestionStatsBorder();
});
$('.chapter3').click(function() {
        currentChapterGlobal = 3;
        resetOptionButtons();
        updateQuestionStats(currentQuestionIds[2]);
        updateQuestionStatsBorder();
});
$('.chapter4').click(function() {
        currentChapterGlobal = 4;
        resetOptionButtons();
        updateQuestionStats(currentQuestionIds[3]);
        updateQuestionStatsBorder();
});
$('.chapter5').click(function() {
        currentChapterGlobal = 5;
        resetOptionButtons();
        updateQuestionStats(currentQuestionIds[4]);
        updateQuestionStatsBorder();
});
$('.chapter6').click(function() {
        currentChapterGlobal = 6;
        resetOptionButtons();
        updateQuestionStats(currentQuestionIds[5]);
        updateQuestionStatsBorder();
});
$('#questionDropdownButton-chapter1').click(function() {
    if ($(this).attr('state') == 'down') {
        document.getElementById('list-tab-chapter1').setAttribute('style', 'height: 400px;');
        $(this).attr('state','up');
        $(this).html('&uarr;');
    }
    else {
        document.getElementById('list-tab-chapter1').setAttribute('style', 'height: 50px;');
        $(this).attr('state','down');
        $(this).html('&darr;');
    }
});
$('#questionDropdownButton-chapter2').click(function() {
    if ($(this).attr('state') == 'down') {
        document.getElementById('list-tab-chapter2').setAttribute('style', 'height: 400px;');
        $(this).attr('state','up');
        $(this).html('&uarr;');
    }
    else {
        document.getElementById('list-tab-chapter2').setAttribute('style', 'height: 50px;');
        $(this).attr('state','down');
        $(this).html('&darr;');
    }
});
$('#questionDropdownButton-chapter3').click(function() {
    if ($(this).attr('state') == 'down') {
        document.getElementById('list-tab-chapter3').setAttribute('style', 'height: 400px;');
        $(this).attr('state','up');
        $(this).html('&uarr;');
    }
    else {
        document.getElementById('list-tab-chapter3').setAttribute('style', 'height: 50px;');
        $(this).attr('state','down');
        $(this).html('&darr;');
    }
});
$('#questionDropdownButton-chapter4').click(function() {
    if ($(this).attr('state') == 'down') {
        document.getElementById('list-tab-chapter4').setAttribute('style', 'height: 400px;');
        $(this).attr('state','up');
        $(this).html('&uarr;');
    }
    else {
        document.getElementById('list-tab-chapter4').setAttribute('style', 'height: 50px;');
        $(this).attr('state','down');
        $(this).html('&darr;');
    }
});
$('#questionDropdownButton-chapter5').click(function() {
    if ($(this).attr('state') == 'down') {
        document.getElementById('list-tab-chapter5').setAttribute('style', 'height: 400px;');
        $(this).attr('state','up');
        $(this).html('&uarr;');
    }
    else {
        document.getElementById('list-tab-chapter5').setAttribute('style', 'height: 50px;');
        $(this).attr('state','down');
        $(this).html('&darr;');
    }
});
$('#questionDropdownButton-chapter6').click(function() {
    if ($(this).attr('state') == 'down') {
        document.getElementById('list-tab-chapter6').setAttribute('style', 'height: 400px;');
        $(this).attr('state','up');
        $(this).html('&uarr;');
    }
    else {
        document.getElementById('list-tab-chapter6').setAttribute('style', 'height: 50px;');
        $(this).attr('state','down');
        $(this).html('&darr;');
    }
});


// Start preparing the functions needed
function setLocalPriceTags() {
    var priceTag = '';
    $.get("http://ipinfo.io", function (response) {
        if (response.country in countryCodeToData && true) {
            var priceTag = '';
            if (countryCodeToData[response.country].d != "") {
                if (countryCodeToData[response.country].d.charAt(0) == " ") {
                    priceTag = countryCodeToData[response.country].p + countryCodeToData[response.country].d;
                }
                else {
                    priceTag = countryCodeToData[response.country].d + countryCodeToData[response.country].p;
                }
            }
            else {
                priceTag = countryCodeToData[response.country].p + ' ' + countryCodeToData[response.country].c;
            }
        }
        else {
            priceTag = "3,99 USD";
        }

        var setLocalCurrencies = document.getElementsByClassName('setLocalcurrency');
        for (var i = 0; i < setLocalCurrencies.length; i++) {
            setLocalCurrencies[i].innerHTML = priceTag;
        }

    }, "jsonp");
}

function renderQuestions(logInsStatus) {
    if (logInsStatus == 'in') {
        
        //Check for user access
        var chapterAccess = 1000;
        if (userGlobal.mathHL == 'n') {
            chapterAccess = 1;
            $('#subscribeNowDiv').clone().appendTo('#subscribeNow-chapter2');
            $('#subscribeNowDiv').clone().appendTo('#subscribeNow-chapter3');
            $('#subscribeNowDiv').clone().appendTo('#subscribeNow-chapter4');
            $('#subscribeNowDiv').clone().appendTo('#subscribeNow-chapter5');
            $('#subscribeNowDiv').clone().appendTo('#subscribeNow-chapter6');
        }

        //Question and solution central div
        var QandACols = document.getElementsByClassName('QandACol');
        for (var i = 0; i < QandACols.length && i < chapterAccess; i++) {
            QandACols[i].classList.remove('d-none');
        }

        //Right side multiple choice divs
        var optionCols = document.getElementsByClassName('optionCol');
        for (var i = 0; i < optionCols.length && i < chapterAccess; i++) {
            optionCols[i].classList.remove('d-none');
        }
        
        var signIns = document.getElementsByClassName('forceSignIn');
        for (var i = 0; i < signIns.length; i++) {
            signIns[i].classList.add('d-none');
        }
        setLocalPriceTags();
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

// Add functionality to the chapter 3 option buttons
$('#optionA-chapter' + "3").click(function() {
    optionChapterClick(
        ['btn-outline-secondary', 'btn-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'A';
})

$('#optionB-chapter' + "3").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'B';
})

$('#optionC-chapter' + "3").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-ouline-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'C';
})

$('#optionD-chapter' + "3").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-secondary', 'btn-outline-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary']
    )

    selectedOptionGlobal = 'D';
})

// Add functionality to the chapter 3 option buttons
$('#optionA-chapter' + "4").click(function() {
    optionChapterClick(
        ['btn-outline-secondary', 'btn-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'A';
})

$('#optionB-chapter' + "4").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'B';
})

$('#optionC-chapter' + "4").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-ouline-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'C';
})

$('#optionD-chapter' + "4").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-secondary', 'btn-outline-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary']
    )

    selectedOptionGlobal = 'D';
})

// Add functionality to the chapter 3 option buttons
$('#optionA-chapter' + "5").click(function() {
    optionChapterClick(
        ['btn-outline-secondary', 'btn-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'A';
})

$('#optionB-chapter' + "5").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'B';
})

$('#optionC-chapter' + "5").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-ouline-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'C';
})

$('#optionD-chapter' + "5").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-secondary', 'btn-outline-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary']
    )

    selectedOptionGlobal = 'D';
})

// Add functionality to the chapter 3 option buttons
$('#optionA-chapter' + "6").click(function() {
    optionChapterClick(
        ['btn-outline-secondary', 'btn-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'A';
})

$('#optionB-chapter' + "6").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'B';
})

$('#optionC-chapter' + "6").click(function() {
    optionChapterClick(
        ['btn-secondary', 'btn-secondary', 'btn-ouline-secondary', 'btn-secondary'], 
        ['btn-outline-secondary', 'btn-outline-secondary', 'btn-secondary', 'btn-outline-secondary']
    )

    selectedOptionGlobal = 'C';
})

$('#optionD-chapter' + "6").click(function() {
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

$('#checkAnswer-chapter' + "3").click(function() {
    checkAnswerClick();
})

$('#checkAnswer-chapter' + "4").click(function() {
    checkAnswerClick();
})

$('#checkAnswer-chapter' + "5").click(function() {
    checkAnswerClick();
})

$('#checkAnswer-chapter' + "6").click(function() {
    checkAnswerClick();
})


