import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import  app  from '../reducers/index';

// import watchFetch from '../saga/saga';

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();
const routeMiddleware = routerMiddleware(history);

export default function configureStore(){
    const store = createStore(
        app,
        applyMiddleware(sagaMiddleware, loggerMiddleware, routeMiddleware)
    );

    // sagaMiddleware.run(watchFetch);

    return store;
}