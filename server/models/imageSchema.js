const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  id:         String,
  imageUrl:   String,
  hearts:     Number,
  tags:       []
});

module.exports = imageSchema;