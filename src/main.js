$ = jQuery = require('jquery'); //bootstrap expects jQuery to be in the global namespace
var React = require('react');
var ReactDom = require('react-dom');
var Home = require('./components/homePage');


ReactDom.render(< Home />, document.getElementById('app'))