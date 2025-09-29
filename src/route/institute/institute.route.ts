import express, { Router } from "express"
const router : Router = express.Router() 

import Middleware from "../../middleware/middleware"
import { createCourseTable, createInstitute, createStudentTable, createTeacherTable } from "../../controller/institute/institute.controller"
import asyncErrorHandler from "../../services/async.Error.Handler"

//if we dont wrap the controller function then it will go in crash mode and in this mode, if there are 100users using this project then all the 100 users will be unable to run the project 
router.route("/create-institute").post(
  asyncErrorHandler(Middleware.isLoggedIn),
  asyncErrorHandler(createInstitute),
  asyncErrorHandler(createTeacherTable),
  asyncErrorHandler(createStudentTable),
  asyncErrorHandler(createCourseTable))

export default router