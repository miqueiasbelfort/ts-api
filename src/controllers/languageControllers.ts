import { Request, Response, Express } from "express";

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

        const {question, rightAnswer, tip, type} = req.body

        const lang = await Language.findById(id) //get language

        if(!lang){
            return res.status(404).json({erro: 'Language not found!'})
        }

        const query = await IntroductionQuestion.find({languageId: lang?._id}) // get all data of the language

        const newQuestion = await IntroductionQuestion.create({
            question,
            rightAnswer,
            tip,
            controller: query.length + 1,
            language: lang?.name,
            languageId: lang?._id,
            type
        }) // create a new data itroduction

        if(!newQuestion){
            return res.status(500).json({erro: "Erro on server!"})
        }

        return res.status(201).json(newQuestion)

    }

    static async addAnswerOptions(req: Request, res: Response): Promise<Response>{   // ADD INTRODUCTIONS ANSWERS OPTIONS

        const {id} = req.params

        const {text} = req.body
        
        const queryQuestion = await IntroductionQuestion.findById(id)

        if(!queryQuestion){
            return res.status(404).json({erro: 'Question not found!'})
        }

        const files = req.files as Express.Multer.File[]

        const newAnswer = {
            img: files[0].filename || '',
            text,
            audio: files[1].filename || ''
        }

        try {
            queryQuestion.answers.push(newAnswer)
            queryQuestion.save()
        } catch (error) {
            return res.status(500).json({erro: error})
        }

        return res.status(200).json(queryQuestion)

    }

    static async addAnswerText(req: Request, res: Response): Promise<Response>{ // ADD INTRODUCTIONS ANSWERS TEXT

        const {id} = req.params
        const {text} = req.body

        const queryQuestion = await IntroductionQuestion.findById(id)

        if(!queryQuestion){
            return res.status(404).json({erro: 'Question not found!'})
        }

        const file = req.file as Express.Multer.File

        const newAnswer = {
            text,
            auido: file.filename
        }

        try {
            
            queryQuestion.answers.push(newAnswer)
            queryQuestion.save()

        } catch (error) {
            return res.status(500).json({erro: error})
        }

        return res.status(200).json(queryQuestion)

    }
}