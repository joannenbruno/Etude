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
		var projectArtValue = $('#project-art');

		// assign to project object
		var newProject = {
			'name' : projectNameValue,
			'description' : projectDescriptionValue,
			'art' : projectArtValue
		};

		// log event and field values to the console for debug purposes
		console.log(e);
		console.log(newProject);
	};

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
			'title' : trackTitleValue,
			'description' : trackDescriptionValue,
			'version-number' : trackVersionNumberValue,
			'file' : trackFile
		};

		// log event and fields values to the console for debugging purposes
		console.log(e);
		console.log(newTrack);
	};
});
