'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;

const Author = new GraphQLObjectType({
	name: 'NewsQuoteAuthor',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		name: {
			type: GraphQLString
		},
		uniqueName: {
			type: GraphQLString
		}
	}
});

const Webpage = new GraphQLObjectType({
	name: 'NewsQuoteWebpage',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		title: {
			type: GraphQLString
		},
		uniqueName: {
			type: GraphQLString
		},
		host: {
			type: GraphQLString
		},
		path: {
			type: GraphQLString
		}
	}
});

module.exports = new GraphQLObjectType({
	name: 'NewsQuote',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		text: {
			type: GraphQLString
		},
		webpage: {
			type: Webpage
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
			type: GraphQLFloat,
			resolve: function(root) {
				return Date.parse(root.createdAt);
			}
		},
		authorId: {
			type: GraphQLInt
		},
		author: {
			type: Author
		}
	}
});
