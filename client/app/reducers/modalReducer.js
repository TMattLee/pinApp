import * as actions from '../actions/modalActions.js';

const initialState ={
  isModalOpen:          false,
};

function modalState( state=initialState,actions ){
  switch( actions.type ){
      
    case 'SHOW_MODAL':
      return Object.assign( {}, state, {
        isModalOpen: actions.bool
      });
      
    default:
      return state;
  }
} 

export default modalState;