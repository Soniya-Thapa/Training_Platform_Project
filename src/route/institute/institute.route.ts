import express, { Router } from "express"
const router : Router = express.Router() 

import InstituteController from "../../controller/institute/institute.controller"

router.route("/create-institute").post(InstituteController.createInstitute)

export default router