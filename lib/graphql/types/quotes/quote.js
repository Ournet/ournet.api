'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;
// const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLFloat = graphql.GraphQLFloat;

const QuotesTopic = new GraphQLObjectType({
	name: 'QuotesTopic',
	fields: {
		id: {
			type: GraphQLInt
		},
		name: {
			type: GraphQLString
		},
		abbr: {
			type: GraphQLString
		},
		category: {
			type: GraphQLInt
		},
		uniqueName: {
			type: GraphQLString
		},
		type: {
			type: GraphQLString
		}
	}
});

const QuotesWebpage = new GraphQLObjectType({
	name: 'QuotesWebpage',
	fields: {
		id: {
			type: GraphQLString
		},
		title: {
			type: GraphQLString
		},
		host: {
			type: GraphQLString
		},
		path: {
			type: GraphQLString
		},
		uniqueName: {
			type: GraphQLString
		}
	}
});

module.exports = new GraphQLObjectType({
	name: 'QuotesQuote',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		authorId: {
			type: GraphQLInt
		},
		author: {
			type: QuotesTopic
		},
		topics: {
			type: new GraphQLList(QuotesTopic)
		},
		webpageId: {
			type: GraphQLString
		},
		webpage: {
			type: QuotesWebpage
		},
		text: {
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
