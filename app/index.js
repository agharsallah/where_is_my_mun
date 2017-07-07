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
import RootTwoMap from "./2maps/RootTwoMap.js"

/*Data for Public*/
import VizRoot from "./vizRoot/VizRoot.js"
import About from "./vizRoot/About.js"
import RegTrackRoot from "./vizRoot/registrationTracker/RegTrackRoot.js"
injectTapEventPlugin();

ReactDOM.render(

    <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
    <Router history={browserHistory}>
        <Route  path="/" component={App}/> 
        <Route path="/statistics" component={RootMap}/> 
        <Route path="/newmun" component={NewMunRoot}/> 
        <Route path="/electionsocio" component={RootTwoMap}/> 
        <Route path="/viz" component={VizRoot}/> 
        <Route path="/viz/dailyreg" component={RegTrackRoot}/> 
        <Route path="/viz/about" component={About}/> 

    </Router>
    </MuiThemeProvider>
    </Provider>,
     document.getElementById('root')
    );