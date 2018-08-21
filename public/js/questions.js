function renderQuestions(logInsStatus) {
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