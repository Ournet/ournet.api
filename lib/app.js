'use strict';

require('dotenv').load();

const logger = require('./logger');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql');

var server = express();

server.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

server.listen(process.env.PORT, () => {
	logger.warn('Listening at %s', process.env.PORT);
});
