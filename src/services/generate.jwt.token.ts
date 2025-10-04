import jwt from "jsonwebtoken"

const generateJwtToken = async(dataToEncrypt :{
  id:string,
  instituteNumber?: string
})=>{
  //@ts-ignore
  const token = jwt.sign( //token generate garney jwt.sign(k lai lukauney,secret key, expiry date)
    { id: dataToEncrypt },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN }) //HS256 algorithm is used here
  return token 
}
export default generateJwtToken