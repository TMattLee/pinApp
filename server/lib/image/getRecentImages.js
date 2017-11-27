const RecentImage = require( '../../models/recentImage.js' );

const getRecentImages = () => {
  return new Promise( ( resolve, reject ) => {
    RecentImage.find( {} )
      .sort( { date: -1 })
      .limit( 20 )
      .exec( ( error, recentImages ) => {
        if( error ){
          console.log( error );
          reject( error );
        }
        else {
          resolve( recentImages )
        }
      });
  });
}

module.exports = getRecentImages;