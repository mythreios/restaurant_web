/* 
    -------------------------
    PACKAGES
*/

import axios from 'axios';

/* 
    -------------------------
    VARIABLES
*/

import serverConf from '../config/server.json'

/* 
    -------------------------
    METHODS
*/

export const getProducts = async () => {
    try {

        let res = await axios.get(`${serverConf.API_URL}/product/`);

        let currentList = {}
        res.data.list.map((product) => {
            if ( !currentList[product.category] )
                currentList[product.category] = {};

            if ( !currentList[product.category][product.subcategory] )
                currentList[product.category][product.subcategory] = [];

            currentList[product.category][product.subcategory].push(product)
        }, {})

        console.log(currentList);

        return currentList;

    } catch ( err ) {
        console.warn(err);
    }
}

export const addNewProduct = async (category, subcategory, name, description, price, imageUrl) => {

    if ( !category || !subcategory || !name || !description || !price || !imageUrl ) return {
        isSuccess: false,
        message: "Missing args!"
    }

    try {

        let res = await axios.post(`${serverConf.API_URL}/product/add`, {
            category: category,
            subcategory, subcategory, 
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl
        });

        return res?.data;
    } catch ( err ) {
        console.warn(err);
    }
}

export const removeProduct = async (_id) => {
    try {
        let res = await axios.post(`${serverConf.API_URL}/product/remove`, {
            _id: _id
        });

        return res?.data;
    } catch ( err ) {
        console.warn(err);
    }
}


/*

    let userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    if ( !userStorage || typeof userStorage != "object" || !userStorage.token) return {
        isSuccess: false,
        message: "Invalid token"
    }

*/