const mongoose = require('mongoose');
const { Schema } = mongoose;

const stringRequired = {
    type: String,
    required: true
};

const profileSchema = new Schema({
    name: stringRequired,
    bio: stringRequired,
    email: stringRequired,
    photo_uri: String,
    twitter: String,
    facebook: String,
    instagram: String,
});

module.exports = mongoose.model('Profile', profileSchema);
