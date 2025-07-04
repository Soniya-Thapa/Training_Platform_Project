import {Request,Response} from "express"
import User from "../../../database/models/user.model"

// const registerUser = async (req : Request,res : Response)=>{
//   // const username = req.body.username
//   //   const password = req.body.password
//   //   const email = req.body.email
//   const {username, password,email} = req.body
//   if(!username || !password || !email){
//     return res.status(400).json({
//       error : "Please provide username, password, email"
//     })
//   }
//   else{
//     //insert into user table 
//     await User.create({
//       username, password,email
//     })
//   }
//   res.status(200).json({
//     message : "user registered successfully"
//   })
// }


//yedi hami function lai bahira lekhxam tyo function tara class bhitra xa bhani tyo method.
// same bahira xa bhani variable ra class bhitra xa bhani tyo attribute / properties
//hamro backend ma json data sandhai : req.body ma aauxa ra files,vedio,audio,image chahi : req.files

class AuthController {
  //static garexi class lai direct export garexi tyeha bhitra ko method nih export hunxa
  static async registerUser(req : Request,res : Response){
    const {username, password,email} = req.body
  if(!username || !password || !email){
     res.status(400).json({
      error : "Please provide username, password, email"
    })
  }
  else{
    //insert into user table 
    await User.create({
      username, password,email
    })
  }
  res.status(200).json({
    message : "user registered successfully"
  })
  }
}

export default AuthController