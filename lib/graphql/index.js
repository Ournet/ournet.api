'use strict';

const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLSchema = graphql.GraphQLSchema;

const mutations = require('./mutations');
const queries = require('./queries');

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: queries
	})
	,
	mutation: new GraphQLObjectType({
		name: 'Mutation',
		fields: mutations
	})
});
