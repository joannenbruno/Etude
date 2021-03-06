'use strict';

var xhr = new XMLHttpRequest();

// .dat file generated by audiowaveform program
xhr.responseType = "arraybuffer";
xhr.open("GET", "test_data/sample.dat");
xhr.addEventListener("load", function onResponse(progressEvent){
  var waveform = WaveformData.create(progressEvent.target);

  console.log(waveform);

  // fitting the data in a 500px wide canvas
	var resampledWaveform = waveform.resample({ width: 500 });

	console.log(resampledWaveform.min.length);   // -> 500

	// zooming out on a 3 times less precise scale
	var resampledWaveform = waveform.resample({ scale: waveform.adapter.scale * 3 });

	// partial resampling (to perform fast animations involving a resampling per animation frame)
	var partiallyResampledWaveform = waveform.resample({ width: 500, from: 0, to: 500 });

  var interpolateHeight = function interpolateHeightGenerator (totalHeight){
  	var amplitude = 256;
  	return function interpolateHeight(size){
  		return totalHeight - ((size + 128) * totalHeight) / amplitude;
  	};
	};

	var canvas = document.getElementById('canvas-element');
	var y = interpolateHeight(canvas.height);
	var ctx = canvas.getContext('2d');
	ctx.beginPath();

	// from 0 to 100
	partiallyResampledWaveform.min.forEach(function(val, x){
		ctx.lineTo(x + 0.5, y(val) + 0.5);
	});

	// then looping back from 100 to 0
	partiallyResampledWaveform.max.reverse().forEach(function(val, x){
		ctx.lineTo((partiallyResampledWaveform.offset_length - x) + 0.5, y(val) + 0.5);
	});

	ctx.closePath();
	ctx.stroke();
});
xhr.send();