/* 
    -------------------------
    PACKAGES
*/

const mongoose = require('mongoose');
const express = require('express');
const crypto = require('crypto');

/* 
    -------------------------
    MODELS
*/

const UserModel = require('../models/user');
const ProductModel = require('../models/product');
const CartModel = require('../models/cart');

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

router.get('/', sharedFunctions.AuthMiddleware, async ( req, res ) => {
    let userCart = await CartModel.findOne({ token: req.data.token });
    return res.status(200).json({ message: "Sucess", list: userCart ? userCart.list : [] });
})

router.post('/add', sharedFunctions.AuthMiddleware, async ( req, res ) => {
    let { _id } = req.body;
    if ( !_id ) {
        return res.status(401).json({ message: "Product name is required" });
    }

    let productInfo = await ProductModel.findOne({ _id: _id });
    if ( !productInfo ) {
        return res.status(401).json({ message: "Product is invalid" })
    }

    console.log(req.data);
    let myCart = await CartModel.findOne({ token: req.data.token });

    // Cart Is Not Exists
    if ( !myCart ) {

        await CartModel.insertMany({
            token: req.data.token,
            list: [ productInfo ]
        });

        return res.status(200).json({ message: "Product added to cart!", currentProductList: [ productInfo ] });
    }

    // Cart Is Exists
    myCart.list.push(productInfo);
    await CartModel.updateOne({ token: req.data.token }, {
        list: myCart.list
    }, { upsert: false });

    res.status(200).json({ message: "Product added to cart!", currentProductList: myCart.list });
});

router.post('/remove', sharedFunctions.AuthMiddleware, async ( req, res ) => {
    let { _id } = req.body;
    if ( !_id ) {
        return res.status(401).json({ message: "Product name is required" });
    }

    let myCart = await CartModel.findOne({ token: req.data.token });
    if ( !myCart ) {
        return res.status(402).json({ message: "Cart is invalid" });
    }

    let productIndex = myCart.list.findIndex(a => a._id == _id);
    if ( productIndex != -1 ) {
        myCart.list.splice(productIndex, 1)

        await CartModel.updateOne({ token: req.data.token }, { 
            list: myCart.list
        }, { upsert: false });

        return res.status(200).json({ message: "Product removed from cart!", currentProductList: myCart.list, success: true });
    }

    res.status(200).json({ message: "Product can not removed from cart", currentProductList: myCart.list, success: false });

});

module.exports = router;