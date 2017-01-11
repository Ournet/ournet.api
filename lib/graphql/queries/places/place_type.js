'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLID = graphql.GraphQLID;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;
const Data = require('../../../data');

const PlaceType = module.exports = new GraphQLObjectType({
	name: 'Place',
	fields: () => {
		return {
			id: {
				type: GraphQLID
			},
			name: {
				type: new GraphQLNonNull(GraphQLString)
			},
			asciiname: {
				type: new GraphQLNonNull(GraphQLString)
			},
			alternatenames: {
				type: GraphQLString
			},
			latitude: {
				type: GraphQLFloat
			},
			longitude: {
				type: GraphQLFloat
			},
			feature_class: {
				type: new GraphQLNonNull(GraphQLString)
			},
			feature_code: {
				type: new GraphQLNonNull(GraphQLString)
			},
			country_code: {
				type: new GraphQLNonNull(GraphQLString)
			},
			admin1_code: {
				type: new GraphQLNonNull(GraphQLString)
			},
			admin2_code: {
				type: GraphQLString
			},
			admin3_code: {
				type: GraphQLString
			},
			population: {
				type: GraphQLInt
			},
			elevation: {
				type: GraphQLInt
			},
			dem: {
				type: GraphQLInt
			},
			timezone: {
				type: GraphQLString
			},
			modification_date: {
				type: GraphQLString
			},
			adm1_key: {
				type: GraphQLString
			},
			type_adm1: {
				type: GraphQLString
			},
			type_city: {
				type: GraphQLString
			},
			region: {
				type: PlaceType,
				resolve: (place) => {
					if (place.region === null) {
						return undefined;
					}
					if (place.region) {
						return place.region;
					}
					if (place.admin1_code && place.country_code && place.feature_class && place.feature_class !== 'A') {
						return Data.places.access.adm1({ country_code: place.country_code, admin1_code: place.admin1_code });
					}
				}
			}
		};
	}
});
