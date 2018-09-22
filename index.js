require("babel-register");
//var done = (function wait () { if (!done) setTimeout(wait, 1000) })();
rimraf=require('rimraf');

rimraf.sync('./wd/*');
rimraf.sync('./tmp/*');
const renderer = require('./renderer').default;
const App = require('./App').default;
const React = require('react');

renderer.render(React.createElement(App, null),{path:'./'});