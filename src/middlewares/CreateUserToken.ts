import { Request, Response } from 'express'
import 'dotenv/config'
import * as jwt from 'jsonwebtoken'

interface UserI {
    _id?: string,
    fullName: string,
    email: string,
    password: string,
    languages?: Array<{language?: string, finalizade?: boolean}>[],
    points?: number,
    __v?: number,
    createdAt?: string,
    updatedAt?: string,
}

const createUserToken = async (user: UserI, req: Request, res: Response): Promise<Response> => {

    const token = jwt.sign({
        id: user?._id
    }, process.env.SECRET_KEY_JWT!)

    return res.status(200).json({
        message: "You are authenticated",
        token: token,
    })

}

export default createUserToken