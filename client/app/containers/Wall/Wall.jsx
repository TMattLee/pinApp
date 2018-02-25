import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authActions } from '../../actions/authActions.js';
import { wallActions } from '../../actions/wallActions.js';
import * as styles from './Wall.css';


import Masonry from 'react-masonry-component';

class Wall extends Component {
  componentDidMount(){
    this.props.getWallInfo( this.props.match.params.userId );  // this ID is used to display the username depending on whose wall a user has clicked on.
  }
  
  render(){
    const { props } = this;
    const wallId = props.match.params.userId;
    const wallName = ( wallId == props.userId ) ? 'Your Wall' : props.wallUsername +'\'s Wall';
    
    
    const showBrokenImageLink = ( event ) => {
      event.target.src = '/pinterest-app/dist/assets/images/brokenlink.png';
    }
    
    const masonryOptions = {
      transitionDuration: 0
    }
    console.log(props)
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
        <div className={ styles.wallTitle } > { wallName }</div>
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
}

const mapStateToProps = ( state ) => ({
  wallImageList:  state.wallState.wallImageList,
  wallUsername:   state.wallState.wallUsername,
  userId:         state.authState.userId,
});

const mapDispatchToProps = ( dispatch ) => ({
 // actions:    bindActionCreators( actions, dispatch ),
  getWallInfo:  ( userId ) => dispatch( wallActions.getWallInfo( userId ) ),
  checkAuth:        () => dispatch( authActions.checkAuth() ),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)( Wall );

