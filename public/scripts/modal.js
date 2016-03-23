$(document).ready(function(){
	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$('.modal-trigger').leanModal();

	// You must initialize the select element as shown below. In addition, you will need a separate 
	// call for any dynamically generated select elements your page generates.
  $('select').material_select();

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
		// console.log(e);
		console.log(newProject);

		createCard(newProject.name, newProject.description, newProject.art);
	}

	// creates card html and css using jQuery
	function createCard(name, description, art) {
		// parent level card class elements
		var newDivColClass = $("<div class = 'col s12 m6' />"),
				newDivCardClass = $("<div class = 'card medium hoverable' />"),
				newDivCardImageClass = $("<div class = 'card-image' />"),
				newCardImgSrc = $("<img src=" + art + " />");

		// inner card elements
		var newDivCardContentClass = $("<div class = 'card-content' />"),
				newSpanCardTitleClass = $("<span class = 'card-title text-white'>" + name + "</span>"),
				newCardParagraph = $("<p>" + description + "</p>"),
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

	// parent JSON object holders
	var jsonTracks = [];
	var treeJsonData = [];

	// track modal submit function
	$('#track-submit').on('click', addTrack);
	function addTrack(e) {
		e.preventDefault();

		//value variables
		var trackTitleValue = $('#track-title').val();
		var trackDescriptionValue = $('#track-description').val();
		var trackParentTrackValue = $('#parent-track').val();
		var trackVersionNumberValue = $('#version-number').val();

		var trackFile = $('#track-file')[0].files[0];
		var trackFileObject = window.URL.createObjectURL(trackFile);

		// assign to track object
		var newTrack = {
			'title': trackTitleValue,
			'description': trackDescriptionValue,
			'parentTrack': trackParentTrackValue,
			'version-number': trackVersionNumberValue,
			'file': trackFileObject
		};

		// null check for JSON formatting
		if (newTrack.parentTrack === "") {
			newTrack.parentTrack = "null";
		}

		// log event and fields values to the console for debugging purposes
		// console.log(e);
		console.log(newTrack);

		// call tree data formatting function
		treeDataJsonFormat(newTrack);

		removeTree();
		set();
	}

	// format submit data to d3 friendly format
	function treeDataJsonFormat(newTrack){
		// create json data text object
		var newTrackJsonText = '[{ "name" : "' + newTrack.title +
		'", "parent":"' + newTrack.parentTrack + '"}]';

		// log to console for debugging purposes
		// console.log(newTrackJsonText);

		// parse text as JSON, log table to console
		var newTrackJson = JSON.parse(newTrackJsonText);
		console.table(newTrackJson);

		jsonTracks.push(newTrackJson);
		console.log(jsonTracks);

		// parent track check
		if (treeDataParentCheck(newTrack.parentTrack) !== null) {
			var newChildTrackJsonText = '[{"name":"' + newTrack.title + 
			'", "parent":"' + newTrack.parentTrack +' "}]';

			var newChildTrackJson = JSON.parse(newChildTrackJsonText);

			treeJsonData.children = newChildTrackJson;
			console.table(treeJsonData);
		} else {
			treeJsonData.push(newTrackJson);
			console.log(treeJsonData);
		}
	}

	// ascertain if parent track pertains to data, format further
	function treeDataParentCheck(parentTrack) {
		// TODO: UI dropdown validation so user can't create
		// new children without first selecting a parent

		for (var track in jsonTracks) {
			for (var i in jsonTracks[track]) {
				if (jsonTracks[track][i].name === parentTrack.toString()) {
					console.log("PARENT TRACK FOUND: " + parentTrack);
					return parentTrack;
				}
			}
		}

		return null;
	}

});
