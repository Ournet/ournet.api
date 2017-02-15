'use strict';

const graphql = require('graphql');

const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
// const GraphQLList = graphql.GraphQLList;

const Data = require('../../data');
const logger = require('../../logger');

const TopicType = require('../types/topics/topic');
// const TopicListType = new GraphQLList(TopicType);
// const IntListType = new GraphQLList(GraphQLInt);

module.exports = {
	topicById: {
		type: TopicType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLInt)
			}
		},
		resolve(source, args) {
			logger.info('getting topicById', args);
			return Data.topics.access.entityById(args.id);
		}
	},
	topicByKey: {
		type: TopicType,
		args: {
			key: {
				name: 'key',
				type: new GraphQLNonNull(GraphQLInt)
			}
		},
		resolve(source, args) {
			logger.info('getting topicByKey', args);
			return Data.topics.access.entityByKey(args.key);
		}
	},
	topicByName: {
		type: TopicType,
		args: {
			name: {
				name: 'name',
				type: new GraphQLNonNull(GraphQLString)
			},
			lang: {
				name: 'lang',
				type: new GraphQLNonNull(GraphQLString)
			},
			country: {
				name: 'country',
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve(source, args) {
			logger.info('getting topicByName', args);
			return Data.topics.access.entityByName(args);
		}
	}
};
