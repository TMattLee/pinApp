//---------------------- User's Wall router ------------------------------------
module.exports = {
  dashboard: ( req, res ) => {
    const auth = req.isAuthenticated();
    console.log( auth )
    if( !auth ){
      res.redirect('/pinterest-app/auth/twitter');
    }
    else{
      res.render("homepage");
    }
  }
}
