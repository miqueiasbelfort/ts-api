import { Document } from "mongoose";

// for languages
export interface LanguageI extends Document{
    name: string,
    points_earnedr: number
}

export interface IintroductionQuest extends Document {
    language: string,
    languageId: string,
    question: string,
    tip: string,
    rightAnswer: string,
    controller: number,
    answers: Object[],
}

export interface UserI extends Document{
    fullName: string,
    email: string,
    password: string,
    languages: Object[],
    points: number
}