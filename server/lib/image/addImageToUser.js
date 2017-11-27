const User = require( '../../models/user.js' );
const md5 = require('md5');

const addImageToUser = ( userId, imageUrl, imageTags ) => {
  return new Promise( (resolve, reject ) => {
    const imageId = md5( imageUrl )
    let user = User.findOne(
      {
        userId:   userId
      },
      ( error, user ) => {
        
        if ( error ) {
          console.log( error );
          reject( "ERROR" );
        };
        
        let alreadyOwned = false;
        let comp = null;
        for ( let i_a = 0; i_a < user.imageList.length; i_a++ ){
          comp = user.imageList[ i_a ].id;
          if(  comp === imageId ){
            alreadyOwned = true;
            break;
          }
        }
        if( !alreadyOwned ){
          let image = {
            id:         imageId,
            imageUrl:   imageUrl,
            hearts:     0,
            tags:       imageTags
          };
          
          user.imageList.push( image );
          
          user.save( error => {
            if ( error ) {
              console.log( error );
              reject( "ERROR" );
            }
            else {
              resolve({
                user:     user,
                message: 'OK',
              });
            }
          });
        }
        else{
          resolve({
            user:     user,
            message:  "ALREADY_OWNED_BY_USER" 
          });
        }
        
      });
  });
}

module.exports = addImageToUser;