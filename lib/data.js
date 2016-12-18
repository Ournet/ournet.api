'use strict';

//// declarations

const Places = require('ournet.data.places');
const Weather = require('ournet.data.weather');
const logger = require('./logger');
const cachify = require('transparentcache');

const places = {
	access: Places.AccessService.instance,
	search: Places.SearchService.instance
};

const weather = {
	access: Weather.AccessService.instance,
	forecast: Weather.forecast,
	helpers: Weather.helpers
};

Weather.logger.set(logger);

//// cachify

// cachify places

cachify(places.access, {
	cachingStrategy: new cachify.strategies.RingBuffer({ size: 100 }),
	methods: { placesByTypeAdm1: [0, 1] }
});

cachify(places.access, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 10 }),
	methods: { places: [0, 1] }
});

cachify(places.access, {
	cachingStrategy: new cachify.strategies.RingBuffer({ size: 500 }),
	methods: { place: [0, 1] }
});

// cachify weather

cachify(weather.access, {
	cachingStrategy: new cachify.strategies.RingBuffer({ size: 500 }),
	methods: { getForecast: [0] }
});


//// exports

exports.weather = weather;
exports.places = places;
