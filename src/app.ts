import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"

// app
export const app = express()

// middlewares
app.use(express.json())
app.use(cors())

//routes import
import useRoutes from "./routers/userRoutes"

app.use("/api/v1/user", useRoutes)
