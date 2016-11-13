'use strict';

exports.action = {
	name: 'news.feed.update',
	description: 'My Action',
	blockedConnectionTypes: [],
	outputExample: {},
	matchExtensionMimeType: false,
	version: 1.0,
	toDocument: true,
	middleware: [],

	inputs: {
		id: 1,
		url: 1,
		title: 1,
		lang: 1,
		country: 1,
		status: 1
	},

	run: function(api, data, next) {
		api.data.news.control.updateFeed(data.params)
			.then((result) => {
				data.response = result;
				next();
			})
			.catch(next);
	}
};
