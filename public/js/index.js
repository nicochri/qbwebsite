function main() {
    get('/api/whoami', {}, function(user) {
		if (user._id) {
		document.getElementById('body').classList.remove('d-none')
		renderNavbar('in');
		}
		else {
		document.getElementById('body').classList.remove('d-none');
		renderNavbar('out');
		}
  	});
}

main();