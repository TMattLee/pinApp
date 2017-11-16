import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export const SET_NOT_DONE = 'SET_NOT_DONE';
export const SET_DONE = 'SET_DONE'

export const CHECK_AUTH = 'CHECK_AUTH';
export const LOG_OUT = 'LOG_OUT';
export const SHOW_MODAL = 'SHOW_MODAL';

export const checkAuth = () => {
  return ( dispatch ) => {
    axios.get( '/pinterest-app/auth' )
    .then( response => {
      if( !response.data.auth ){
        dispatch({
          type: CHECK_AUTH,
          isAuthorized: false,
        });
      }
      else{
        dispatch({
          type: CHECK_AUTH,
          isAuthorized: true,
          userDisplayName: response.data.displayName,
        });
      }
    })
    .catch( error => {
      console.log( error );
    })
  }
}

export const logout = () => {
  return ( dispatch ) => {
    
    
    setTimeout( () => {
        axios.get( '/pinterest-app/logout' )
      .then( response => {
        dispatch({
          type: LOG_OUT,
        });
      })
      .catch( error => {
        console.log( error );
      });
    }, 1000);
  }
}

export const showModal = ( modalType, bool ) => ({
  type:       SHOW_MODAL,
  modalType:  modalType,
  bool:       bool,
});

export const setNotDone = () => ({
  type:   SET_NOT_DONE,
});

export const setDone = () => ({
  type:   SET_DONE,
})




