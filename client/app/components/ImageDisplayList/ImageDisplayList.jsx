import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../actions/authActions.js';
import Modal from 'react-modal';

import * as styles from './ImageDisplayList.css';

import Masonry from 'react-masonry-component';

const ImageDisplayList = ( props ) => {
  if( !props.userImageList ) return <div></div>;
  
  const showBrokenImageLink = ( event ) => {
    event.target.src = '/pinterest-app/dist/assets/images/brokenlink.png';
  }
  
  const removeImageFromUser = ( imageId ) => {
    props.removeImageFromUser( imageId );
  }
  
  const imageList = props.userImageList.map( ( image, key ) => {
    return <div className={ styles.imageContainer }  key={ key } >
      <div className={ styles.imageHeader } > 
        <span className={ styles.xContainer } > 
          { String.fromCharCode(0x2716) } 
          <div className={ styles.toolTip } onClick={ () => removeImageFromUser( image.id ) } >
            DELETE IMAGE
          </div>
        </span> 
        
      </div>
      <img className={ styles.image } src={ image.imageUrl } onError={ showBrokenImageLink }/>
      <div className={ styles.imageFooter } > 
        <span className={ styles.heartContainer } > 
          { String.fromCharCode(0x2764) + ' ' + ( image.hearts || 0 ) } 
        </span> 
      </div>
    </div>
  });
  
  const masonryOptions = {
    transitionDuration: 0
  }
  
  return <Masonry
    className={ styles.masonry } // default ''
    elementType={'div'} // default 'div'
    options={ masonryOptions } // default {}
    disableImagesLoaded={ false } // default false
    updateOnEachImageLoad={ false } // default false and works only if disableImagesLoaded is false

  >
    { imageList } 
  </Masonry>
}

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.authState.isAuthorized,
  done:               state.authState.done,
  userImageList:      state.authState.userImageList,
});

const mapDispatchToProps = ( dispatch ) => ({
 // actions:    bindActionCreators( actions, dispatch ),
  checkAuth:    () => dispatch( authActions.checkAuth() ),
  logout:       () => dispatch( authActions.logout() ),
  setDone:      () => dispatch( authActions.setDone() ),
  setNotDone:   () => dispatch( authActions.setNotDone() ),
  removeImageFromUser:  ( imageId ) => dispatch( authActions.removeImageFromUser( imageId ) )
});

export default connect(
  mapStateToProps, mapDispatchToProps
)( ImageDisplayList );