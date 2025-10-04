import express, { Request, Router } from "express"
const router:Router = express.Router()

import { createTeacher,deleteTeacher,getAllTeachers,getSingleTeacher } from "../../controller/teacher/teacher.controller"
import Middleware from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/async.Error.Handler"
import upload from "../../../middleware/multer.upload"


router.route("/")
.post(
  // upload.single('teacherPhoto'),
  asyncErrorHandler(createTeacher))
.get(asyncErrorHandler(getAllTeachers))

router.route("/:id")
.delete(asyncErrorHandler(deleteTeacher))
.get(
  Middleware.isLoggedIn,
  asyncErrorHandler(getSingleTeacher))

export default router