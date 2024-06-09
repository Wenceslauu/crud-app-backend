const mongoose = require('mongoose')

const User = mongoose.model('users', {
    nome: String,
    email: String,
    senha: String
});

module.exports = User;