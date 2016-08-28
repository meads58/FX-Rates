"use strict";

var React = require('React');
var Api = require('../utils/api');

var Home = React.createClass({
    getInitialState: function() {
    	return {
    		currencies: []
    	};
    },

    componentWillMount: function() {
    	this.setState({ currencies: Api.getAllCurrencies() })
    },

    render: function() {
    	var createCurrencyRow = function(currency) {
    		return (
    			<tr key={currency.id}>
    				<td>{currency.id}</td>    				
    			</tr>
    		);
    	};

        return (
            <div className="jumbotron">
            	<h1>Currencies</h1>
            	<table className="table">
            		<thead>
            			<th>Code</th>
            			<th>Description</th>           			
            		</thead>
            		<tbody>
            			{this.state.currencies.map(createCurrencyRow, this)}
            		</tbody>
            	</table>

            </div>
        );
    }
});

module.exports = Home;