import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../database/models/user.model";
import IExtendedRequest from "../globals/indes";

// interface IExtendedRequest extends Request{
//   user :{
//     name : string
//   }
// }
//  static isLoggedIn (req : IExtendedRequest , res : Response){
//     //check if log in or not so we need token 
//     const token = req.user.name
//  }

// interface IResult {
//   id: string,
//   iat: number,
//   exp: number
// }

//Request ma bhako sabai tanera IExtentedRequest ma rakheko 
// interface IExtendedRequest extends Request {
//   user?: {
//     email: string,
//     role : string,
//     username : string |null
//   }
// }

class Middleware {
  static isLoggedIn(req: IExtendedRequest, res: Response, next: NextFunction) {
    //check if log in or not so we need token 
    //header ma authorization name ko key banako xa 
    const token = req.headers.authorization
    // console.log(token)
    if (!token) {
      res.status(401).json({
        error: "please provide token"
      })
      return
    }

    //verify token : ra verify garda hamro decrypt garera result ma pathauxa 
    //jwt.verify(token, secretkey, callback function)
    jwt.verify(token, "thisissecretkey", async (error, result: any) => { //result ma : j lukako tyo ani iat,exp return garxa
      if (error) {
        res.status(403).json({
          error: "invalid token"
        })
      } else {
        // console.log(result)
        // const userData = await User.findAll({ //array retuun garxa
        //   where: {
        //     id: result.id
        //   }
        // })
        // if (userData.length == 0) {
        //   res.status(404).json({
        //     message: "No user found with that id"
        //   })
        //   return
        // }

        //alternate:
        const userData = await User.findByPk(result.id) //object return garxa
        if (!userData) {
          res.status(404).json({
            message: "No user found with that id"
          })
          return
        }
        console.log("sucessfully verified")
        req.user = userData
        next() //yo garena bhani route ma yo method paxi arko method thiyo bhani tyo execute hunna 

      }
    })
  }
}

export default Middleware