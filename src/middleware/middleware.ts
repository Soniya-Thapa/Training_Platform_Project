import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../database/models/user.model";

// interface IExtendedRequest extends Request{
//   user :{
//     name : string
//   }
// }
//  static isLoggedIn (req : IExtendedRequest , res : Response){
//     //check if log in or not so we need token 
//     const token = req.user.name
//  }

class Middleware{
  static isLoggedIn (req : Request , res : Response , next : NextFunction){
    //check if log in or not so we need token 
    const token = req.headers.authorization
    // console.log(token)
    if(!token){
      res.status(401).json({
        error : "please provide token"
      })
      return
    }

    //verify token : ra verify garda hamro decrypt garera result ma pathauxa 
    interface IResult{
      id :string,
      iat : number,
      exp : number
    }
    jwt.verify(token , "thisissecretkey",async (error,result : any)=>{
      if(error){
        res.status(403).json({
          error : "invalid token"
        })
      }else{
        // console.log(result)
        const userData = await User.findAll({
          where :{
            id : result.id
          }
        })
        if(userData.length == 0){
          res.status(404).json({
            message : "No user found"
          })
        }else{
          console.log("sucessfully verified")
        }
      }
    } )
    next() //yo garena bhani route ma yo method paxi arko method thiyo bhani tyo execute hunna 
  }
}

export default Middleware