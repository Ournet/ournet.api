'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;

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
		}
	}
});
