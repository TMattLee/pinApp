import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import styles from './HomePage.css';

import { checkAuth } from '../../actions/index.js';
import { resetResults } from '../../actions/index.js';
import { showModal } from '../../actions/index.js';

const HomePage = ( props ) =>  {
  return <div>
  </div>
  
}

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.currentState.isAuthorized,
  done:               state.currentState.done,
  message:            state.currentState.message,
  
});

const mapDispatchToProps = ( dispatch ) => ({
  checkAuth: () => dispatch( checkAuth() ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( HomePage );