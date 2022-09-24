import { Router } from "express";

//controllers
import languageControllers from "../controllers/languageControllers"

const router = Router()

router.post("/create", languageControllers.create)
router.put("/addintroductions/:id", languageControllers.addIntructions)

export default router