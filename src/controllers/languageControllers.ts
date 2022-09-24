import { Request, Response } from "express";
import Language from "../models/Language"

export default class LanguageController {
    static async create(req: Request, res: Response): Promise<Response>{ //CREATE A NEW LANGUAGE

        const {name} = req.body
        
        const newLanguage = await Language.create({
            name
        })
        if(!newLanguage){
            return res.status(500).json({erro: "Erro on serve"})
        }
        return res.status(201).json(newLanguage)

    }

    static async addIntructions(req: Request, res: Response): Promise<any>{

        const {
            img,
            question,
            response,
            tip
        } = req.body

    }
}