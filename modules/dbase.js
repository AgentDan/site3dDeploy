const mongoose = require("mongoose")
const {Types} = require("mongoose");
const Schema = mongoose.Schema

const dbaseSchema = new Schema({
    title: { type: String, required: true},
    article: { type: String, required: true},
    authorname: { type: String, required: true},
    articleImage: { type: String, required: false},
    owner: {type: Types.ObjectId, ref: 'User'}
})

const Dmodel = mongoose.model("Dmodel", dbaseSchema)

module.exports = Dmodel