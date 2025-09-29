import express, { Router } from "express"
const router: Router = express.Router()

import { createCourse, deleteCourse, getAllCourses, getSingleCourse } from "../../../controller/institute/course/course.controller"
import Middleware from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/async.Error.Handler"

router.route("/")
.post(
  Middleware.isLoggedIn,
  asyncErrorHandler(createCourse))
.get(asyncErrorHandler(getAllCourses))

router.route("/:id")
.get(asyncErrorHandler(deleteCourse))
.get(
  Middleware.isLoggedIn,
  asyncErrorHandler(getSingleCourse))

export default router