import { Schema, model, Document, ObjectId } from "mongoose"

// interface
import { IintroductionQuest } from "../interfaces/models"

const introductionsSchema = new Schema({
    language: {
        type: String,
        required: true
    },
    languageId: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    tip:{
        type: String,
    },
    rightAnswer: {
        type: String,
        required: true,
    },
    controller: {
        type: Number,
        required: true
    },
    answers: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

const IntroductionQuestion = model<IintroductionQuest>('IntroductionQuestion', introductionsSchema)

export default IntroductionQuestion 
