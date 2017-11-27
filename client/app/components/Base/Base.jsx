import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { connect } from 'react-redux';

import styles from './Base.css'

const Base = ( props ) => {
  return(
    <div className={ styles.pageContainer } >
      <Header location={ props.history.location } />
        <div className={ styles.appWindow }>
          { renderRoutes( props.route.routes ) }
        </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.authState.isAuthorized,
  done:               state.authState.done,
  message:            state.authState.message,
});

export default connect(
  mapStateToProps
)( Base );