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

router.get('/me', async ( req, res ) => {
    let token = req.headers["authorization"]?.split(" ")[1].trim();
    if ( token ) {
        let account = await UserModel.findOne({ token: token });
        if ( account ) {
            return res.status(200).json({ message: "Success", data: account });
        }

        return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(401).json({ message: "Invalid token" });
})

router.post("/register", async ( req, res ) => {
    let { username, password, email } = req.body;
    if ( !username || !password || !email ) {
        return res.status(400).json({ message: "Missing data!" });
    }

    let existingUser = await UserModel.findOne({ 
        $or: [
            { username: username },
            { email: email }
        ] 
    });

    console.log(username, password, email);
    
    if ( existingUser && existingUser.email == email.trim() ) {
        return res.status(203).json({ message: "Email already exists", isRegistered: false });
    }

    let timestamp = Date.now()
    let token = await sharedFunctions.GenerateIdentityKey(timestamp);

    await UserModel.insertMany({
        username: username.trim(),
        password: password.trim(),
        email: email.trim(),
        token: token,
        createdTimestamp: timestamp
    });

    res.status(200).json({ message: "Success", token: token });
});

router.post('/login', async ( req, res ) => {
    let { email, password } = req.body;
    if ( !email || !password ) {
        return res.status(400).json({ message: "Missing data!" });
    }

    let existingUser = await UserModel.findOne({ email: email.trim(), password: password.trim() });
    if ( !existingUser ) {
        return res.status(202).json({ message: "User not found!" });
    }

    let newToken = await sharedFunctions.ChangeAccountToken(existingUser.token);
    console.log(newToken);

    let userAccount = await UserModel.findOne({ token: newToken });
    res.status(200).json({ message: "Success", data: userAccount });
});

router.post('/logout', async ( req, res ) => {

    let token = req.headers["authorization"]?.split(" ")[1].trim();
    if ( token ) {

        let existingUser = await UserModel.findOne({ token: token });
        if ( existingUser ) {

            await sharedFunctions.ChangeAccountToken(existingUser.token);
            return res.status(200).json({ message: "Success", logoutRes: true });
        }
    }

    res.status(200).json({ message: "Success", logoutRes: false });
});

module.exports = router;