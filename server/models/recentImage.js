const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recentImage = new Schema({
  userId:           String,
  userDisplayName:  String,
  imageUrl:         String,
  imageId:          String,
  date:             Date,
});

var RecentImage = mongoose.model( 'pinterestapprecent', recentImage );

module.exports = RecentImage;