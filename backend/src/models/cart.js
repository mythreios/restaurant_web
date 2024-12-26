const { Schema, model, models } = require('mongoose')

const data = new Schema({
    
    // Token
    token: String,
    list: {
        type: Array,
        default: []
    }
})

module.exports = models.RestaurantCart || model("RestaurantCart", data);
