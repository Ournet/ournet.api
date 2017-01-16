'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLInt = graphql.GraphQLInt;

module.exports = new GraphQLObjectType({
	name: 'PlaceOldId',
	fields: {
		id: {
			type: GraphQLInt
		},
		geonameid: {
			type: GraphQLInt
		}
	}
});
