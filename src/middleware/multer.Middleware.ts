//multer configuration 
import multer from "multer";
import { Request } from "express";

//multer bhaneko object ho tyesma euta disc storage bhanney method hunxa jasley file/folder haru kaha rakhney ani k naam ma rakhney bhanney determine garxa 
/*
  hello.pdf-->multer-->location(storage)-->hello-20820710.pdf(rename)
*/

//local file storage:
const storage = multer.diskStorage({
  //location: incoming file kaha rakhney ho (i.e., cloud yaa local)
  //cb : callback, file: incoming file 
  //cb(error, success):  cb(null, '../storage') means error aauda null(kehi nagarney) ani success huda storage folder ma rakhney
  destination: function(req:Request, file:Express.Multer.File,cb:any){
    cb(null, '../storage')
  },
  //mathi ko location deko ma rakhey paxi , k naam ma rakhney
  filename: function(req:Request, file:Express.Multer.File,cb:any){
    //cb(error, success):  cb(null, '../storage') means error aauda null(kehi nagarney) ani success huda storage folder ma bhako file ko rename garney
    cb(null, 'soniya.png')
    //alternate: if we dont want to rename the file name then 
    // cb(null, file.originalname + '-' + Date.now())
  }
})

export{
  storage,
  multer
}