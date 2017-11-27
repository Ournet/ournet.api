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
			return Data.places.access.getById(args.id);
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
			logger.info('sarching places data', args);
			if (args.query && args.query.length > 2) {
				return Data.places.access.search({
					query: args.query,
					country: args.country,
					limit: args.limit,
					type: 'phrase_prefix'
				})
					.then(items => items.map(place => parseInt(place.id)))
					.then(ids => {
						if (ids && ids.length) {
							return Data.places.access.getByIds(ids);
						}
						return [];
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
			admin1Key: {
				name: 'admin1Key',
				type: GraphQLString,
				description: '`admin1Key` format: country_code-admin1_code'
			}
		},
		resolve(source, args) {
			logger.info('getting places data', args);
			if (args.ids) {
				return Data.places.access.getByIds(args.ids);
			}
			if (args.admin1Key) {
				return Data.places.access.getPlacesInAdmin1({
					country: args.admin1Key.substr(0, 2),
					admin1Code: args.admin1Key.substr(3),
					limit: args.limit
				});
			}
			throw new Error('`ids` or `admin1Key` are required');
		}
	},

	mainPlaces: {
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
			logger.info('getting main places data', args);
			return Data.places.access.getMainPlaces({ country: args.country, limit: args.limit + 8 })
				.then(list => list && list.filter(item => ['PPLA', 'PPLC', 'PPLA2'].indexOf(item.featureCode) > -1).slice(0, args.limit));
		}
	},

	admin1s: {
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
			return Data.places.access.getAdmin1s({ country: args.country, limit: args.limit });
		}
	},

	admin1: {
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
			logger.info('getting region data', args);
			return Data.places.access.getAdmin1({ country: args.country, admin1Code: args.admin1 });
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
