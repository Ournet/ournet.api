'use strict';

const placesQuery = require('./places/query');
const weatherQuery = require('./weather/query');

Object.keys(placesQuery).forEach(key => {
	exports[key] = placesQuery[key];
});

Object.keys(weatherQuery).forEach(key => {
	exports[key] = weatherQuery[key];
});
