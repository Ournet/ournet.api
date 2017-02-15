'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;

module.exports = new GraphQLObjectType({
	name: 'TopicsTopic',
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
		region: {
			type: GraphQLString
		},
		description: {
			type: GraphQLString
		},
		englishWikiId: {
			type: GraphQLInt
		},
		englishWikiName: {
			type: GraphQLString
		},
		wikiId: {
			type: GraphQLInt
		},
		wikiName: {
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
		createdAt: {
			type: GraphQLString
			// resolve: function(root) {
			//  return new Date(root.createdAt).getTime();
			// }
		},
		slug: {
			type: GraphQLString
		},
		type: {
			type: GraphQLString
		}
	}
});
