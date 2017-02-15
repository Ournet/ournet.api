'use strict';

const holidays = require('./holidays');

const groups = {
	places: require('./places'),
	weather: require('./weather'),
	exchange: require('./exchange'),
	news: require('./news'),
	horoscope: require('./horoscope'),
	topics: require('./topics'),
	stories: require('./stories')
};

Object.keys(holidays).forEach(key => {
	exports[key] = holidays[key];
});

Object.keys(groups).forEach(function(group) {

	Object.keys(groups[group]).forEach(key => {
		exports[group + '_' + key] = groups[group][key];
	});
});
