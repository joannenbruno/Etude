'use strict';

(function(Peaks){	

	// peak.js object options, specifying container and media elements, as well
	// as data URI objects, etc.
	var options = {
			// Containing element
      container: document.getElementById('first-waveform-visualiser-container'),

      // HTML5 Media element containing an audio track
      mediaElement: document.querySelector('audio'),

      /** Optional config with defaults **/
  		// URI to waveform data file in binary or JSON
      dataUri: {
        arraybuffer: '/test_data/sample.dat',
        json: '/test_data/sample.json'
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
			zoomWaveformColor: '#1DAD9B',

			// Colour for the overview waveform
			overviewWaveformColor: 'rgba(0,0,0,0.2)',

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

  // initialize peak.js object
  var peaksInstance = Peaks.init(options);

  // set window object
  window.peaksInstance = peaksInstance;

  /* 
  *	button event listeners, functionality 
  */

  // zoom buttons
  document.querySelector('[data-action="zoom-in"]').addEventListener("click", peaksInstance.zoom.zoomIn.bind(peaksInstance));
  document.querySelector('[data-action="zoom-out"]').addEventListener("click", peaksInstance.zoom.zoomOut.bind(peaksInstance));

  // segment selector button
  document.querySelector('button[data-action="add-segment"]').addEventListener("click", function () {
    var segment = {
      startTime: peaksInstance.time.getCurrentTime(),
      endTime: peaksInstance.time.getCurrentTime() + 5,
      editable: true
    };

    peaksInstance.segments.add([segment]);
  });

  // add point at time selected button
  document.querySelector('button[data-action="add-point"]').addEventListener("click", function () {
    var point = {
      timestamp: peaksInstance.time.getCurrentTime(),
      editable: true
    };

    peaksInstance.points.add([point]);
  });

  // log buttons and segments button
  document.querySelector('button[data-action="log-data"]').addEventListener("click", function (event) {
    console.log('Segments', peaksInstance.segments.getSegments());
    console.log('Points', peaksInstance.points.getPoints());
  });

  // log when segments are fully loaded
  peaksInstance.on('segments.ready', function(){
  	console.log('track loaded');
	});
})(peaks.js);