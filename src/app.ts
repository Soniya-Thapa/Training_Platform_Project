import express from "express"
const app = express()

import authRoutes from "./route/globals/auth/auth.route"
import instituteRoutes from "./route/institute/institute.route"
import courseRoutes from "./route/institute/course/course.route"
import studentRoutes from "./route/institute/student/student.route"
import teacherRoutes from "./route/institute/teacher/teacher.route"
import categoryRoutes from "./route/institute/category/category.route"

app.use(express.json()) //done for parsing data

app.use("/auth",authRoutes)
app.use("/institute",instituteRoutes)
app.use("/institute/course",courseRoutes)
app.use("/institute/student",studentRoutes)
app.use("/institute/teacher",teacherRoutes)
app.use("/institute/category",categoryRoutes)

export default app