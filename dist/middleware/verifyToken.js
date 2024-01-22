"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//format of token 
//Authorization: Bearer <access_token>
// verify token
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    // Check if bearer is undefined
    if (bearerHeader !== undefined) {
        // split at the space
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        //set the token 
        req.token = bearerToken;
        next();
    }
    else {
        //forbidden
        console.log('test :(');
        res.sendStatus(403);
    }
}
exports.default = verifyToken;
