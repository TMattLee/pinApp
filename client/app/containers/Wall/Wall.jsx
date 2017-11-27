import React from 'react';
import { connect } from 'react-redux';

import { wallActions } from '../../actions/wallActions.js';
import * as styles from './Wall.css';
import Masonry from 'react-masonry-component';


const Wall = ( props ) => {
  if( !props.wallImageList ) {
    props.getWallInfo( props.match.params.userId )
  }
  
  const showBrokenImageLink = ( event ) => {
    event.target.src = '/pinterest-app/dist/assets/images/brokenlink.png';
  }
  
  const masonryOptions = {
    transitionDuration: 0
  }
  
  if( props.wallImageList ) {
    const wall = props.wallImageList.map( ( image, key ) => {
      return <div className={ styles.imageContainer }  key={ key } >
        <img className={ styles.image } src={ image.imageUrl } onError={ showBrokenImageLink }/>
        <div className={ styles.imageFooter } > 
          { image.userDisplayName }
          <span className={ styles.heartContainer } > 
            { String.fromCharCode(0x2764) + ' ' + ( image.hearts || 0 ) } 
          </span> 
        </div>
      </div>
    });
    return <div className={ styles.wallContainer } >
      <div className={ styles.wallTitle } > { props.wallUsername +'\'s Wall' }</div>
      <Masonry
        className={ styles.masonry } // default ''
        elementType={'div'} // default 'div'
        options={ masonryOptions } // default {}
        disableImagesLoaded={ false } // default false
        updateOnEachImageLoad={ false } // default false and works only if disableImagesLoaded is false
      >
        { wall } 
      </Masonry>
    </div>
  }
  return <div>
    Loading...
  </div>
}

const mapStateToProps = ( state ) => ({
  wallImageList:  state.wallState.wallImageList,
  wallUsername:   state.wallState.wallUsername,
});

const mapDispatchToProps = ( dispatch ) => ({
 // actions:    bindActionCreators( actions, dispatch ),
  getWallInfo:  ( userId ) => dispatch( wallActions.getWallInfo( userId ) ),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)( Wall );

