'use strict';

const holidays = require('./holidays');

const places = require('./places');
const weather = require('./weather');
const exchange = require('./exchange');
const news = require('./news');
const horoscope = require('./horoscope');

Object.keys(holidays).forEach(key => {
	exports[key] = holidays[key];
});

Object.keys(places).forEach(key => {
	exports['places_' + key] = places[key];
});

Object.keys(weather).forEach(key => {
	exports['weather_' + key] = weather[key];
});

Object.keys(exchange).forEach(key => {
	exports['exchange_' + key] = exchange[key];
});

Object.keys(news).forEach(key => {
	exports['news_' + key] = news[key];
});

Object.keys(horoscope).forEach(key => {
	exports['horoscope_' + key] = horoscope[key];
});
