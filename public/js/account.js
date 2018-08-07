function renderAccountPage(user){
	console.log(user);

	const name = document.createElement('p');
	name.innerHTML = 'Name: ' + user.name;

	const mathHLAcess = document.createElement('p');
	mathHLAcess.innerHTML = 'Math Higher Level Access: ' + user.mathHL;

	const accountBody = document.getElementById('accountBody');
	accountBody.appendChild(name);
	accountBody.appendChild(mathHLAcess);
}

function accountMain() {
  get('/api/whoami', {}, function(user) {
    renderAccountPage(user);
    console.log('entered1');
  });
}

accountMain();