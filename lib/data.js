'use strict';

//// declarations

const utils = require('./utils');
const Promise = utils.Promise;
const Places = require('ournet.data.places');
const Weather = require('ournet.data.weather');
const Exchange = require('ournet.data.exchange');
const logger = require('./logger');
const cachify = require('transparentcache');
let publicHolidays = require('public-holidays');
publicHolidays = Promise.promisify(publicHolidays);

const places = {
	access: Places.AccessService.instance,
	search: new Places.SearchService(process.env.PLACES_ES_HOST)
};

const weather = {
	access: Weather.AccessService.instance,
	forecast: Weather.forecast,
	helpers: Weather.helpers
};

Weather.logger.set(logger);

const exchange = {
	access: new Exchange.AccessService(),
	data: Exchange.data
};

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

// cachify exchange
cachify(exchange.access, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 15 }),
	methods: {
		ratesBySource: [0],
		firstDateRates: [0],
		rates: [0],
		rate: [0]
	}
});

// cachify holidays
publicHolidays = cachify(publicHolidays, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 30 }),
	parameters: [0]
});


//// exports

exports.weather = weather;
exports.places = places;
exports.holidays = publicHolidays;
exports.exchange = exchange;
