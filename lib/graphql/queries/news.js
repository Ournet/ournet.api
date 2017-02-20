'use strict';

const graphql = require('graphql');

const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;

const Data = require('../../data');
const logger = require('../../logger');
const utils = require('../../utils');
const Promise = utils.Promise;

const WebPageType = require('../types/news/webpage_type');
const WebPageListType = new GraphQLList(WebPageType);
const StoryType = require('../types/news/story_type');
const StoryListType = new GraphQLList(StoryType);
const TrendTopicType = require('../types/news/trend_topic');
const TrendTopicListType = new GraphQLList(TrendTopicType);
const QuoteType = require('../types/news/quote');
const QuoteListType = new GraphQLList(QuoteType);
const WebsiteType = require('../types/news/website');
const WebsiteListType = new GraphQLList(WebsiteType);
const FeedType = require('../types/news/feed');
const FeedListType = new GraphQLList(FeedType);

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
	webpage: {
		type: WebPageType,
		args: {
			country: {
				name: 'country',
				type: new GraphQLNonNull(GraphQLString)
			},
			lang: {
				name: 'lang',
				type: new GraphQLNonNull(GraphQLString)
			},
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve(source, args) {

			logger.info('getting webpage', args);

			return Data.news.access.webpage({
				culture: {
					country: args.country,
					lang: args.lang
				},
				where: {
					_id: args.id
				}
			});
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
	},
	trendTopics: {
		type: TrendTopicListType,
		args: {
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

			logger.info('getting trendTopics', args);

			return Data.news.access.trendTopics(args);
		}
	},
	quotes: {
		type: QuoteListType,
		args: {
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

			logger.info('getting quotes', args);

			return Data.news.access.quotes(args);
		}
	},
	websites: {
		type: WebsiteListType,
		args: {
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

			logger.info('getting websites', args);

			return Data.news.access.websites(args);
		}
	},
	websiteById: {
		type: WebsiteType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLInt)
			}
		},
		resolve(source, args) {

			logger.info('getting website', args);

			return Data.news.access.website({
				where: {
					_id: args.id
				}
			});
		}
	},
	website: {
		type: WebsiteType,
		args: {
			where: {
				name: 'where',
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve(source, args) {

			logger.info('getting website', args);

			try {
				args.where = JSON.parse(args.where);
			} catch (e) {
				logger.error(e);
				return Promise.reject(e);
			}

			return Data.news.access.website({
				where: args.where
			});
		}
	},
	feeds: {
		type: FeedListType,
		args: {
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

			logger.info('getting feeds', args);

			return Data.news.access.feeds(args);
		}
	},
	feed: {
		type: FeedType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLInt)
			}
		},
		resolve(source, args) {

			logger.info('getting feed', args);

			return Data.news.access.feed({
				where: {
					_id: args.id
				}
			});
		}
	}
};
