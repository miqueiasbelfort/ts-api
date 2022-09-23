import { Request } from "express"

const getToken = (req: Request): any => {
    const authHeader = req.headers.authorization
    let token: any;

    if(authHeader){
        token = authHeader.split(" ")[1]
    }

    return token
}
export default getToken