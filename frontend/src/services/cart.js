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

export const getCart = async () => {
    try {

        let userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if ( !userStorage || typeof userStorage != "object" || !userStorage.token ) return {
            message: "InvalidToken"
        };

        let res = await axios.get(`${serverConf.API_URL}/cart/`, {
            headers: {
                Authorization: `Bearer: ${userStorage.token}`
            }
        });

        return res?.data;
        
    } catch ( err ) {
        console.warn(err);
    } 
}

export const addProductToCart = async (_id) => {
    try {

        if ( !_id ) return {
            isSucces: false,
            message: "Missing arg"
        };

        let userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if ( !userStorage || typeof userStorage != "object" || !userStorage.token ) return {
            message: "InvalidToken"
        };

        let addResult = await axios.post(`${serverConf.API_URL}/cart/add`, {
            _id: _id
        }, {
            headers: {
                Authorization: `Bearer: ${userStorage.token}`
            }
        });

        console.log(addResult.data);

        return addResult?.data;
        
    } catch (error) {
        if ( error.response ) {
            console.warn(error.response.data.message);
            return false;
        } 
        
        console.warn(error);
        return false;
    }
}

export const removeProductFromCart = async (_id) => {
    try {

        if ( !_id ) return {
            isSucces: false,
            message: "Missing arg"
        };

        let userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if ( !userStorage || typeof userStorage != "object" || !userStorage.token ) return {
            message: "InvalidToken"
        };

        let addResult = await axios.post(`${serverConf.API_URL}/cart/remove`, {
            _id: _id
        }, {
            headers: {
                Authorization: `Bearer: ${userStorage.token}`
            }
        });

        console.log(addResult.data);

        return addResult?.data;
        
    } catch (error) {
        if ( error.response ) {
            console.warn(error.response.data.message);
            return false;
        } 
        
        console.warn(error);
        return false;
    }
}