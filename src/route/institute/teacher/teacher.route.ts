import express, { Router } from "express"
const router: Router = express.Router()

import { createTeacher,deleteTeacher,getAllTeachers,getSingleTeacher } from "../../../controller/institute/teacher/teacher.controller"
import Middleware from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/async.Error.Handler"

router.route("/")
.post(
  Middleware.isLoggedIn,
  asyncErrorHandler(createTeacher))
.get(asyncErrorHandler(getAllTeachers))

router.route("/:id")
.get(asyncErrorHandler(deleteTeacher))
.get(
  Middleware.isLoggedIn,
  asyncErrorHandler(getSingleTeacher))

export default router