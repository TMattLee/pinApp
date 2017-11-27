import * as actions from '../actions/authActions.js';

const initialState ={
  isAuthorized:       false,
  done:               false,
  userDisplayName:    null,
  userId:             null,
  message:            '',
  recentImages:       null,
};

const authState = ( state = initialState, actions ) => {
  switch( actions.type ){
    
    case 'CHECK_AUTH':
      return Object.assign( {}, state, {
        isAuthorized:     actions.isAuthorized,
        userDisplayName:  actions.userDisplayName,
        userId:           actions.userId,
        userImageList:    actions.userImageList,
        done:             actions.done,
        message:          actions.message,
      });

    case 'LOG_OUT':
      return Object.assign({}, state, initialState );
      
    case 'SET_NOT_DONE':
      return Object.assign( {}, state, {
        done:     false,
      });
      
    case 'SET_DONE':
      return Object.assign( {}, state, {
        done:     true,
      });
      
    case 'UPDATE_IMAGE_LIST':
      return Object.assign( {}, state, {
        userImageList:  actions.userImageList,
        message:        actions.message,
        done:           actions.done
      });
    
    case 'UPDATE_MESSAGE':
      return Object.assign( {}, state, {
        message:  actions.message,
      });
      
    case 'UPDATE_RECENT_IMAGES':
      return Object.assign( {}, state, {
        recentImages:  actions.recentImages,
      });
      
    default:
      return state;
  }
} 

export default authState;