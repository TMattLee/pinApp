const RecentImage = require( '../../models/recentImage.js' );
const md5 = require('md5');

const updateRecentImages = ( userId, userDisplayName, imageUrl ) => {
  return new Promise( (resolve, reject ) => {
    const imageId = md5( imageUrl );
    
    RecentImage.findOneAndUpdate(
      {
        userId:           userId,
        imageId:          imageId,
        userDisplayName:  userDisplayName,
        imageUrl:         imageUrl
      },
      {
        date:             new Date(),
      },
      {
        upsert: true
      },
      
      ( error, image ) => {
        if ( error ) {
          console.log( error );
          reject( "ERROR" );
        }
        else {
          resolve( 'OK' );
        }
        /*if( !image ){
          let latest = new RecentImage({
            userId:           userId,
            userDisplayName:  userDisplayName,
            imageUrl:         imageUrl,
            imageId:          imageId,
            date:             new Date(),
          });
          
          latest.save( error => {
            if( error ){
              console.log( error );
              reject( error );
            }
            else {
              resolve( 'OK' );
            }
          });
        }*/
      })
      
  });
}

module.exports = updateRecentImages;