// model
import User from "../models/User"
import Language from "../models/Language"

import { Request, Response } from "express";
import * as yup from "yup"
import * as bcrypt from "bcrypt"

//midllewares
import createUserToken from "../middlewares/CreateUserToken";
import getToken from "../middlewares/getToken";
import getUserByToken from "../middlewares/getUserByToken";

export default class UseController {
    static async create(req: Request, res: Response): Promise<any>{ //CREATE A USER

        const {
            fullName,
            email,
            password,
            confirPassword
        } = req.body

        const user = await User.findOne({email: email})

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

        // check if user exist
        if(user){
            return res.status(422).json({erro: 'User already exists'})
        }

        // Create the criptografy of password
        const salt: string = await bcrypt.genSalt(12)
        const passwordHash: string = await bcrypt.hash(password, salt)

        if(!passwordHash){
            return res.status(500).json({erro: "Erro on server!"})
        }

       const newUser = await User.create({
        fullName,
        email,
        password: passwordHash
       })

       if(!newUser){
        return res.status(500).json('Erro on server!')
       }

       await createUserToken(newUser, req, res)

    }

    static async login(req: Request, res: Response):  Promise<any>{ //LOGIN A USER

        const {
            email,
            password
        } = req.body

        const schema = yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(6)
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: "Error on validate schema"
            })
        } 

        // check if User does not exist
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(422).json({erro: 'User does not exist'})
        }

        // check the user password is equals the password 
        const checkThePassword = await bcrypt.compare(password, user.password)

        if(!checkThePassword){
            return res.status(422).json({erro: 'Password is wrong!'})
        }

        await createUserToken(user, req, res)

    }

    static async getUser(req: Request, res: Response): Promise<Response> {

        // get user by token
        const token = getToken(req)
        const user = await getUserByToken(token, res)

        if(!user){
            return res.status(404).json({
                error: "User is not found"
            })
        }

        return res.status(200).json(user)

    }

    static async addLanguage(req: Request, res: Response): Promise<Response>{ //Add language
        
        const {id} = req.params

        // get user by token
        const token = getToken(req)
        const user = await getUserByToken(token, res)

        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }

        // get language
        const lang = await Language.findById(id)

        if(!lang){
            return res.status(404).json({
                error: 'Language not found'
            })
        }

        const myNewLang = {
            languageNome: lang?.name,
            languageId: lang?._id,
            finalizad: false
        }

        try {
            
            user.languages.push(myNewLang)
            user.save()

        } catch (error) {
            return res.status(500).json({error})
        }

        return res.status(200).json(user)

    }
}