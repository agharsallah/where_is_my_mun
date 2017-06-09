var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, browserHistory,IndexRoute  } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from "./App.js"
import Geocode from "./Geocode.js"
injectTapEventPlugin();


ReactDOM.render(
    <MuiThemeProvider>
    <Router history={browserHistory}>
        <Route  path="/" component={App}> 
        <Route path="/geocode" component={Geocode}/> 
        </Route>
    </Router>
    </MuiThemeProvider>,
     document.getElementById('root')
    );