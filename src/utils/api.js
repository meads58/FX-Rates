"use strict";

var Fetch = require('whatwg-fetch');
var rootUrl = 'https://openexchangerates.org/api/'
var currencies = require('./data').currencies;
var _ = require('lodash');

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var Api = {
	getAllCurrencies_Api: function() {
		return fetch(rootUrl + 'currencies.json')
		.then(function(response) {
			return response.json();
		});
	},

	getAllCurrencies: function() {
		return _clone(currencies)
	}
};

module.exports = Api

