/* 
    -------------------------
    PACKAGES
*/

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser')

/* 
    -------------------------
    CONFIGURATIONS
*/

const mongoDB_Conf = require('./conf/mongodb.json');
const app_Conf = require('./conf/app.json');

/* 
    -------------------------
    VARIABLES
*/

const app = express();
const authRouter = require('./routers/auth');
const cartRouter = require('./routers/cart');
const productRouter = require('./routers/product');

/* 
    -------------------------
    CLASS
*/

class Handler {

    constructor() {

        // Strict Mode
        mongoose.set('strictQuery', mongoDB_Conf.strictQuery);

        // Connection
        mongoose.connect(mongoDB_Conf.connectionUrl).then(() => {
            console.log(`[DB]: OK!`);

            // Start app after mongoose connection
            this.start();
        }).catch((err) => {
            console.log(`[DB]: ${err}`);
        });
    }

    start = function() {

        app.use(body_parser.json());
        app.use(cors());
        app.use(express.static('build'));

        // Routers
        app.use('/api/auth', authRouter);
        app.use('/api/cart', cartRouter);
        app.use('/api/product', productRouter);
        
        // Listener
        app.listen(app_Conf.listeningPort, () => {
            console.log(`[SERVER]: Listening port ${app_Conf.listeningPort}`);
        });
    }
}

module.exports = new Handler();