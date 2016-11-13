'use strict';

require('dotenv').load();

var News = require('ournet.data.news');
// var Topics = require('entitizer.entities-storage');
// var Stories = require('ournet.data.stories');
// var Quotes = require('ournet.data.quotes');
// var Videos = require('ournet.data.videos');

// exports.common = data;

const news = {
	access: News.getAccessService(),
	control: News.getControlService(),
	search: News.Search
};

// var topics = exports.topics = {
// 	access: new Topics.AccessService(),
// 	util: Topics.utils,
// 	categories: Topics.categories,
// 	EntityName: Topics.EntityName
// };

// exports.stories = {
// 	access: new Stories.AccessService(),
// 	control: new Stories.ControlService(),
// 	search: Stories.Search
// };

// exports.quotes = {
// 	access: new Quotes.AccessService(),
// 	control: new Quotes.ControlService()
// };

// exports.videos = {
// 	access: new Videos.AccessService(),
// 	control: new Videos.ControlService()
// };


module.exports = {
	loadPriority: 1000,
	startPriority: 1000,
	stopPriority: 1000,
	initialize: function(api, next) {
		api.data = {
			news: news
		};

		next();
	},
	start: function(api, next) {
		next();
	},
	stop: function(api, next) {
		next();
	}
};
