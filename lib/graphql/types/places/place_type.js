'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;
const Data = require('../../../data');
const GraphQLJsonType = require('graphql-type-json');
const moment = require('moment-timezone');
const utils = require('../../../utils');
const _ = utils._;

const PlaceType = module.exports = new GraphQLObjectType({
	name: 'Place',
	fields: () => {
		return {
			id: {
				type: GraphQLInt
			},
			name: {
				type: new GraphQLNonNull(GraphQLString)
			},
			asciiname: {
				type: GraphQLString
			},
			names: {
				type: GraphQLString
			},
			latitude: {
				type: GraphQLFloat
			},
			longitude: {
				type: GraphQLFloat
			},
			featureClass: {
				type: GraphQLString
			},
			featureCode: {
				type: GraphQLString
			},
			countryCode: {
				type: GraphQLString
			},
			admin1Code: {
				type: GraphQLString
			},
			admin2Code: {
				type: GraphQLString
			},
			admin3Code: {
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
			admin1: {
				type: PlaceType,
				resolve: (place) => {
					if (place.admin1 === null) {
						return undefined;
					}
					if (place.admin1) {
						return place.admin1;
					}
					if (place.featureClass === 'A' && place.featureCode === 'ADM1') {
						return place;
					}
					if (place.admin1Code && place.countryCode && place.featureClass !== 'A') {
						return Data.places.access.getAdmin1({ country: place.countryCode, admin1Code: place.admin1Code });
					}
				}
			},
			forecast: {
				type: GraphQLJsonType,
				args: {
					dates: {
						name: 'dates',
						type: GraphQLString
					},
					days: {
						name: 'days',
						type: GraphQLInt
					}
				},
				resolve(place, args) {
					// logger.info('getting weather report', args);
					const key = Data.weather.helpers.formatForecastKey(place);
					return Data.weather.access.getForecast(key, place, { provider: 'metno' })
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
			currentForecast: {
				type: GraphQLJsonType,
				args: {},
				resolve(place, args) {
					// logger.info('getting weather report', args);
					const key = Data.weather.helpers.formatForecastKey(place);
					return Data.weather.access.getForecast(key, args, { provider: 'metno' })
						.timeout(1000 * 6)
						.then(report => {
							if (report && report.days) {
								const placeDate = moment().tz(place.timezone);

								report = _.find(report.days, {
									date: placeDate.format('YYYY-MM-DD')
								});
								if (!report) {
									// debug('no report date: ', params.date, result[i], i, place);
									//console.log('no report date: ', date, result[i], i, place);
									return null;
								}
								const placeTime = placeDate.toDate().getTime();
								let time;

								for (var i = 0; i < report.times.length; i++) {
									if (i > 0 && report.times[i].time > placeTime) {
										break;
									}
									time = report.times[i];
								}

								report = time;
							}
							return report;
						});
				}
			}
		};
	}
});
