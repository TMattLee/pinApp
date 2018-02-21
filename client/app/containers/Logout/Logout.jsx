import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authActions } from '../../actions/authActions.js';

import * as styles from './Logout.css';

const Logout = ( props ) => {
  console.log(props);
  
  props.logout(); 
  
  const intfunct = () => {
    if(!props.isAuthorized){
      clearInterval(tryRedirect);
      window.location = '/pinterest-app/';
    }
  }
  
  const tryRedirect = setInterval(intfunct, 500);
  
  return<div className={ styles.container } >
    <div className={ styles.message } ></div>Logging you out
    <img className={ styles.spinner } src="/pinterest-app/dist/assets/images/blue_loading.gif" />
  </div>;
}

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.authState.isAuthorized,
  done:               state.authState.done,
  message:            state.authState.message,
  userDisplayName:    state.authState.userDisplayName,
});

const mapDispatchToProps = ( dispatch ) => ({
  logout: () => dispatch( authActions.logout() ),
})

export default connect( mapStateToProps,mapDispatchToProps )( Logout );
