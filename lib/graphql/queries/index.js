'use strict';

const places = require('./places');
const weather = require('./weather');

Object.keys(places).forEach(key => {
	exports[key] = places[key];
});

Object.keys(weather).forEach(key => {
	exports[key] = weather[key];
});
