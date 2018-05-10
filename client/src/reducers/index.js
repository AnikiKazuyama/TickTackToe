import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import main from './message';

const root = combineReducers({
    main, 
    router: routerReducer
});

export default root;