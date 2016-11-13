'use strict';

exports.action = {
	name: 'news.feeds.list',
	description: 'My Action',
	blockedConnectionTypes: [],
	outputExample: {},
	matchExtensionMimeType: false,
	version: 1.0,
	toDocument: true,
	middleware: [],

	inputs: {
		where: 1,
		select: 1,
		limit: 1,
		offset: 1,
		order: 1
	},

	run: function(api, data, next) {
		api.data.news.access.feeds(data.params)
			.then((result) => {
				data.response = result;
				next();
			})
			.catch(next);
	}
};
