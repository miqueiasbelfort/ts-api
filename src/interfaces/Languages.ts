import { Document } from "mongoose";

export interface LanguageI extends Document{
    name: string,
    points_earnedr: number
}