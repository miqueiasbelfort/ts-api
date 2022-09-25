import { Request, Response } from "express";
import Language from "../models/Language"

type IObject = {
    id: number,
    question: string,
    response: string,
    tip: string,
    answer_options: Array<any>[]
}

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

    static async addIntructions(req: Request, res: Response): Promise<Response>{ //ADD INTRODUCTIONS QUESTIONS

        const {id} = req.params
        
        const {
            question,
            response,
            tip
        } = req.body

        const language = await Language.findById(id)

        if(!language){
            return res.status(404).json({erro: "Language not found"})
        }

        try {
            
            const object: any = {
                id: language.introduction.length + 1,
                question,
                response,
                tip,
                answer_options: []
            }

            await language.introduction.push(object)

            language.save()

        } catch (error) {
            return res.status(500).json({erro: error})
        }

        return res.status(200).json('Sucessfuly')

    }

    static async addAnswerOptions(req: Request, res: Response): Promise<Response>{   // ADD INTRODUCTIONS ANSWERS

        const {id, idquestion} = req.params
        const {text} = req.body
        
        const language = await Language.findById(id)

        if(!language){
            return res.status(404).json({erro: "Language not found"})
        }
        
       const files = req.files as Express.Multer.File[]

        return res.status(200).json({files})

    }
}