import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import Favicon from 'react-favicon';

import configureStore from './store';

import RootContainer from './containers';

const history = createHistory();

const render = (Component) => {
    ReactDom.render( 
        <Provider store = { configureStore() }>
            <ConnectedRouter history = { history } >
                <Component/>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root'));
}

render(RootContainer);