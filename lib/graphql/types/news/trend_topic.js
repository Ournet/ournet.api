'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;
const GraphQLJsonType = require('graphql-type-json');

module.exports = new GraphQLObjectType({
	name: 'NewsTrendTopic',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLInt)
		},
		name: {
			type: GraphQLString
		},
		uniqueName: {
			type: GraphQLString
		},
		country: {
			type: GraphQLString
		},
		category: {
			type: GraphQLInt
		},
		lang: {
			type: GraphQLString
		},
		abbr: {
			type: GraphQLString
		},
		type: {
			type: GraphQLInt
		},
		counts: {
			type: GraphQLJsonType
		}
	}
});
