'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLID = graphql.GraphQLID;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;
const Data = require('../../../data');
const CurrencyType = require('./currency_type');
const SourceType = require('./source_type');

module.exports = new GraphQLObjectType({
	name: 'ExchangeRate',
	fields: () => {
		return {
			key: {
				type: GraphQLID
			},
			sourceId: {
				type: GraphQLInt
			},
			country: {
				type: new GraphQLNonNull(GraphQLString)
			},
			date: {
				type: new GraphQLNonNull(GraphQLString)
			},
			currencyCode: {
				type: GraphQLString
			},
			multiplier: {
				type: new GraphQLNonNull(GraphQLInt)
			},

			buy: {
				type: new GraphQLNonNull(GraphQLFloat)
			},
			sale: {
				type: new GraphQLNonNull(GraphQLFloat)
			},

			buy1d: {
				type: GraphQLFloat
			},
			sale1d: {
				type: GraphQLFloat
			},

			buy7d: {
				type: GraphQLFloat
			},
			sale7d: {
				type: GraphQLFloat
			},

			buy30d: {
				type: GraphQLFloat
			},
			sale30d: {
				type: GraphQLFloat
			},

			source: {
				type: SourceType,
				resolve(rate) {
					return Data.exchange.data.getSource(rate.country, rate.id);
				}
			},

			currency: {
				type: CurrencyType,
				resolve(rate) {
					return Data.exchange.data.getCurrency(rate.currencyCode);
				}
			}
		};
	}
});
