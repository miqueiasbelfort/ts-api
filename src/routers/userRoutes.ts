import {Router} from "express"

//controllers
import UseController from "../controllers/useControllers"

const router = Router()

router.get("/", UseController.information)

export default router