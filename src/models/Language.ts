import { Schema, model, Document } from "mongoose"

// interface of types
import { LanguageI } from "../interfaces/Languages"

const languageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    points_earned: {
        type: Number,
        default: 100,
    }
}, {
    timestamps: true,
})

const Languages = model<LanguageI>('Language', languageSchema)
export default Languages