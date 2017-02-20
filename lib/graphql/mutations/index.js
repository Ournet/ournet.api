'use strict';

const groups = {
	// news: require('./news'),
	stories: require('./stories')
};

Object.keys(groups).forEach(function(group) {
	Object.keys(groups[group]).forEach(key => {
		exports[group + '_' + key] = groups[group][key];
	});
});
