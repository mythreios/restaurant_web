
/* 
    -------------------------
    PACKAGES
*/

const crypto = require('crypto');


/* 
    -------------------------
    VARIABLES
*/

const UserModel = require('../models/user');
const CartModel = require('../models/cart');

/* 
    -------------------------
    MODULE
*/

module.exports = {

    AuthMiddleware: async (req, res, next) => {
        let token = req.headers["authorization"]?.split(' ')[1].trim();
        if (!token) {
            return res.status(401).json({ message: 'Auth required!' });
        }

        let existingUser = await UserModel.findOne({ token: token })
        if (!existingUser) {
            return res.status(403).json({ message: 'Invalid token!' });
        }

        req.data = existingUser;
        next();
    },

    GenerateIdentityKey: async (timestamp) => {
        const timestampStr = timestamp.toString(18);

        const randomKey = crypto.randomBytes(32).toString('base64').replace(/[+/=]/g, '');
        return timestampStr + "_" + randomKey;
    },

    ChangeAccountToken : async (currentToken) => {
        let account = await UserModel.findOne({ token: currentToken });
        if ( !account ) return false;

        let newToken = await module.exports.GenerateIdentityKey(account.createdTimestamp);

        await UserModel.updateOne({ token: currentToken }, {
            token: newToken
        }, { upsert: false });

        await CartModel.updateOne({ token: currentToken },{
            token: newToken
        }, { upsert: false })

        return newToken;
    }
};