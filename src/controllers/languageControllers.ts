import { Request, Response } from "express";
import { Schema } from "mongoose";

//models
import Language from "../models/Language"
import IntroductionQuestion from "../models/IntroductionsQuestion";

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

        const {question, response, tip} = req.body

        const lang = await Language.findById(id)

        if(!lang){
            return res.status(404).json({erro: 'Language not found!'})
        }

        const ques = await IntroductionQuestion.find({})

        const newQuestion = await IntroductionQuestion.create({
            question,
            response,
            tip,
            numController: ques.length + 1
        })

        lang.introduction.push()

    }

    static async addAnswerOptions(req: Request, res: Response): Promise<Response>{   // ADD INTRODUCTIONS ANSWERS

    }
}