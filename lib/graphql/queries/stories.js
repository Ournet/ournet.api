'use strict';

const graphql = require('graphql');

const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;

const Data = require('../../data');
const logger = require('../../logger');

const StoryType = require('../types/stories/story');
const StoryListType = new GraphQLList(StoryType);
// const QuoteType = require('../types/stories/quote');
// const QuoteListType = new GraphQLList(QuoteType);

const IntListType = new GraphQLList(GraphQLInt);

const STORIES_ATTRS = ['id', 'title', 'summary', 'countViews', 'imageId', 'uniqueName', 'category', 'createdAt', 'host', 'path', 'videos', 'importantKey', 'status'];

module.exports = {
	stories: {
		type: StoryListType,
		args: {
			ids: {
				name: 'ids',
				type: new GraphQLNonNull(IntListType)
			}
		},
		resolve(source, args) {
			logger.info('getting stories', args);

			return Data.stories.access.stories(args.ids, {
				format: 'items',
				params: {
					AttributesToGet: STORIES_ATTRS
				}
			});
		}
	},
	story: {
		type: StoryType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLInt)
			}
		},
		resolve(source, args) {
			logger.info('getting story', args);

			return Data.stories.access.story(args.id, {
				format: 'json',
				params: {
					AttributesToGet: STORIES_ATTRS
				}
			});
		}
	}
};
