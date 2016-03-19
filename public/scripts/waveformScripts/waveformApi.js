'use strict';

// backend API for waveform-track functions
var _generateId = function(track) {
	return track.name.toLowerCase() + '10';
};

// gets the segment data for a particular instance, returns those segments
var _getTrackSegments = function(instance) {
	return instance.segments.getSegments();
};

// remove segments based on time parameters, returns modified instance
var _removeTrackSegments = function(instance, startTime, endTime) {
	return instance.segments.removeByTime(startTime, endTime);
};

// remove all the tracks current segments, returns modified instance
var _removeAllTrackSegments = function(instance) {
	return instance.segments.removeAll();
};