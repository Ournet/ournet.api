'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLBoolean = graphql.GraphQLBoolean;

const exchangeSourceName = new GraphQLObjectType({
	name: 'ExchangeSourceName',
	fields: {
		name: { type: GraphQLString },
		shortName: { type: GraphQLString }
	}
});

const exchangeSourceNames = new GraphQLObjectType({
	name: 'ExchangeSourceNames',
	fields: {
		ru: {
			type: exchangeSourceName
		}
	}
});

module.exports = new GraphQLObjectType({
	name: 'ExchangeSource',
	fields: () => {
		return {
			id: {
				type: new GraphQLNonNull(GraphQLInt)
			},
			isCentral: {
				type: GraphQLBoolean
			},
			uniqueName: {
				type: GraphQLString
			},
			country: {
				type: GraphQLString
			},
			name: {
				type: GraphQLString
			},
			shortName: {
				type: GraphQLString
			},
			abbr: {
				type: GraphQLString
			},
			names: {
				type: exchangeSourceNames
			}
		};
	}
});
