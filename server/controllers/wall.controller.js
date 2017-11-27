const getUserInfo = require( '../lib/user/getUserInfo.js' );

module.exports = {
  wall: ( req, res ) => {
    res.render("wall");
  },
  
  getWallInfo: ( req, res ) => {
    const { userId } = req.params;
    if( !userId ) return;
    getUserInfo( userId )
      .then( promiseResponse => {
        let { user, message } = promiseResponse;
        res.send({
          user: {
            userId:         user.userId,
            twitterHandle:  user.twitterHandle,
            imageList:      user.imageList,
          },
          message:  message
        });
      })
      .catch( error => console.log( error ) );
  },
  
  redirect: ( req, res ) => {
    res.redirect( '/pinterest-app/dashboard' );
  }
}