import { Router } from "express";

//controllers
import languageControllers from "../controllers/languageControllers"

//middlewares
import { docsUpload } from "../middlewares/uploadsDocs";

const router = Router()

router.post("/create", languageControllers.create)
router.put("/addintroductions/:id", languageControllers.addIntructions)
router.put("/addintroductions/:id/:idquestion", docsUpload.array('docs'), languageControllers.addAnswerOptions)

export default router