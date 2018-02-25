const express = require( 'express' );
const router = express.Router();
const passport = require( '../lib/passport/passport.js');

const homeController = require( '../controllers/home.controller.js' );
const dashboardController = require( '../controllers/dashboard.controller.js' );
const wallController = require('../controllers/wall.controller.js' );
const authController = require( '../controllers/auth.controller.js' );
const loginController = require( '../controllers/login.controller.js' );
const logoutController = require( '../controllers/logout.controller.js' );
const imageController = require( '../controllers/image.controller.js' );

const googleAuthenticationScope = passport.authenticate( 'google', { scope: ['https://www.googleapis.com/auth/plus.login'] } )
const googleAuthentication = passport.authenticate( 'google', { failureRedirect: '/pinterest-app/' } )


const twitterAuthentication = passport.authenticate( ['twitter','google'], { failureRedirect: '/pinterest-app/' } );

const facebookAuthentication = passport.authenticate( 'facebook', { failureRedirect: '/pinterest-app/' } );


router.route( '/' ).get( homeController.home );
router.route( '/dashboard').get( dashboardController.dashboard );
router.route( '/wall' ).get( wallController.redirect );
router.route( '/wall/:id' ).get( wallController.wall );
router.route( '/wall/getwallinfo/:userId' ).get( wallController.getWallInfo );

router.route( '/getauth').get( authController.getAuth );

router.route( '/auth/twitter' ).get( twitterAuthentication, authController.getAuthTwitter );
router.route( '/auth/twitter/callback' ).get( twitterAuthentication, authController.getAuthTwitterCallback );

router.route( '/auth/facebook').get( facebookAuthentication, authController.getAuthFacebook );
router.route( '/auth/facebook/callback' ).get( facebookAuthentication, authController.getAuthFacebookCallback );

router.get( '/auth/google/', googleAuthenticationScope );
router.route( '/auth/google/callback' ).get ( googleAuthentication, authController.getAuthGoogleCallback );

router.route( '/addimagetouser' ).post( imageController.addImage );
router.route( '/removeimagefromuser' ).post( imageController.removeImage );
router.route( '/getrecentimages' ).get( imageController.getRecentImages );


router.route( '/login' ).get( loginController.login );
router.route( '/logout' ).get( logoutController.logout );

module.exports = router;