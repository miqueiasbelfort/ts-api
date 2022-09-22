import "dotenv/config"
import {connect} from "mongoose"

const conn = async (): Promise<any> => {
    try {
        const dbCon = await connect(process.env.MONGO_URL!)
        console.log('Database is connected!')
        return dbCon
    } catch (error) {
        console.log(error)
    }
}

conn()
export default conn