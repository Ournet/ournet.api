'use strict';

const graphql = require('graphql');
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const Data = require('../../../data');
const logger = require('../../../logger');
const WebPageType = require('./webpage_type');
const WebPageListType = new GraphQLList(WebPageType);
const StoryType = require('./story_type');
const StoryListType = new GraphQLList(StoryType);
const utils = require('../../../utils');
const Promise = utils.Promise;

module.exports = {
	webpages: {
		type: WebPageListType,
		args: {
			country: {
				name: 'country',
				type: new GraphQLNonNull(GraphQLString)
			},
			lang: {
				name: 'lang',
				type: new GraphQLNonNull(GraphQLString)
			},
			where: {
				name: 'where',
				type: GraphQLString
			},
			limit: {
				name: 'limit',
				type: GraphQLInt
			},
			offset: {
				name: 'offset',
				type: GraphQLInt
			},
			select: {
				name: 'select',
				type: GraphQLString
			},
			order: {
				name: 'order',
				type: GraphQLString
			}
		},
		resolve(source, args) {
			if (args.where) {
				try {
					args.where = JSON.parse(args.where);
				} catch (e) {
					logger.error(e);
					return Promise.reject(e);
				}
			}
			args.culture = {
				country: args.country,
				lang: args.lang
			};

			logger.info('getting webpages', args);

			return Data.news.access.webpages(args);
		}
	},
	stories: {
		type: StoryListType,
		args: {
			country: {
				name: 'country',
				type: new GraphQLNonNull(GraphQLString)
			},
			lang: {
				name: 'lang',
				type: new GraphQLNonNull(GraphQLString)
			},
			where: {
				name: 'where',
				type: GraphQLString
			},
			limit: {
				name: 'limit',
				type: GraphQLInt
			},
			offset: {
				name: 'offset',
				type: GraphQLInt
			},
			select: {
				name: 'select',
				type: GraphQLString
			},
			order: {
				name: 'order',
				type: GraphQLString
			}
		},
		resolve(source, args) {
			if (args.where) {
				try {
					args.where = JSON.parse(args.where);
				} catch (e) {
					logger.error(e);
					return Promise.reject(e);
				}
			}
			args.culture = {
				country: args.country,
				lang: args.lang
			};

			logger.info('getting stories', args);

			return Data.news.access.stories(args);
		}
	}
};
