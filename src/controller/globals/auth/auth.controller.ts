import { Request, Response } from "express"
import User from "../../../database/models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
  static async registerUser(req: Request, res: Response) {
    // console.log(req.body)

    if (req.body == undefined) {
      res.status(400).json({
        error: "No data was sent"
      })
      return
    }
    const { username, password, email } = req.body

    if (!username || !password || !email) {
      res.status(400).json({
        error: "Please provide username, password, email"
      })
      return
    }

    //insert into user table 
    await User.create({
      username, 
      password : bcrypt.hashSync(password , 12), //12  : salt value which determines the strength of password (security) and is indirectly proportional to user experience and directly proportional to time required
      email
    })
    //registration ko case ma status code 201 hunxa 
    res.status(201).json({
      message: "User registered successfully"
    })
  }

  //login
  static async loginUser(req : Request , res : Response){
    const {email , password} = req.body
    //checking whether user entered email and password 
    if(!email || !password){
      res.status(400).json({
        message : "Please provide the required credentials"
      })
      return
    }

    //checking whether the email exists or not 
    const data = await User.findAll({ // kunai pani table bata tannai data nikalda array ma aauxa tara kunai euta matra data xa bhani object ma aauxa 
      where : {
        email
      }
    })
    
    if (data.length == 0){
      res.status(404).json({
        error : "There is no user of particular email"
      })
    }
    else{
      //comparesync(plain password : user ley halney , hash password : db ma store bhako )
      const isPasswordMatch = bcrypt.compareSync(password , data[0].password)
      if(isPasswordMatch){
        //token generate garney 
        const token = jwt.sign({id :data[0].id}, "thisissecretkey" , {expiresIn : "30d"})
        res.status(200).json({
          token,
          message : "logged in "
        })
      }
      else {
        res.status(403).json({
          error : "Invalid email or password "
        })
      }
    }
  }
}

export default AuthController