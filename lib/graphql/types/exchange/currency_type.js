'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;

const exchangeCurrencyName = new GraphQLObjectType({
	name: 'ExchangeCurrencyName',
	fields: {
		name: { type: new GraphQLNonNull(GraphQLString) }
	}
});

const exchangeCurrencyNames = new GraphQLObjectType({
	name: 'ExchangeCurrencyNames',
	fields: {
		ro: {
			type: exchangeCurrencyName
		},
		ru: {
			type: exchangeCurrencyName
		},
		bg: {
			type: exchangeCurrencyName
		}
	}
});

module.exports = new GraphQLObjectType({
	name: 'ExchangeCurrency',
	fields: () => {
		return {
			code: {
				type: new GraphQLNonNull(GraphQLString)
			},
			symbol: {
				type: GraphQLString
			},
			htmlName: {
				type: GraphQLString
			},
			names: {
				type: exchangeCurrencyNames
			}
		};
	}
});
