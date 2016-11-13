'use strict';

exports.action = {
	name: 'news.feed.create',
	description: 'My Action',
	blockedConnectionTypes: [],
	outputExample: {},
	matchExtensionMimeType: false,
	version: 1.0,
	toDocument: true,
	middleware: [],

	inputs: {
		url: 1,
		title: 1,
		lang: 1,
		country: 1,
		status: 1,
		websiteId: 1,
		contentType: 1
	},

	run: function(api, data, next) {
		api.data.news.control.createFeed(data.params)
			.then((result) => {
				data.response = result;
				next();
			})
			.catch(next);
	}
};
