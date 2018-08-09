const payment = document.getElementById('payment');
if(payment) {
	get('/api/whoami', {}, function(user) {
    	const gid = document.getElementById('gid').value = user.gid;
  	});
}