import { Request, Response } from "express";
import * as yup from "yup"
import * as bcrypt from "bcrypt"

export default class UseController {
    static async create(req: Request, res: Response): Promise<Response>{

        const {
            fullName,
            email,
            password,
            confirPassword
        } = req.body

        // Verifications
        const schema = yup.object().shape({
            fullName: yup.string().max(220).required(),
            email: yup.string().email().required().max(220).min(10),
            password: yup.string().required().min(6),
            confirPassword: yup.string().required().min(6)
        })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: "Error on validate schema"
            })
        } else if(confirPassword !== password){
            return res.status(422).json({erro: "The passwords is not iquals"})
        }

        // Create the criptografy of password
        const salt: string = await bcrypt.genSalt(12)
        const passwordHash: string = await bcrypt.hash(password, salt)

        if(!passwordHash){
            return res.status(500).json({erro: "Erro on server!"})
        }

       return res.status(200).json({fullName, email, passwordHash})
    }
}