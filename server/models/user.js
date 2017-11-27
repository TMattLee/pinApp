const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = require( './imageSchema.js' );

const user = new Schema({
  userId:             String,
  imageList:          [ imageSchema ],
  isTwitterVerified:  Boolean,
  twitterToken:       String,
  twitterHandle:      String,
});

var User = mongoose.model( 'pinterestappusers', user );

module.exports = User;