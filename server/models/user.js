const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  userId:             String,
  imageList:          [],
  isTwitterVerified:  Boolean,
  twitterToken:       String,
  twitterHandle:      String,
});

var User = mongoose.model( 'pinterestappusers', user );

module.exports = User;