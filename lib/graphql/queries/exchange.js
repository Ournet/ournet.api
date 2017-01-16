'use strict';

const graphql = require('graphql');

const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;

const Data = require('../../data');
const logger = require('../../logger');

const RateType = require('../types/exchange/rate_type');
const CurrencyType = require('../types/exchange/currency_type');
const SourceType = require('../types/exchange/source_type');
const SourceRates = require('../types/exchange/source_rates_type');

const RateListType = new GraphQLList(RateType);
const SourceListType = new GraphQLList(SourceType);
const CurrencyListType = new GraphQLList(CurrencyType);
const IntListType = new GraphQLList(GraphQLInt);
const StringListType = new GraphQLList(GraphQLString);
const SourceRatesListType = new GraphQLList(SourceRates);

function formatRate(data) {
	// console.log('formatRate', data);
	if (!data) {
		return data;
	}

	let list = data;
	if (!Array.isArray(list)) {
		list = [list];
	}
	for (var i = list.length - 1; i >= 0; i--) {
		if (list[i].rates) {
			formatRate(list[i].rates);
			continue;
		}
		if (list[i].source) {
			if (typeof list[i].source === 'number') {
				list[i].sourceId = list[i].source;
				delete list[i].source;
			} else {
				list[i].sourceId = list[i].sourceId || list[i].source.id;
				// delete list[i].source;
			}
		}
		if (list[i].currency) {
			if (typeof list[i].currency === 'string') {
				list[i].currencyCode = list[i].currency;
				delete list[i].currency;
			} else {
				list[i].currencyCode = list[i].currencyCode || list[i].currency.code;
				// delete list[i].currency;
			}
		}
	}

	return data;
}

module.exports = {
	source: {
		type: SourceType,
		args: {
			id: {
				name: 'id',
				type: new GraphQLNonNull(GraphQLInt)
			},
			country: {
				name: 'country',
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve(source, args) {
			logger.info('getting source report', args);
			return Data.exchange.data.getSource(args.country, args.id);
		}
	},
	sources: {
		type: SourceListType,
		args: {
			country: {
				name: 'country',
				type: new GraphQLNonNull(GraphQLString)
			},
			ids: {
				name: 'ids',
				type: IntListType
			}
		},
		resolve(root, args) {
			logger.info('getting sources report', args);
			let sources = Data.exchange.data.getSources(args.country);
			if (args.ids) {
				sources = sources.filter((item) => {
					return args.ids.indexOf(item.id) > -1;
				});
			}
			return sources;
		}
	},
	currency: {
		type: CurrencyType,
		args: {
			code: {
				name: 'code',
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve(root, args) {
			logger.info('getting currency report', args);
			return Data.exchange.data.getCurrency(args.code);
		}
	},
	currencies: {
		type: CurrencyListType,
		args: {
			codes: {
				name: 'codes',
				type: StringListType
			}
		},
		resolve(root, args) {
			logger.info('getting currencies report', args);
			let list = Data.exchange.data.getCurrencies();
			if (args.codes) {
				list = list.filter((item) => {
					return args.codes.indexOf(item.code) > -1;
				});
			}
			return list;
		}
	},

	rates: {
		type: RateListType,
		args: {
			keys: {
				name: 'keys',
				type: StringListType
			}
		},
		resolve(root, args) {
			logger.info('getting rates report', args);
			return Data.exchange.access.rates(args.keys).then(formatRate);
		}
	},
	rate: {
		type: RateListType,
		args: {
			key: {
				name: 'key',
				type: GraphQLString
			}
		},
		resolve(root, args) {
			logger.info('getting rate report', args);
			return Data.exchange.access.rate(args.key).then(formatRate);
		}
	},
	ratesBySource: {
		type: SourceRatesListType,
		args: {
			date: {
				name: 'date',
				type: new GraphQLNonNull(GraphQLString)
			},
			country: {
				name: 'country',
				type: new GraphQLNonNull(GraphQLString)
			},
			sources: {
				name: 'sources',
				type: IntListType
			},
			currencies: {
				name: 'currencies',
				type: StringListType
			}
		},
		resolve(root, args) {
			logger.info('getting ratesBySource report', args);
			return Data.exchange.access.ratesBySource(args).then(formatRate);
		}
	}
};
