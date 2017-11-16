import { combineReducers } from 'redux';
import * as actions from '../actions/index.js';

const initialState ={
  isAuthorized:       false,
  done:               false,
  userDisplayName:    null,
  showModal:          false,
};

function currentState( state=initialState,actions ){
  switch( actions.type ){
    
    case 'CHECK_AUTH':
      return Object.assign( {}, state, {
        isAuthorized:         actions.isAuthorized,
        userDisplayName:      actions.userDisplayName,
        userId:               actions.userId,
      });
      
    case 'SET_NOT_DONE':
      return Object.assign( {}, state, {
        done:     false,
      });
      
    case 'SET_DONE':
      return Object.assign( {}, state, {
        done:     true,
      });

    case 'LOG_OUT':
      return Object.assign({}, state, initialState );
      
    case 'SHOW_MODAL':
      return Object.assign( {}, state, {
        showLoadingModal: actions.bool
      });
      
    default:
      return state;
  }
} 

const reducers = combineReducers({
 currentState
});

export default reducers;