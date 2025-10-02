import express, { Request, Router } from "express"
const router: Router = express.Router()

import { createCourse, deleteCourse, getAllCourses, getSingleCourse } from "../../../controller/institute/course/course.controller"
import Middleware from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/async.Error.Handler"

//multer :
// import { storage,multer } from "../../../middleware/multer.Middleware"
// const upload = multer({storage: storage})

//cloudinary : 
import { multer } from "../../../middleware/multer.Middleware"
import { cloudinary, storage } from "../../../services/cloudinary.Config"
const upload = multer({
  storage: storage,
  //doing validation for image files
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']
    //A mimetype (also called media type or content type) is a string that tells a program what kind of data a file contains.
    //     Examples:
    // File type	Mimetype
    // JPEG image	image/jpeg
    // PNG image	image/png
    // PDF document	application/pdf
    // Plain text	text/plain
    // JSON data	application/json
    // MP4 video	video/mp4
    if (allowedFileTypes.includes(file.mimetype)) {
      //cb(error,success): 2 argument
      cb(null, true)
    }
    else {
      //cb(error): 1 argument
      cb(new Error("The file you provided is in unsupported format."))
    }
  },
  limits:{
    fileSize: 4*1024*1024 //4mb
  }
})

//routes :
router.route("/")
  .post(
    Middleware.isLoggedIn,
    //if we are handling only one file then use upload.single(fieldname) and yo middleware main function ko just before ma place garney 
    //fieldname bhaneko FE/postman bata file kun name ma aaeraxa 
    // if the files are multiple then use array :upload.array("") 
    upload.single('courseThumbnail'),
    asyncErrorHandler(createCourse))
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(getAllCourses))

router.route("/:id")
  .get(asyncErrorHandler(deleteCourse))
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(getSingleCourse))

export default router