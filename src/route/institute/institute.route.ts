import express, { Router } from "express"
const router : Router = express.Router() 

import InstituteController from "../../controller/institute/institute.controller"
import Middleware from "../../middleware/middleware"


router.route("/create-institute").post(Middleware.isLoggedIn, InstituteController.createInstitute)

export default router