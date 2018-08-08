const payment = document.getElementById('payment');
if(payment) {
	get('/api/whoami', {}, function(user) {
    	console.log(user.gid);
    	const gid = document.getElementById('gid').value = user.gid;
  	});
}