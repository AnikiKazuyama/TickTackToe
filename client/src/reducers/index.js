import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';

const root = combineReducers({
    user
    //router: routerReducer
});

export default root;