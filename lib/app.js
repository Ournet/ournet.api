'use strict';

require('dotenv').load();

const isProduction = process.env.NODE_ENV === 'production';
const logger = require('./logger');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql');
const auth = require('./middlewares/auth');

var server = express();

if (isProduction) {
	server.use(auth);
}

server.use('/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true
}));

server.listen(process.env.PORT, () => {
	logger.warn('Listening at %s', process.env.PORT);
});
