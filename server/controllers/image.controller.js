//---------------------------- Image Router -------------------------------------
const addImageToUser = require( '../lib/image/addImageToUser.js' );
const removeImageFromUser = require( '../lib/image/removeImageFromUser' );
const updateRecentImages = require( '../lib/image/updateRecentImages.js' );
const getRecentImages = require( '../lib/image/getRecentImages.js' );

module.exports = {
  
  addImage: ( req, res ) => {
    const auth = req.isAuthenticated();
    console.log( auth )
    if( !auth ){
      res.send({
        message: 'NOT_AUTHORIZED'
      });
    }
    else {
      const { imageUrl, imageTags } = req.body;
      const { userId, twitterHandle } = req.user;
      addImageToUser( userId, imageUrl, imageTags )
      .then( promiseResponse => {
        updateRecentImages( userId, twitterHandle, imageUrl )
        .then( data => res.send( promiseResponse ) )
        .catch( error => console.log( error ) );
      })
      .catch( error => console.log( error ) );
    }
  },
  
  removeImage: ( req, res ) => {
    const auth = req.isAuthenticated();
    if( !auth ){
      res.send({
        message: 'NOT_AUTHORIZED'
      });
    }
    const { imageId } = req.body;
    const userId = req.user.userId;
    removeImageFromUser( userId, imageId )
    .then( promiseResponse => {
      res.send( promiseResponse )
    })
    .catch( error => console.log( error ) );;
  },
  
  getRecentImages: ( req, res ) => {
    getRecentImages()
    .then( recentImages => {
      res.send( recentImages );
    })
    .catch( error => console.log( error ) );
  }
  
}