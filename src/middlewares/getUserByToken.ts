import 'dotenv/config'
import * as jwt from "jsonwebtoken"
import { Response } from 'express'

import User from '../models/User'

const getUserByToken = async (token: any, res: Response): Promise<any> => {

    if(!token) {
        return res.status(401).json({message: "Access denied!"})
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT!)

    const user = await User.findById(decoded._id).select("-password")

    return user
}

export default getUserByToken