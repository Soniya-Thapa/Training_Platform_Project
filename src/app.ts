import express from "express"
const app = express()
import authRoutes from "./route/globals/auth/auth.route"

app.use(express.json()) //yesko alternative body parser

app.use("/auth",authRoutes)

export default app