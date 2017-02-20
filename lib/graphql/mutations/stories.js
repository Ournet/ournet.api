'use strict';

const graphql = require('graphql');

const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;

const Data = require('../../data');
const logger = require('../../logger');

const StoryType = require('../types/stories/story');

// const IntListType = new GraphQLList(GraphQLInt);

// const STORIES_ATTRS = ['id', 'title', 'summary', 'countViews', 'countNews', 'imageId', 'uniqueName', 'category', 'createdAt', 'host', 'path', 'videos', 'importantKey', 'status', 'topics'];

module.exports = {
	viewStory: {
		type: StoryType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLInt)
			}
		},
		resolve(source, args) {
			logger.info('news story', args);

			return Data.stories.control.updateStory({
				id: args.id,
				countViews: {
					$add: 1
				}
			}).then(function(story) {
				return Data.news.control.updateStory({
					id: story.id,
					country: story.country,
					lang: story.lang,
					countViews: story.countViews
				}).then(function() {
					return story;
				});
			});
		}
	}
};
