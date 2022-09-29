import {Router} from "express"

//controllers
import UseController from "../controllers/useControllers"

const router = Router()

router.post("/create", UseController.create)
router.post('/login', UseController.login)
router.get('/', UseController.getUser)
router.put('/addlang/:id', UseController.addLanguage)

export default router