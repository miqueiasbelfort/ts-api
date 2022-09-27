import { Schema, model, Document, ObjectId } from "mongoose"

interface Iquestion {
    _id: ObjectId,
    question: string,
    response: string,
    tip?: string,
    answer_questions: Array<{
        img: string,
        text: string,
        audio?: string,
    }>[],
    numController: number,
    questionId: string
}

const introductionsSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
    tip: String,
    answer_questions: {
        type: Array,
        default: []
    },
    numController: {
        type: Number,
        required: true
    },
    questionId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const IntroductionQuestion = model<Iquestion>('IntroductionQuestion', introductionsSchema)

export default IntroductionQuestion 
