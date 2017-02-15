'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;
const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLFloat = graphql.GraphQLFloat;

const StoriesTopic = new GraphQLObjectType({
	name: 'StoriesTopic',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLInt)
		},
		name: {
			type: GraphQLString
		},
		abbr: {
			type: GraphQLString
		},
		category: {
			type: GraphQLInt
		},
		slug: {
			type: GraphQLString
		},
		type: {
			type: GraphQLString
		}
	}
});

module.exports = new GraphQLObjectType({
	name: 'StoriesStory',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLInt)
		},
		topics: {
			type: new GraphQLList(StoriesTopic)
		},
		host: {
			type: GraphQLString
		},
		path: {
			type: GraphQLString
		},
		title: {
			type: GraphQLString
		},
		uniqueName: {
			type: GraphQLString
		},
		country: {
			type: GraphQLString
		},
		summary: {
			type: GraphQLString
		},
		category: {
			type: GraphQLInt
		},
		lang: {
			type: GraphQLString
		},
		webpageId: {
			type: GraphQLString
		},
		imageId: {
			type: GraphQLString
		},
		imageHost: {
			type: GraphQLString
		},
		countViews: {
			type: GraphQLInt
		},
		countNews: {
			type: GraphQLInt
		},
		countShares: {
			type: GraphQLInt
		},
		countQuotes: {
			type: GraphQLInt
		},
		countVideos: {
			type: GraphQLInt
		},
		videos: {
			type: new GraphQLList(GraphQLString)
		},
		quotes: {
			type: new GraphQLList(GraphQLString)
		},
		createdAt: {
			type: GraphQLFloat,
			resolve: function(root) {
				return Date.parse(root.createdAt);
			}
		},
		isImportant: {
			type: GraphQLBoolean,
			resolve: function(root) {
				return !!root.importantKey;
			}
		},
		status: {
			type: GraphQLString
		}
	}
});
