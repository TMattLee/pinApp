//---------------------------- Auth Router -------------------------------------
const getUserInfo = require( '../lib/user/getUserInfo.js' );

module.exports = {
  
  getAuth: ( req, res ) => {
    const auth = req.isAuthenticated();
    if( !auth ){
      res.redirect( '/pinterest-app/auth/twitter' );
    }
    else {
      getUserInfo( req.user.userId )
      .then( promiseResponse => {
        let { user, message } = promiseResponse;
        user.isAuthorized = auth;

        res.send({
          user: {
            isAuthorized: auth,
            userId:         user.userId,
            twitterHandle:  user.twitterHandle,
            imageList:  user.imageList,
          },
          message:  message
        });
      })
      .catch( error => console.log( error ) );
    }
  },
  
  getAuthTwitter: ( req, res ) => {
    // Initiates login on with twitter
  },

  getAuthTwitterCallback: ( req, res ) => {
    // Successful authentication, redirect dashboard.
    res.redirect( '/pinterest-app/dashboard' );
  },
  
  getAuthGoogle: (req, res ) => {
    
  },
  
  getAuthGoogleCallback: ( req, res ) => {
    // Successful authentication, redirect dashboard.
    res.redirect( '/pinterest-app/dashboard' );
  },
  
  getAuthFacebook: (req, res ) => {
    
  },
  
  getAuthFacebookCallback: ( req, res ) => {
    // Successful authentication, redirect dashboard.
    res.redirect( '/pinterest-app/dashboard' );
  }
}

