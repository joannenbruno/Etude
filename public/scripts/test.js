'use strict';

// header element var
var headerEl = document.getElementById('header');

headerEl.addEventListener('click', function(e) {
	headerEl.textContent = "Clicked!!";
	console.log(e);
}, false);