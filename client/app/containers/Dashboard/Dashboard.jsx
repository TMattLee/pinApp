import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
//import * as actions from '../../actions/index.js';
import { authActions } from '../../actions/authActions.js';
import { modalActions } from '../../actions/modalActions.js';

import * as styles from './Dashboard.css';

import ImageDisplayList from '../../components/ImageDisplayList/ImageDisplayList.jsx';

const Dashboard = ( props ) => {
  
  if ( !props.isAuthorized ) props.checkAuth();
  
  const showModal = () => {
    props.setNotDone();
    props.showModal( true );
  }
  
  const hideModal = () => {
    props.showModal( false );
    props.setDone();
  }
  
  const handleSubmit = ( event ) => {
    event.preventDefault();
    const imageUrl = event.target[0].value;
    const imageTags = event.target[1].value.split(' ');
    props.addImageToUser( imageUrl, imageTags );
  }
  
  if( props.done && props.isModalOpen === true ) {
    hideModal();
    props.getRecentImages();
  }
  
  return <div className={ styles.dashboardContainer } >
    <Modal
      isOpen={ props.isModalOpen } 
      contentLabel="Image Modal"
      onRequestClose={ hideModal } 
      shouldCloseOnOverlayClick={ true } 
      className={{
        base: styles.modalClass,
        afterOpen: styles.modalClassAfterOpen,
        beforeClose: styles.modalClassBeforeClose
      }}
      overlayClassName={{
        base: styles.modalOverlayClass,
        afterOpen: styles.modalOverlayClassAfterOpen,
        beforeClose: styles.modalOverlayClassBeforeClose,
      }}
    >
      <form onSubmit={ handleSubmit } encType="x-www-urlencode">
        <div>
          Image url { ':  ' } 
          <input name="url"  /> <br />
          Tags ( space separated ) {  ':  ' } 
          <input name="url" /> <br />
          <button type="submit"> Submit </button>
        </div>
        <div style={{ color: 'red', height: '10px', marginTop: '5px'}}> { props.message } </div>
      </form>
    </Modal>
    <div className={ styles.imageButtonContainer } >
      <div className={ styles.addImageButton } onClick={ () => { showModal() } }>
        Add Image
      </div>
      <ImageDisplayList />
    </div>
  </div>
}

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.authState.isAuthorized,
  done:               state.authState.done,
  userImageList:      state.authState.userImageList,
  message:            state.authState.message,
  recentImages:       state.authState.recentImages,
  isModalOpen:        state.modalState.isModalOpen,
});

const mapDispatchToProps = ( dispatch ) => ({
 // actions:    bindActionCreators( actions, dispatch ),
  checkAuth:        () => dispatch( authActions.checkAuth() ),
  logout:           () => dispatch( authActions.logout() ),
  setDone:          () => dispatch( authActions.setDone() ),
  setNotDone:       () => dispatch( authActions.setNotDone() ),
  addImageToUser:   ( imageUrl, imageTags ) => dispatch( authActions.addImageToUser( imageUrl, imageTags ) ),
  getRecentImages:  () => dispatch( authActions.getRecentImages() ),
  showModal:        ( bool ) => dispatch( modalActions.showModal( bool ) ),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)( Dashboard );