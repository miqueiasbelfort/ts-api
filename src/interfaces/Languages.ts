import { Document, Schema } from "mongoose";

type Ivideo_lessons = {
    id: number,
    difficulty: string,
    video: string,
    text: string,
}
type Itext_form = {
    id: number,
    to: string,
    question: string,
    response: string,
    options: Array<string>[]
}

export interface LanguageI extends Document{
    name: string,
    introduction: Array<{
        id: Schema.Types.ObjectId
    }>[],
    video_lessons: Array<Ivideo_lessons>[],
    text_from: Array<Itext_form>[],
    points_earnedr: number
}