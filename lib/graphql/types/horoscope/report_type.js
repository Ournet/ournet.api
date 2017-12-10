'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;
const GraphQLList = graphql.GraphQLList;

const StatsType = new GraphQLObjectType({
	name: 'HoroscopeReportStats',
	fields: {
		health: {
			type: new GraphQLNonNull(GraphQLInt)
		},
		love: {
			type: new GraphQLNonNull(GraphQLInt)
		},
		success: {
			type: new GraphQLNonNull(GraphQLInt)
		},
	}
});

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
		numbers: {
			type: new GraphQLList(GraphQLInt)
		},
		stats: {
			type: StatsType
		},
		createdAt: {
			type: GraphQLFloat,
			resolve: function (root) {
				return Date.parse(root.createdAt);
			}
		}
	}
});
