'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLList = graphql.GraphQLList;
const RateType = require('./rate_type');
const SourceType = require('./source_type');
const RateListType = new GraphQLList(RateType);

module.exports = new GraphQLObjectType({
	name: 'ExchangeSourceRates',
	fields: () => {
		return {
			source: {
				type: new GraphQLNonNull(SourceType)
			},
			rates: {
				type: RateListType
			}
		};
	}
});
