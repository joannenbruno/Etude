'use strict';

function createWaveformElements(mainDivID, containerElementId, divControlsId, srcOne, typeOne, srcTwo, typeTwo) {
	// get main parent dive by id
	var mainDiv = document.getElementById(mainDivID);

	// set wave for container id
	var waveformDiv = document.createElement('div');
	waveformDiv.id = containerElementId;

	// set audio controls div, sources, and types
	var controlsDiv = document.createElement('div');
	controlsDiv.id = divControlsId;

	var audioControls = document.createElement('audio');
	audioControls.controls = "controls";
	controlsDiv.appendChild(audioControls);

	var sourceOne = document.createElement('source');
	sourceOne.src = srcOne;
	sourceOne.type = typeOne;

	var sourceTwo = document.createElement('source');
	sourceTwo.src = srcTwo;
	sourceTwo.type = typeTwo;

	audioControls.appendChild(sourceOne);
	audioControls.appendChild(sourceTwo);

	// set all buttons and their data-actions
	var buttonOne = document.createElement('button');
	buttonOne.setAttribute('data-action', "zoom-in");
	buttonOne.innerHTML = "zoom in";

	var buttonTwo = document.createElement('button');
	buttonTwo.setAttribute('data-action', "zoom-out");
	buttonTwo.innerHTML = "zoom out";

	var buttonThree = document.createElement('button');
	buttonThree.setAttribute('data-action', "add-segment");
	buttonThree.innerHTML = "Add a Segment at current time";

	var buttonFour = document.createElement('button');
	buttonFour.setAttribute('data-action', "remove-segments");
	buttonFour.innerHTML = "Remove all Segments";

	var buttonFive = document.createElement('button');
	buttonFive.setAttribute('data-action', "add-point");
	buttonFive.innerHTML = "Add a Point at current time";

	var buttonSix = document.createElement('button');
	buttonSix.setAttribute('data-action', "log-data");
	buttonSix.innerHTML = "Log segments/points";

	var buttonSeven = document.createElement('button');
	buttonSeven.setAttribute('data-action', "return-segments");
	buttonSeven.innerHTML = "Return segments";

	// append to audio controls
	controlsDiv.appendChild(buttonOne);
	controlsDiv.appendChild(buttonTwo);
	controlsDiv.appendChild(buttonThree);
	controlsDiv.appendChild(buttonFour);
	controlsDiv.appendChild(buttonFive);
	controlsDiv.appendChild(buttonSix);
	controlsDiv.appendChild(buttonSeven);

	// append parent divs to mains divs
	mainDiv.appendChild(waveformDiv);
	mainDiv.appendChild(controlsDiv);
}

function setWaveformOptions(containerElementId, dataUriArrayBuffer, dataUriJson) {
	// peak.js object options, specifying container and media elements, as well
	// as data URI objects, etc.
	var options = {
			// Containing element
      container: document.getElementById(containerElementId),

      // HTML5 Media element containing an audio track
      mediaElement: document.querySelector('audio'),

      /** Optional config with defaults **/
  		// URI to waveform data file in binary or JSON
      dataUri: {
        arraybuffer: dataUriArrayBuffer,
        json: dataUriJson
      },

      // default height of the waveform canvases in pixels
      height: 100,

			// Bind keyboard controls
			keyboard: false,

			// Colour for the in marker of segments
			inMarkerColor: '#a0a0a0',

			// Colour for the out marker of segments
			outMarkerColor: '#a0a0a0',

			// Colour for the zoomed in waveform
			zoomWaveformColor: '#FF0000',

			// Colour for the overview waveform
			overviewWaveformColor: '#FF0000',

			// Colour for the overview waveform rectangle that shows what the zoom view shows
			overviewHighlightRectangleColor: '#9BF4D5',

			// Colour for segments on the waveform
			segmentColor: 'rgba(255, 161, 39, 1)',

			// Colour of the play head
			playheadColor: 'rgba(0, 0, 0, 1)',

			// Colour of the play head text
			playheadTextColor: '#aaa',

			// the color of a point marker
			pointMarkerColor: '#FF0000',

			// Colour of the axis gridlines
			axisGridlineColor: '#ccc',

			// Colour of the axis labels
			axisLabelColor: '#aaa'
    };

    return options;
}

function makeWaveformSet(instance) {
	// set window object
  window.instance = instance;

  /* 
  *	button event listeners, functionality 
  */

  // zoom buttons
  document.querySelector('[data-action="zoom-in"]').addEventListener("click", instance.zoom.zoomIn.bind(instance));
  document.querySelector('[data-action="zoom-out"]').addEventListener("click", instance.zoom.zoomOut.bind(instance));

  // segment selector button
  document.querySelector('button[data-action="add-segment"]').addEventListener("click", function () {
    var segment = {
      startTime: instance.time.getCurrentTime(),
      endTime: instance.time.getCurrentTime() + 5,
      editable: true
    };

    instance.segments.add([segment]);
  });

  // remove all segments by calling waveformApi
  document.querySelector('button[data-action="remove-segments"]').addEventListener('click', function() {
  	_removeAllTrackSegments(instance);
  });

  // remove all segments by calling waveformApi
  document.querySelector('button[data-action="return-segments"]').addEventListener('click', function() {
  	console.log(_getTrackSegments(instance));
  });

  // add point at time selected button
  document.querySelector('button[data-action="add-point"]').addEventListener("click", function () {
    var point = {
      timestamp: instance.time.getCurrentTime(),
      editable: true
    };

    instance.points.add([point]);
  });

  // log buttons and segments button
  document.querySelector('button[data-action="log-data"]').addEventListener("click", function (event) {
    console.log('Segments', instance.segments.getSegments());
    console.log('Points', instance.points.getPoints());
  });

  // log when segments are fully loaded
  instance.on('segments.ready', function(){
  	console.log('track loaded');
	});
}

(function(Peaks){

	var waveformDivId = 'first-waveform-visualiser-container';

	// create waveform div and associated elements
	createWaveformElements("waveform-div", waveformDivId, "demo-controls", "./test_data/sample.mp3", "audio/mpeg", "./test_data/sample.ogg", "audio/ogg");	

  // initialize peak.js object
  var peakInstance = Peaks.init(setWaveformOptions(waveformDivId, '/test_data/sample.dat', '/test_data/sample.json'));

  // call waveform UI set function
  makeWaveformSet(peakInstance);

})(peaks.js);