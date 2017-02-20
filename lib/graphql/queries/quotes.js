'use strict';

const graphql = require('graphql');

const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;

const Data = require('../../data');
const logger = require('../../logger');

const QuoteType = require('../types/quotes/quote');
const QuoteListType = new GraphQLList(QuoteType);

const StringListType = new GraphQLList(GraphQLString);

module.exports = {
	quotes: {
		type: QuoteListType,
		args: {
			ids: {
				name: 'ids',
				type: new GraphQLNonNull(StringListType)
			}
		},
		resolve(source, args) {
			logger.info('getting quotes', args);

			return Data.quotes.access.quotes(args.ids);
		}
	},
	quote: {
		type: QuoteType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve(source, args) {
			logger.info('getting quote', args);

			return Data.quotes.access.quote(args.id, {
				format: 'json'
			});
		}
	},
	quotesByTopicId: {
		type: QuoteListType,
		args: {
			topicId: {
				name: 'topicId',
				type: new GraphQLNonNull(GraphQLInt)
			},
			limit: {
				name: 'limit',
				type: GraphQLInt,
				default: 10
			}
		},
		resolve(source, args) {
			args.limit = args.limit || 10;
			logger.info('getting quotesByTopicId', args);

			return Data.quotes.access.quotesAbout(args.topicId, { limit: args.limit });
		}
	},
	quotesByAuthorId: {
		type: QuoteListType,
		args: {
			authorId: {
				name: 'authorId',
				type: new GraphQLNonNull(GraphQLInt)
			},
			limit: {
				name: 'limit',
				type: GraphQLInt,
				default: 10
			}
		},
		resolve(source, args) {
			args.limit = args.limit || 10;
			logger.info('getting quotesByAuthorId', args);

			return Data.quotes.access.quotesByAuthor(args.authorId, { limit: args.limit });
		}
	}
};
