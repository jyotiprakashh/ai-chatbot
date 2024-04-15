import {body, ValidationChain, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";


const validate= (validations: ValidationChain[])=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        for(let validation of validations){
            const result= await validation.run(req);
            if(!result.isEmpty()) break;
        }
        const errors= validationResult(req);
        if(errors.isEmpty()) return next();
        return res.status(422).json({message:"Error", cause:errors.array()[0].msg});}
};

const loginValidator= [
    body("email").trim().isEmail().withMessage("email is invalid"),
    body("password").trim().isLength({min: 6}).withMessage("password must be at least 6 characters")];

const signupValidator= [
    body("name").notEmpty().withMessage("name is required"),
    ...loginValidator];



const chatCompletionValidator= [
    body("message").notEmpty().withMessage("message is required"),
    ...loginValidator];


export {validate, signupValidator, loginValidator, chatCompletionValidator};
