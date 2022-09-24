import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"

// app
export const app = express()

// middlewares
app.use(express.json())
app.use(cors())

//connection with database
import './config/conn'

//routes import
import useRoutes from "./routers/userRoutes"
import languageRoutes from "./routers/languageRoutes"

app.use("/api/v1/user", useRoutes)
app.use("/api/v1/lang", languageRoutes)
