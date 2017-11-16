
//---------------------------- Auth Router -------------------------------------

module.exports = {
  getAuth: ( req, res ) => {
    const auth = req.isAuthenticated();
    if( !auth ){
      res.redirect( '/pinterest-app/auth/twitter' );
    }
    else {
      res.send({
        isAuthorized:   auth,
        userDisplayName:  req.user.twitterHandle,
      });
    }
  },
  
  getAuthTwitter: ( req, res ) => {

  },

  getAuthTwitterCallback: ( req, res ) => {
    // Successful authentication, redirect dashboard.
    console.log( req.user )
    res.redirect( '/pinterest-app/dashboard' );
  }
}

