import { combineReducers } from 'redux';
import modalState from './modalReducer.js';
import authState from './authReducer.js';
import wallState from './wallReducer.js';

const reducers = combineReducers({
 modalState, authState, wallState
});

export default reducers;