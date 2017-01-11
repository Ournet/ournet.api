'use strict';

const places = require('./places/query');
const weather = require('./weather/query');
const exchange = require('./exchange/query');
const news = require('./news/query');
const holidays = require('./holidays');

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
