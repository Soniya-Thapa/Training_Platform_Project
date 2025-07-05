import express, { Router } from "express"
const router : Router = express.Router() 

import Middleware from "../../middleware/middleware"
import { createInstitute } from "../../controller/institute/institute.controller"


router.route("/create-institute").post(Middleware.isLoggedIn, createInstitute)

export default router