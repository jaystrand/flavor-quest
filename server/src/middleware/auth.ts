import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

interface JwtPayload {
  user_id: number;
  username: string;
}
 // Get the secret key from the environment variables
 const secretKey = process.env.JWT_SECRET_KEY||' ';
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

 // Get the authorization header from the request
 const authHeader = req.headers.authorization;
  // Check if the authorization header is present
 if(authHeader){
   // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];
  
   // Verify the JWT token
  jwt.verify(token,secretKey,(err,user)=>{
    if(err){
      console.log('Token verification error:', err);
      return res.sendStatus(403); // forbidden -> token invalid
    }
    // Attach the user information to the request object
    req.user = user as JwtPayload;
    console.log('Decoded JWT payload:', user);

    // req.user = user as { user_id: number; username: string };

    // console.log("auth -> ",user)
     
    return next();
  });
  
    }else{
      res.sendStatus(401); // unauth status -> no authHeader
    }
};
