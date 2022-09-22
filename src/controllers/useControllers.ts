import { Request, Response } from "express";

export default class UseController {
    static async information(req: Request, res: Response): Promise<Response>{
       return res.send("Hello World!")
    }
}