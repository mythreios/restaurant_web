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

export const checkAuth = async () => {
    try {
        const token = localStorage.getItem('token')
        if (!token) {
            return console.warn('Token bulunamadı.');
        }

        const response = await axios.get(`${serverConf.API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if ( error.response ) {
            console.warn(error.response.data.message);
            return false;
        } 
        
        console.warn(error);
        return false;
    }
}

export const login = async (email, password) => {
    try {
        let res = await axios.post(`${serverConf.API_URL}/auth/login`, {
            email: email,
            password: password
        });

        console.log(res.data);

        return res.data;
    } catch ( err ) {
        throw new Error(err.response?.data?.message || 'Giriş başarısız.');
    } 
}

export const register = async (name, email, password) => {
    try {
        let res = await axios.post(`${serverConf.API_URL}/auth/register`, {
            email: email,
            password: password,
            username: name
        });
        
        console.log(res.data);
        return res.data;
    } catch ( err ) {
        throw new Error(err.response?.data?.message || 'Giriş başarısız.');
    } 
}

export const logout = async () => {
    try {

        let userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if ( !userStorage || typeof userStorage != "object" || !userStorage.token ) return {
            message: "InvalidToken"
        };

        let res = await axios.post(`${serverConf.API_URL}/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer: ${userStorage.token}`
            }
        });

        return res
    } catch ( err ) {
        console.warn(err);
    }
}