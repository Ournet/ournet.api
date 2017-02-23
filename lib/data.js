'use strict';

//// declarations

const utils = require('./utils');
const Promise = utils.Promise;
const Places = require('ournet.data.places');
const Weather = require('ournet.data.weather');
const Exchange = require('ournet.data.exchange');
const News = require('ournet.data.news');
const Horoscope = require('ournet.data.horoscope');
const Topics = require('entitizer.entities-storage');
const Stories = require('ournet.data.stories');
const Quotes = require('ournet.data.quotes');
const Videos = require('ournet.data.videos');
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

const news = {
	access: News.getAccessService(),
	control: News.getControlService(),
	search: News.Search
};

const horoscopeConnection = Horoscope.connect(process.env.HOROSCOPE_CONNECTION);
const horoscopeDb = Horoscope.db(horoscopeConnection);
const horoscope = {
	Report: Horoscope.Report,
	report: new Horoscope.Report(horoscopeDb),
	phrase: new Horoscope.Phrase(horoscopeDb),
	signsNames: Horoscope.signsNames
};

const topics = {
	access: new Topics.AccessService(),
	util: Topics.utils,
	categories: Topics.categories,
	EntityName: Topics.EntityName
};

const stories = {
	access: new Stories.AccessService(),
	control: new Stories.ControlService(),
	search: Stories.Search
};

const quotes = {
	access: new Quotes.AccessService(),
	control: new Quotes.ControlService()
};

const videos = {
	access: new Videos.AccessService(),
	control: new Videos.ControlService()
};

//// cachify

// cachify places

cachify(places.access, {
	cachingStrategy: new cachify.strategies.Lru({ size: 100 }),
	methods: { placesByTypeAdm1: [0, 1] }
});

cachify(places.access, {
	cachingStrategy: new cachify.strategies.Lru({ size: 100 }),
	methods: { places: [0, 1] }
});

// cachify(places.access, {
// 	cachingStrategy: new cachify.strategies.RingBuffer({ size: 500 }),
// 	methods: { place: [0, 1] }
// });

// cachify weather
// cachify(weather.access, {
// 	cachingStrategy: new cachify.strategies.RingBuffer({ size: 500 }),
// 	methods: { getForecast: [0] }
// });

// cachify exchange
// cachify(exchange.access, {
// 	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 15 }),
// 	methods: {
// 		ratesBySource: [0],
// 		firstDateRates: [0],
// 		rates: [0],
// 		rate: [0]
// 	}
// });

// cachify holidays
publicHolidays = cachify(publicHolidays, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 30 }),
	parameters: [0]
});

// cachify news
cachify(news.access, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 30 }),
	methods: { trendTopics: [0] }
});

// cachify horoscope
// cachify(horoscope.report, {
// 	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 30 }),
// 	methods: { one: [0], list: [0] }
// });

// cachify topics
cachify(topics.access, {
	cachingStrategy: new cachify.strategies.Lru({ size: 500 }),
	methods: { entityByName: [0], entityByKey: [0], entityById: [0] }
});


//// exports

exports.weather = weather;
exports.places = places;
exports.holidays = publicHolidays;
exports.exchange = exchange;
exports.news = news;
exports.horoscope = horoscope;
exports.topics = topics;
exports.stories = stories;
exports.quotes = quotes;
exports.videos = videos;
