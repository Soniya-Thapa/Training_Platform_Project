import express, { Router } from "express"
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
const upload = multer({storage: storage})

//routes :
router.route("/")
.post(
  Middleware.isLoggedIn,
  //if we are handling only one file then use upload.single(fieldname) and yo middleware main function ko just before ma place garney 
  //fieldname bhaneko FE/postman bata file kun name ma aaeraxa 
  // if the files are multiple then use array :upload.array("") 
  upload.single('courseThumbnail'),
  asyncErrorHandler(createCourse))
.get(asyncErrorHandler(getAllCourses))

router.route("/:id")
.get(asyncErrorHandler(deleteCourse))
.get(
  Middleware.isLoggedIn,
  asyncErrorHandler(getSingleCourse))

export default router