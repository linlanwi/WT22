const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

module.exports = mongoose.model('ToDo', schema);