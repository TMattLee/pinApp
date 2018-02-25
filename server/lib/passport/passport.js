/*------------------------------------------------------------------------------
----------------------------------- Passport ----------------------------------
------------------------------------------------------------------------------*/


const passport = require( "passport" );
const TwitterStrategy = require( 'passport-twitter' ).Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require( '../../models/user.js' );


// ------------------------ Twitter Strategy -----------------------------

const twitterLogin = new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "https://www.tmattlee.com/pinterest-app/auth/twitter/callback"
  },
  ( token, tokenSecret, profile, done ) => {
    User.findOne(
      { 
        userId: profile.id 
      },
      ( err, user ) => {
        
        if ( !user ){
          let newUser = new User();
          newUser.userId = profile.id;
          newUser.imageList = [];
          newUser.isTwitterVerified = true;
          newUser.twitterToken =  token;
          newUser.twitterHandle = profile.username;
          newUser.save( ( error ) => {
            if ( error ) console.log( error );
            return done( err, newUser );
          });
        }
        else{
          return done( err, user );
        }
    });
  }
);

const googleLogin = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://www.tmattlee.com/pinterest-app/auth/google/callback"
  },
  ( accessToken, refreshToken, profile, done ) => {
    User.findOne(
      { 
        userId: profile.id 
      },
      ( err, user ) => {
        
        if ( !user ){
          let newUser = new User();
          newUser.userId = profile.id;
          newUser.imageList = [];
          newUser.isTwitterVerified = null;
          newUser.twitterToken =  '';
          newUser.twitterHandle = profile.id = '115859196607475202473' ? 'tmattlee' : profile.displayName;
          newUser.save( ( error ) => {
            if ( error ) console.log( error );
            return done( err, newUser );
          });
        }
        else{
          return done( err, user );
        }
    });
  }
);


passport.use( twitterLogin );
passport.use( googleLogin );

passport.serializeUser( ( user, done ) => {
  done(null, user);
});

passport.deserializeUser( ( user, done ) => {
  done(null, user);
});

module.exports = passport;