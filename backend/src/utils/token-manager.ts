import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {COOKIE_NAME} from "./constants"


export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  // console.log(token);
    if(!token || token.trim()===""){
        return res.status(401).json({message:"Token not received"});
    }
    return new Promise((resolve, reject)=>{
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                reject(err);
                return res.status(401).json({message:"Token Expired"});
            }
            else{
                // console.log("Token verified");
                resolve(decoded);
                res.locals.jwtData= decoded;
                return next();
            }
        })
    })
}

