import { Schema, model, Document } from "mongoose"

// type of userSchema
interface UserI extends Document{
    fullName: string,
    email: string,
    password: string,
    languages: Array<{language: string, finalizad: boolean}>[]
    points: number
}

// Scheman 
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        min: 5,
        max: 220
    },
    email: {
        type: String,
        required: true,
        min: 7,
        max: 220
    },
    password: {
        type: String,
        required: true
    },
    languages: {
        type: Array,
        default: []
    },
    points: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
})

const User = model<UserI>('User', userSchema)
export default User