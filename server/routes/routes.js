const express = require( 'express' );
const router = express.Router();
const passport = require( '../lib/passport.js');

const homeController = require( '../controllers/home.controller.js' );
const dashboardController = require( '../controllers/dashboard.controller.js' );
const wallController = require('../controllers/wall.controller.js' );
const authController = require( '../controllers/auth.controller.js' );
const loginController = require( '../controllers/login.controller.js' );
const logoutController = require( '../controllers/logout.controller.js' );

const passportAuthenticate= passport.authenticate( 'twitter', { failureRedirect: '/pinterest-app/login' });

router.route( '/' ).get( homeController.home );
router.route( '/dashboard').get( dashboardController.dashboard );
router.route( '/wall/:id' ).get( wallController.wall );

router.route( '/auth').get( passportAuthenticate , authController.getAuth );
router.route( '/auth/twitter' ).get( passportAuthenticate, authController.getAuthTwitter );
router.route( '/auth/twitter/callback' ).get( passportAuthenticate, authController.getAuthTwitterCallback );


router.route( '/login' ).get( loginController.login );
router.route( '/logout' ).get( logoutController.logout );

module.exports = router;