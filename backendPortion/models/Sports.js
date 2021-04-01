const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sportsModel = new Schema({
    title: {type:String},
    description: {type:String},
    url: {type:String},
    urlToImage: {type:String},
    publishedAt: {type:String},
    insertTime: {type:Number}
})


module.exports = mongoose.model('sportslist', sportsModel)