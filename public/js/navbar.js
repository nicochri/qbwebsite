// NAVBAR TAKEN FROM https://getbootstrap.com/docs/4.0/examples/pricing/

function renderLogo(parentDiv) {
	const imageDiv = document.createElement('div');
	imageDiv.className = 'navbar p-0 navbar-light bg-white';

	const imageLink = document.createElement('a');
	imageLink.className = 'navbar-brand';
	imageLink.href = '/';

	const image = document.createElement('img');
	image.src = '/static/logo.png';
	image.width = '30';
	image.height = '30';
	image.className = 'd-inline-block align-top';

	parentDiv.appendChild(imageDiv);
	imageDiv.appendChild(imageLink);
	imageLink.appendChild(image);
}

function renderLinks(parentDiv) {
	const navbar = document.createElement('nav');
	navbar.className = 'my-2 my-md-0 mr-md-3';

	const link1 = document.createElement('a');
	link1.className = 'p-2 text-dark';
	link1.href = '/';
	link1.innerHTML = 'Home';

	const link2 = document.createElement('a');
	link2.className = 'p-2 text-dark';
	link2.href = '/courses';
	link2.innerHTML = 'Courses';

	const link3 = document.createElement('a');
	link3.className = 'p-2 text-dark';
	link3.href = '/features';
	link3.innerHTML = 'Features';

	parentDiv.appendChild(navbar);
	navbar.appendChild(link1);
	navbar.appendChild(link2);
	navbar.appendChild(link3);
}

function renderLoggedOUT(parentDiv) {
	const getButtonsDiv = document.createElement('div');
	getButtonsDiv.className = 'ml-md-auto';

	const buttonsDiv = document.createElement('div');

	const button = document.createElement('a');
	button.className = 'btn btn-outline-primary mr-1';
	button.style = 'width: 82px';
	button.href = '/auth/google';
	button.innerHTML = 'Log in';
	buttonsDiv.appendChild(button);

	const button2 = document.createElement('a');
	button2.className = 'btn btn-primary ml-1';
	button2.style = 'width: 164px';
	button2.href = '/auth/google';
	button2.innerHTML = 'Sign up';
	buttonsDiv.appendChild(button2);

	getButtonsDiv.appendChild(buttonsDiv);
	parentDiv.appendChild(getButtonsDiv)
}

function renderLoggedIN(parentDiv, user) {
	const getButtonsDiv = document.createElement('div');
	getButtonsDiv.className = 'ml-md-auto';

	const buttonsDiv = document.createElement('div');

	const button = document.createElement('a');
	button.className = 'btn btn-outline-primary mr-1';
	button.href = '/account';
	button.innerHTML = 'Hello, ' + user.name;
	buttonsDiv.appendChild(button);

	const button2 = document.createElement('a');
	button2.className = 'btn btn-primary ml-1';
	button2.style = 'width: 164px';
	button2.href = '/logout';
	button2.innerHTML = 'Log out';
	buttonsDiv.appendChild(button2);

	getButtonsDiv.appendChild(buttonsDiv);
	parentDiv.appendChild(getButtonsDiv)
}

function renderNewNavbar(user) {
	const mainNavbarDiv = document.getElementById('my-navbar');
	mainNavbarDiv.className = 'd-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-3 bg-white border-bottom box-shadow';

	renderLogo(mainNavbarDiv);
	renderLinks(mainNavbarDiv);

 	if (user._id) {
		renderLoggedIN(mainNavbarDiv, user);
	}
	else {
		renderLoggedOUT(mainNavbarDiv);
	}
}

// NAVBAR HTML
// <!-- <div class="my-homemade-navbar"> -->
//   <div class="d-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-3 bg-white border-bottom box-shadow">
//   <div class="navbar p-0 navbar-light bg-white">
//     <a class="navbar-brand" href="#">
//       <img src="/static/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
//     </a>
//   </div>
//   <nav class="my-2 my-md-0 mr-md-3">
//     <a class="p-2 text-dark" href="#">Home</a>
//     <a class="p-2 text-dark" href="#">Courses</a>
//     <a class="p-2 text-dark" href="#">Features</a>
//   </nav>
// <!--   <div id="my-homemade-navbar">
    
//   </div> -->
// <!--   <div class="ml-md-auto">
//     <div id="my-homemade-navbar">
//       <a class="btn btn-outline-primary" style="width: 82px"href="#">Log in</a>
//       <a class="btn btn-primary" style="width: 164px" href="#">Sign up</a>
//     </div>
//   </div> -->
// </div>
// <!-- </div> -->
