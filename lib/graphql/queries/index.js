'use strict';

const placesQuery = require('./places/query');
const weatherQuery = require('./weather/query');

Object.keys(placesQuery).forEach(key => {
	exports['places_' + key] = placesQuery[key];
});

Object.keys(weatherQuery).forEach(key => {
	exports['weather_' + key] = weatherQuery[key];
});
