'use strict';

const graphql = require('graphql');

const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;

const ReportType = require('../types/horoscope/report_type');
const GraphQLJsonType = require('graphql-type-json');
const ReportListType = new GraphQLList(ReportType);
const IntListType = new GraphQLList(GraphQLInt);

const utils = require('../../utils');
const Promise = utils.Promise;
const Data = require('../../data');
const logger = require('../../logger');

module.exports = {
	report: {
		type: ReportType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve(source, args) {
			logger.info('getting report', args);

			return Data.horoscope.report.one({ where: { _id: args.id } });
		}
	},
	reports: {
		type: ReportListType,
		args: {
			where: {
				name: 'where',
				type: new GraphQLNonNull(GraphQLString)
			},
			limit: {
				name: 'limit',
				type: GraphQLInt
			},
			offset: {
				name: 'offset',
				type: GraphQLInt
			},
			select: {
				name: 'select',
				type: GraphQLString
			},
			order: {
				name: 'order',
				type: GraphQLString
			}
		},
		resolve(source, args) {
			if (args.where) {
				try {
					args.where = JSON.parse(args.where);
				} catch (e) {
					logger.error(e);
					return Promise.reject(e);
				}
			}

			logger.info('getting reports', args);

			return Data.horoscope.report.list(args);
		}
	},

	signsNames: {
		type: GraphQLJsonType,
		args: {
			ids: {
				name: 'ids',
				type: IntListType
			}
		},
		resolve(source, args) {
			logger.info('getting signsNames', args);

			const names = Data.horoscope.signsNames;

			if (args.ids && args.ids.length) {
				return args.ids.map(id => {
					id = id.toString();
					return names[id];
				});
			}

			return names;
		}
	},
};
