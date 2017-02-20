'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;
// const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLFloat = graphql.GraphQLFloat;

module.exports = new GraphQLObjectType({
	name: 'VideosVideo',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		sourceId: {
			type: GraphQLString
		},
		sourceType: {
			type: GraphQLString
		},
		data: {
			type: GraphQLString
		},
		width: {
			type: GraphQLInt
		},
		height: {
			type: GraphQLInt
		},
		websites: {
			type: new GraphQLList(GraphQLInt)
		},
		countViews: {
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
