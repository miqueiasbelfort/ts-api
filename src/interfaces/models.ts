import { Document } from "mongoose";

// for languages
export interface LanguageI extends Document{
    name: string,
    points_earnedr: number
}

// for question in introduction
interface answers {
    img?: string,
    text?: string | any ,
    audio?: string,
}

export interface IintroductionQuest extends Document {
    language: string,
    languageId: string,
    question: string,
    tip: string,
    rightAnswer: string,
    controller: number,
    answers: Array<answers>[],
}   