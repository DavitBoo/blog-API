import express, { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
    token: string | JwtPayload;
   }

//format of token 
//Authorization: Bearer <access_token>

// verify token
function verifyToken(req: Request, res: Response, next: NextFunction){
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
  
    // Check if bearer is undefined
    if(bearerHeader !== undefined){
      // split at the space
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      //set the token 
      (req as CustomRequest).token = bearerToken;
      
      next();
  
    }else {
      //forbidden
      console.log('test :(');
      res.sendStatus(403)
    }
  }

  export default verifyToken