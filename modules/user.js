const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    login: {type: String, required: true},
    todos: [{type: Types.ObjectId, ref: 'Dmodels'}]
})

module.exports = model('User', schema)