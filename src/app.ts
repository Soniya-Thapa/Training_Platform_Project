import express from "express"
const app = express()

import authRoutes from "./route/globals/auth/auth.route"
import instituteRoutes from "./route/institute/institute.route"
import courseRoutes from "./route/institute/course/course.route"

app.use(express.json()) //done for parsing data

app.use("/auth",authRoutes)
app.use("/institute",instituteRoutes)
app.use("/institute/course",courseRoutes)


export default app