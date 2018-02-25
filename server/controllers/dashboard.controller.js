//---------------------- User's Wall router ------------------------------------
module.exports = {
  dashboard: ( req, res ) => {
    const auth = req.isAuthenticated();
    if( !auth ){
      res.redirect('/pinterest-app/');
    }
    else{
      res.render("homepage");
    }
  }
}
