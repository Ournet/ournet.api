'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;
const GraphQLFloat = graphql.GraphQLFloat;

const Topic = new GraphQLObjectType({
	name: 'NewsTopic',
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
		uniqueName: {
			type: GraphQLString
		},
		type: {
			type: GraphQLString
		}
	}
});

module.exports = new GraphQLObjectType({
	name: 'NewsWebPage',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		host: {
			type: GraphQLString
		},
		path: {
			type: GraphQLString
		},
		urlHash: {
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
		websiteId: {
			type: GraphQLInt
		},
		imageId: {
			type: GraphQLString
		},
		videoId: {
			type: GraphQLString
		},
		storyId: {
			type: GraphQLInt
		},
		quotes: {
			type: new GraphQLList(GraphQLString)
		},
		topics: {
			type: new GraphQLList(Topic)
		},
		createdAt: {
			type: GraphQLFloat,
			resolve: function(root) {
				return Date.parse(root.createdAt);
			}
		}
	}
});
