const { Schema, model, models } = require('mongoose')

const data = new Schema({
    
    name: String,
    category: String,
    subcategory: String,
    imageUrl: String,
    price: Number,
    description: {
        type: String,
        default: ""
    }
    
})

module.exports = models.RestaurantProduct || model("RestaurantProduct", data);
