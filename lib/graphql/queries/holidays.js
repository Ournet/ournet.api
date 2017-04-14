'use strict';

const logger = require('../../logger');
const graphql = require('graphql');
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLString = graphql.GraphQLString;
const GraphQLInt = graphql.GraphQLInt;
const Data = require('../../data');
const GraphQLJsonType = require('graphql-type-json');

module.exports = {
	holidays: {
		type: GraphQLJsonType,
		args: {
			country: {
				name: 'country',
				type: new GraphQLNonNull(GraphQLString)
			},
			lang: {
				name: 'lang',
				type: new GraphQLNonNull(GraphQLString)
			},
			start: {
				name: 'start',
				type: GraphQLInt
			},
			end: {
				name: 'end',
				type: GraphQLInt
			}
		},
		resolve(source, args) {
			logger.info('getting holidays report', args);
			if (args.start) {
				args.start = args.start * 1000;
			}
			if (args.end) {
				args.end = args.end * 1000;
			}

			return Data.holidays(args).timeout(1000 * 6)
				.then(items => {
					const data = {};
					if (items) {
						items.forEach(item => {
							const key = item.start.toISOString().substr(0, 10);
							data[key] = data[key] || [];
							data[key].push(item);
						});
					}
					return data;
				});
		}
	}
};
