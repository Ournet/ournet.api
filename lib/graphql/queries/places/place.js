'use strict';

const graphql = require('graphql');
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const Data = require('../../../data');
const PlaceType = require('../../types/places.place');
// const getProjection = require('../../get-projection');

module.exports = {
	type: PlaceType,
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLInt)
		}
	},
	resolve(source, args) {
		return Data.places.access.place(args.id);

		// const projection = getProjection(ast.fieldNodes[0]);
		// logger.info('projection', projection);
		// const getRegion = projection.indexOf('region') > -1;
		// return Data.places.access.place(args.id, {
		// 	params: {
		// 		AttributesToGet: projection
		// 	}
		// });
	}
};
