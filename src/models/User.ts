import { Schema, model } from "mongoose"

// type of userSchema
import {UserI} from "../interfaces/models"

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