'use strict';

const graphql = require('graphql');
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const Data = require('../../../data');
const logger = require('../../../logger');
const PlaceType = require('./place_type');
const PlaceListType = new GraphQLList(PlaceType);

module.exports = {
	geoPlace: {
		type: PlaceType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLInt)
			}
		},
		resolve(source, args) {
			logger.info('getting place report', args);
			return Data.places.access.place(args.id);
		}
	},
	geoSearchPlace: {
		type: PlaceListType,
		args: {
			limit: {
				name: 'limit',
				type: GraphQLInt,
				defaultValue: 10
			},
			country: {
				name: 'country',
				type: GraphQLString
			},
			query: {
				name: 'query',
				type: GraphQLString
			}
		},
		resolve(source, args) {
			logger.info('getting places data', args);
			if (args.query && args.query.length > 2) {
				return Data.places.search.suggest({
					query: args.query,
					country: args.country,
					size: args.limit
				});
			}
			return [];
		}
	}
};
