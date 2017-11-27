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
const passportAuthentication = passport.authenticate( 'twitter', { failureRedirect: '/pinterest-app/login' } );

router.route( '/' ).get( homeController.home );
router.route( '/dashboard').get( dashboardController.dashboard );
router.route( '/wall' ).get( wallController.redirect );
router.route( '/wall/:id' ).get( wallController.wall );
router.route( '/wall/getwallinfo/:userId' ).get( wallController.getWallInfo );

router.route( '/getauth').get( authController.getAuth );
router.route( '/auth/twitter' ).get( passportAuthentication, authController.getAuthTwitter );
router.route( '/auth/twitter/callback' ).get( passportAuthentication, authController.getAuthTwitterCallback );

router.route( '/addimagetouser' ).post( imageController.addImage );
router.route( '/removeimagefromuser' ).post( imageController.removeImage );
router.route( '/getrecentimages' ).get( imageController.getRecentImages );


router.route( '/login' ).get( loginController.login );
router.route( '/logout' ).get( logoutController.logout );

module.exports = router;