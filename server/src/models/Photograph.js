const mongoose = require('mongoose');
const { Schema } = mongoose;

const stringRequired = {
    type: String,
    required: true
};

const photographSchema = new Schema({
  title: String,
  description: String,
  category: stringRequired,
  image_uri: stringRequired,
  taken_at: Date
}, { timestamps: true });

module.exports = mongoose.model('Photographs', photographSchema);
