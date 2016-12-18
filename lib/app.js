'use strict';

require('dotenv').load();

const logger = require('./logger');
const restify = require('restify');
const graphql = require('graphql').graphql;
const schema = require('./graphql');

var server = restify.createServer({
	name: 'OurnetAPI'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/graphql', (req, res, next) => {
	graphql(schema, req.body)
		.then((result) => {
			res.send(result);
		}, next);
});

server.get('/graphql', (req, res) => {
	const instruction = 'POST GraphQL queries to ' + server.url + '. Sample query: {contributor (id: "1")}';
	res.send(instruction);
});

server.listen(process.env.PORT, () => {
	logger.warn('%s listening at %s', server.name, server.url);
});
