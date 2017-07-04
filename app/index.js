var React = require('react');
var ReactDOM = require('react-dom');
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import { Router, Route, browserHistory,IndexRoute  } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducers from "./reducers";
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

import App from "./App.js"
import RootMap from "./statistics/RootMap.js"
import NewMunRoot from "./newMunStatistics/RootMap.js"
injectTapEventPlugin();

ReactDOM.render(

    <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
    <Router history={browserHistory}>
        <Route  path="/" component={App}/> 
        <Route path="/statistics" component={RootMap}/> 
        <Route path="/newmun" component={NewMunRoot}/> 

    </Router>
    </MuiThemeProvider>
    </Provider>,
     document.getElementById('root')
    );