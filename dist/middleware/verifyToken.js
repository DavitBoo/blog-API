"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//format of token
//Authorization: Bearer <access_token>
// verify token
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader);
    // Check if bearer is undefined
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        if (!bearerToken) {
            return res.status(403).send({ error: "Token not provided" });
        }
        req.token = bearerToken;
        next();
    }
    else {
        return res.status(403).send({ error: "Forbidden" });
    }
}
exports.default = verifyToken;
