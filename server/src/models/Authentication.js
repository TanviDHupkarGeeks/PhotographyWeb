const mongoose = require('mongoose');
const { Schema } = mongoose;

const stringRequired = {
    type: String,
    required: true
};

const authenticationSchema = new Schema({
    email: stringRequired,
    password: stringRequired
});

module.exports = mongoose.model('Authentication', authenticationSchema);
