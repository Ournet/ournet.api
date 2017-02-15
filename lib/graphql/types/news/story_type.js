'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;
const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLFloat = graphql.GraphQLFloat;

module.exports = new GraphQLObjectType({
	name: 'NewsStory',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLInt)
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
		videos: {
			type: new GraphQLList(GraphQLString)
		},
		createdAt: {
			type: GraphQLFloat,
			resolve: function(root) {
				return Date.parse(root.createdAt);
			}
		},
		isImportant: {
			type: GraphQLBoolean
		}
	}
});
