'use strict';

const logger = require('../../../logger');
const graphql = require('graphql');
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLFloat = graphql.GraphQLFloat;
const GraphQLString = graphql.GraphQLString;
const GraphQLInt = graphql.GraphQLInt;
const Data = require('../../../data');
const GraphQLJsonType = require('graphql-type-json');
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
	}
};
