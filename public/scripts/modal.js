$(document).ready(function(){
	console.log("Document Ready");

	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$('.modal-trigger').leanModal();

	// project modal submit function
	$('#project-submit').on('click', addProject);
	function addProject(e) {
		e.preventDefault();

		// value variables
		var projectNameValue = $('#project-name').val();
		var projectDescriptionValue = $('#project-description').val();

		// grab and creat image file object
		var projectArtValue = $('#project-art')[0].files[0];
		var imagefile = window.URL.createObjectURL(projectArtValue);

		// assign to project object
		var newProject = {
			'name': projectNameValue,
			'description': projectDescriptionValue,
			'art': imagefile
		};

		// log event and field values to the console for debug purposes
		console.log(e);
		console.log(newProject);

		// parent level card class elements
		var newDivColClass = $("<div class = 'col s12 m6' />"),
				newDivCardClass = $("<div class = 'card medium' />"),
				newDivCardImageClass = $("<div class = 'card-image' />"),
				newCardImgSrc = $("<img src=" + newProject.art + " />");

		// inner card elements
		var newDivCardContentClass = $("<div class = 'card-content' />"),
				newSpanCardTitleClass = $("<span class = 'card-title text-white'>" + newProject.name + "</span>"),
				newCardParagraph = $("<p>" + newProject.description + "</p>"),
				newDivCardActionClass = $("<div class = 'card-action' />"),
				newHrefProjectPage = $("<a href='project.html'>Take me to the repo tree</a>");

		// appending
		$('#project-row').append(newDivColClass);
		$(newDivColClass).append(newDivCardClass);
		$(newDivCardClass).append(newDivCardImageClass);
		$(newDivCardImageClass).append(newCardImgSrc);

		$(newDivCardClass).append(newDivCardContentClass);
		$(newDivCardContentClass).append(newSpanCardTitleClass);
		$(newSpanCardTitleClass).after(newCardParagraph);
		$(newDivCardClass).append(newDivCardActionClass);
		$(newDivCardActionClass).append(newHrefProjectPage);
	}

	// track modal submit function
	$('#track-submit').on('click', addTrack);
	function addTrack(e) {
		e.preventDefault();

		//value variables
		var trackTitleValue = $('#track-title').val();
		var trackDescriptionValue = $('#track-description').val();
		var trackVersionNumberValue = $('#version-number').val();
		var trackFile = $('#track-file');

		// assign to track object
		var newTrack = {
			'title': trackTitleValue,
			'description': trackDescriptionValue,
			'version-number': trackVersionNumberValue,
			'file': trackFile
		};

		// log event and fields values to the console for debugging purposes
		console.log(e);
		console.log(newTrack);
	}
});
