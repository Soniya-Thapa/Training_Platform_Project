import express from "express"
const app = express()

import authRoutes from "./route/globals/auth/auth.route"
import instituteRoutes from "./route/institute/institute.route"
app.use(express.json()) 

app.use("/auth",authRoutes)
app.use("/institute",instituteRoutes)

export default app