import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Logout = ( props ) => {
  return <Redirect to="/pinterest-app/" />
}

export default connect()( Logout );
