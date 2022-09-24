import 'dotenv/config'
import * as jwt from "jsonwebtoken"
import { Response } from 'express'

import User from '../models/User'

type TokenPayload = { //Create a Type for get the id of decoded
    id: string,
    iat: number,
    exp: number
}

const getUserByToken = async (token: any, res: Response): Promise<any> => {

    if(!token) {
        return res.status(401).json({message: "Access denied!"})
    }
    
    // get id of jwt headers
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT!)
    const {id} = decoded as TokenPayload
    const user = await User.findById(id).select("-password")

    return user
}

export default getUserByToken