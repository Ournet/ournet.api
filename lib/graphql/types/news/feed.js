'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;

module.exports = new GraphQLObjectType({
	name: 'NewsFeed',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLInt)
		},
		urlHash: {
			type: GraphQLString
		},
		url: {
			type: GraphQLString
		},
		title: {
			type: GraphQLString
		},
		country: {
			type: GraphQLString
		},
		lang: {
			type: GraphQLString
		},
		status: {
			type: GraphQLString
		},
		websiteId: {
			type: GraphQLInt
		},
		contentType: {
			type: GraphQLInt
		},
		itemReadedAt: {
			type: GraphQLFloat,
			resolve: function(root) {
				return Date.parse(root.itemReadedAt);
			}
		},
		itemReadedHash: {
			type: GraphQLString
		},
		readErrorAt: {
			type: GraphQLFloat,
			resolve: function(root) {
				return Date.parse(root.readErrorAt);
			}
		},
		readError: {
			type: GraphQLString
		},
		createdAt: {
			type: GraphQLFloat,
			resolve: function(root) {
				return Date.parse(root.createdAt);
			}
		}
	}
});
