const User = require( '../../models/user.js' );
const RecentImage = require( '../../models/recentImage.js' );

const removeImageFromUser = ( userId, imageId ) => {
  return new Promise( ( resolve, reject ) => {
    User.findOne(
      {
        userId: userId
      },
      ( error, user ) => {
        if ( error ) {
          console.log( error );
          reject( "ERROR" );
        }
        
        let newImageList = user.imageList.filter( ( image )=> {
          return image.id != imageId;
        });
        
        user.imageList = newImageList;
        
        user.save( error => {
          if ( error ) {
            console.log( error );
            reject( "ERROR" );
          }
          else {
            RecentImage.find( 
              {
                imageId:  imageId,
                userId:   userId,
              })
            .remove( error => {
              if ( error ) {
                console.log( error );
                reject( "ERROR" );
              }
              resolve({
                user: user,
                message: 'OK'
              });
            });
          }
        });
      });
  });
}

module.exports = removeImageFromUser;