import * as actions from '../actions/wallActions.js';

const initialState ={
  wallImageList:        null,
  wallUsername:         null,
};

function wallState( state=initialState,actions ){
  switch( actions.type ){
      
    case 'UPDATE_WALL':
      return Object.assign( {}, state, {
        wallImageList:  actions.wallImageList,
        wallUsername:   actions.wallUsername,
      })
      
    default:
      return state;
  }
} 

export default wallState;