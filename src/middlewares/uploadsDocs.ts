import multer from "multer"
import path from "path"
import { v4 as uuidv4 } from 'uuid'

// The file where the images are
const docsStorege = multer.diskStorage({
    destination: function(req, file, cb) {

        let folder: string = ""

        if(req.baseUrl.includes("addintroductions")){
            folder = "Introductions"
        } else if (req.baseUrl.includes("addvideos")){
            folder = "videos"
        }

        cb(null, `uploads/${folder}`) // The path of image

    },
    filename: function (req, file, cb) { // The name of image with framework uuid
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})

export const docsUpload = multer({
    storage: docsStorege
})
