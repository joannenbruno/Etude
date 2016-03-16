'use strict';

(function(Peaks){	

	// peak.js object options, specifying container and media elements, as well
	// as data URI objects
	var options = {
      container: document.getElementById('first-waveform-visualiser-container'),
      mediaElement: document.querySelector('audio'),
      dataUri: {
        arraybuffer: '/test_data/sample.dat',
        json: '/test_data/sample.json'
      },
      keyboard: false
    };

  // initialize peak.js object
  var peaksInstance = Peaks.init(options);

  // set window object
  window.peaksInstance = peaksInstance;

  // button event listeners, functionality
  document.querySelector('[data-action="zoom-in"]').addEventListener("click", peaksInstance.zoom.zoomIn.bind(peaksInstance));
  document.querySelector('[data-action="zoom-out"]').addEventListener("click", peaksInstance.zoom.zoomOut.bind(peaksInstance));

  document.querySelector('button[data-action="add-segment"]').addEventListener("click", function () {
    var segment = {
      startTime: peaksInstance.time.getCurrentTime(),
      endTime: peaksInstance.time.getCurrentTime() + 10,
      editable: true
    };

    peaksInstance.segments.add([segment]);
  });

  document.querySelector('button[data-action="add-point"]').addEventListener("click", function () {
    var point = {
      timestamp: peaksInstance.time.getCurrentTime(),
      editable: true
    };

    peaksInstance.points.add([point]);
  });

  document.querySelector('button[data-action="log-data"]').addEventListener("click", function (event) {
    console.log('Segments', peaksInstance.segments.getSegments());
    console.log('Points', peaksInstance.points.getPoints());
  });

  // log when segments are fully loaded
  peaksInstance.on('segments.ready', function(){
  	console.log('track loaded');
	});
})(peaks.js);