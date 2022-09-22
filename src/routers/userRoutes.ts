import {Router} from "express"

//controllers
import UseController from "../controllers/useControllers"

const router = Router()

router.post("/create", UseController.create)

export default router