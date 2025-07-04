import express from "express"
const app = express()
import authRoutes from "./route/globals/auth/auth.route"

app.use(express.json())
app.use("/auth",authRoutes)

export default app