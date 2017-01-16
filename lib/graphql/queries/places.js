'use strict';

const graphql = require('graphql');

const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;

const Data = require('../../data');
const logger = require('../../logger');

const PlaceType = require('../types/places/place_type');
const PlaceOldIdType = require('../types/places/placeoldid_type');
const PlaceListType = new GraphQLList(PlaceType);
const IntListType = new GraphQLList(GraphQLInt);

module.exports = {
	place: {
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

	searchPlace: {
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
	},

	places: {
		type: PlaceListType,
		args: {
			limit: {
				name: 'limit',
				type: GraphQLInt,
				defaultValue: 10
			},
			ids: {
				name: 'ids',
				type: IntListType
			},
			regionKey: {
				name: 'regionKey',
				type: GraphQLString,
				description: '`regionKey` format: country_code-admin1_code'
			}
		},
		resolve(source, args) {
			logger.info('getting places data', args);
			if (args.ids) {
				return Data.places.access.places(args.ids);
			}
			if (args.regionKey) {
				return Data.places.access.placesByAdm1Key(args.regionKey, { limit: args.limit });
			}
			throw new Error('`ids` or `regionKey` are required');
		}
	},

	regions: {
		type: PlaceListType,
		args: {
			limit: {
				name: 'limit',
				type: GraphQLInt,
				defaultValue: 10
			},
			country: {
				name: 'country',
				type: new GraphQLNonNull(GraphQLString),
				description: 'Country code'
			}
		},
		resolve(source, args) {
			logger.info('getting regions data', args);
			return Data.places.access.placesByTypeAdm1(args.country, { limit: args.limit });
		}
	},

	region: {
		type: PlaceType,
		args: {
			admin1: {
				name: 'admin1',
				type: new GraphQLNonNull(GraphQLString),
				description: 'admin1 code'
			},
			country: {
				name: 'country',
				type: new GraphQLNonNull(GraphQLString),
				description: 'Country code'
			}
		},
		resolve(source, args) {
			logger.info('getting regions data', args);
			return Data.places.access.adm1({ country_code: args.country, admin1_code: args.admin1 });
		}
	},

	placeoldid: {
		type: PlaceOldIdType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLInt)
			}
		},
		resolve(source, args) {
			logger.info('getting oldplaceid', args);
			return Data.places.access.oldId(args.id);
		}
	}
};
