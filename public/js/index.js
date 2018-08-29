function main() {
    get('/api/whoami', {}, function(user) {
		if (user._id) {
			console.log(user);
			document.getElementById('body').classList.remove('d-none')
			renderNavbar('in');
			if (document.getElementById('questionspageloaded') != null) {
				renderQuestions('in', user);				
			}
		}
		else {
			// document.getElementById('body').classList.remove('d-none');
			renderNavbar('out');
			if (document.getElementById('questionspageloaded') != null) {
				renderQuestions('out', user);	
				console.log('rendering questions when not logged in');			
			}
		}
  	});
}

main();