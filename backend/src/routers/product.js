/* 
    -------------------------
    PACKAGES
*/

const express = require('express');

/* 
    -------------------------
    MODELS
*/

const ProductModel = require('../models/product');

/* 
    -------------------------
    VARIABLES
*/

const router = express.Router();
const sharedFunctions = require('../shared/functions')

/* 
    -------------------------
    FUNCTIONS
*/

/* 
    -------------------------
    PROCESS
*/

router.get('/', async ( req, res ) => {
    let products = await ProductModel.find({});
    res.status(200).json({ list: products });
})

router.post('/add', async ( req, res ) => {
    let { category, subcategory, name, description, price, imageUrl } = req.body;
    if ( !name || !category || !subcategory || !imageUrl || !description || !price ) {
        return res.status(401).json({ message: "Missing data!" });
    }

    await ProductModel.insertMany({
        name: name,
        category: category,
        subcategory: subcategory,
        imageUrl: imageUrl,
        description: description,
        price: price
    }).then((data) => {

        // Process data
        data = data[0]
        data._id.toString();

        return res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(401).json({ message: `Insert process got error`, errorMessage: err });
    });
    
});

router.post('/remove', async ( req, res ) => {
    let { _id } = req.body;
    if ( !_id ) {
        return res.status(401).json({ message: "Missing data!" });
    }

    let query = await ProductModel.deleteOne({ _id: _id });
    if ( query.deletedCount > 0 ) {

        let data = await ProductModel.find();
        return res.status(200).json({ message: "Success", isDeleted: true });
    }

    return res.status(200).json({ message: "Success", isDeleted: false });
});


let a = {
    category: "Su & İçecek",
    subcategory: "Enerji İçeceği",
    name: "Black Bruin Şekersiz",
    description: "250ml",
    price: 33.30,
    imageUrl: "https://market-product-images-cdn.getirapi.com/product/2c4c363b-02b4-4196-815c-d4f50a67e10e.jpg"
}

module.exports = router;