import { Router } from "express";

//controllers
import languageControllers from "../controllers/languageControllers"

//middlewares
import { docsUpload } from "../middlewares/uploadsDocs";

const router = Router()

router.post("/create", languageControllers.create)
router.post("/addintroductions/:id", languageControllers.addIntructions)
router.put("/addanswers/:id", docsUpload.array('docs'), languageControllers.addAnswerOptions)
router.put("/addanswers/text/:id", docsUpload.single('audio'), languageControllers.addAnswerText)

export default router