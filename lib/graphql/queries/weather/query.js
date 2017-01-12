'use strict';

const logger = require('../../../logger');
const graphql = require('graphql');
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLFloat = graphql.GraphQLFloat;
const GraphQLString = graphql.GraphQLString;
const GraphQLInt = graphql.GraphQLInt;
const Data = require('../../../data');
const GraphQLJsonType = require('graphql-type-json');
const Promise = require('bluebird');
// const PlaceType = require('../../types/places.place');
// const getProjection = require('../../get-projection');

module.exports = {
	report: {
		type: GraphQLJsonType,
		args: {
			latitude: {
				name: 'latitude',
				type: new GraphQLNonNull(GraphQLFloat)
			},
			longitude: {
				name: 'longitude',
				type: new GraphQLNonNull(GraphQLFloat)
			},
			dates: {
				name: 'dates',
				type: GraphQLString
			},
			days: {
				name: 'days',
				type: GraphQLInt
			}
		},
		resolve(source, args) {
			logger.info('getting weather report', args);
			const key = Data.weather.helpers.formatForecastKey(args);
			return Data.weather.access.getForecast(key, args, { provider: 'metno' })
				.timeout(1000 * 6)
				.then(report => {
					if (report && report.days && (args.days || args.dates)) {
						if (args.days) {
							return {
								days: report.days.slice(0, args.days)
							};
						}
						if (args.dates) {
							const dates = args.dates.split(/[\s,;|]+/g);
							return {
								days: report.days.filter(day => {
									return dates.indexOf(day.date) > -1;
								})
							};
						}
					}
					return report;
				});
		}
	},

	placesReport: {
		type: GraphQLJsonType,
		args: {
			places: {
				name: 'places',
				type: new GraphQLNonNull(GraphQLString)
			},
			date: {
				name: 'date',
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve(root, args) {
			logger.info('getting placesReport', args);
			try {
				args.places = JSON.parse(args.places);
				args.places = args.places.map(place => {
					place.name = 'name';
					place.asciiname = 'name';
					return place;
				});
				return Data.weather.access.getPlacesForecast(args).timeout(1000 * 6);
			} catch (e) {
				console.trace(e);
				return Promise.reject(e);
			}
		}
	}
};
