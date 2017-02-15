'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;

module.exports = new GraphQLObjectType({
	name: 'NewsWebsite',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLInt)
		},
		host: {
			type: GraphQLString
		},
		url: {
			type: GraphQLString
		},
		title: {
			type: GraphQLString
		},
		name: {
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
		contentType: {
			type: GraphQLInt
		},
		createdAt: {
			type: GraphQLFloat,
			resolve: function(root) {
				return Date.parse(root.createdAt);
			}
		}
	}
});
