import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import * as styles from './HomePage.css';

import ImageDisplayList from '../../components/ImageDisplayList/ImageDisplayList.jsx';
import { authActions } from '../../actions/authActions.js';
import Masonry from 'react-masonry-component';


const HomePage = ( props ) =>  {
  
  if( !props.recentImages ) {
    props.getRecentImages();
  }
  
  const showBrokenImageLink = ( event ) => {
    event.target.src = '/pinterest-app/dist/assets/images/brokenlink.png';
  }
  
  const masonryOptions = {
    transitionDuration: 0
  }
  
  if( props.recentImages ) {
    const recents = props.recentImages.map( ( image, key ) => {
      const link = '/pinterest-app/wall/' + image.userId;
      return <Link className={ styles.imageContainer }  key={ key } to={ link } >
        <img className={ styles.image } src={ image.imageUrl } onError={ showBrokenImageLink }/>
        <div className={ styles.imageFooter } > 
          <div className={ styles.imageFooterText }> { image.userDisplayName }</div>
        </div>
      </Link>
    });
    return <div><div className={ styles.title } > Recent Images </div>
      <Masonry
        className={ styles.masonry } // default ''
        elementType={'div'} // default 'div'
        options={ masonryOptions } // default {}
        disableImagesLoaded={ false } // default false
        updateOnEachImageLoad={ false } // default false and works only if disableImagesLoaded is false
      >
        { recents } 
      </Masonry>
    </div>
  }
  return <div>
    Loading...
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
});

export default connect(
  mapStateToProps, mapDispatchToProps
)( HomePage );