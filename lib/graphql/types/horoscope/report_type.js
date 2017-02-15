'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;

module.exports = new GraphQLObjectType({
	name: 'HoroscopeReport',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		text: {
			type: GraphQLString
		},
		length: {
			type: GraphQLInt
		},
		source: {
			type: GraphQLString
		},
		period: {
			type: GraphQLString
		},
		sign: {
			type: GraphQLInt
		},
		lang: {
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
