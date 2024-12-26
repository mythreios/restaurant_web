const { Schema, model, models } = require('mongoose')

const data = new Schema({
    
    // Token
    createdTimestamp: Number,
    token: String,

    // Data
    username: String,
    password: String,
    email: String,
})

module.exports = models.RestaurantUser || model("RestaurantUser", data);
