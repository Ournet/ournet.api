'use strict';

const graphql = require('graphql');

const GraphQLNonNull = graphql.GraphQLNonNull;
// const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;

const Data = require('../../data');
const logger = require('../../logger');

const VideoType = require('../types/videos/video');
const VideoListType = new GraphQLList(VideoType);

const StringListType = new GraphQLList(GraphQLString);

module.exports = {
	videos: {
		type: VideoListType,
		args: {
			ids: {
				name: 'ids',
				type: new GraphQLNonNull(StringListType)
			}
		},
		resolve(source, args) {
			logger.info('getting videos', args);

			return Data.videos.access.videos(args.ids);
		}
	},
	video: {
		type: VideoType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve(source, args) {
			logger.info('getting video', args);

			return Data.videos.access.video(args.id, {
				format: 'json'
			});
		}
	}
};
