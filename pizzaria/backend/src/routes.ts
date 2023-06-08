import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { userValid } from "./middlewares/UserValid";
import { DetailsUserController } from "./controllers/user/DetailsUserController";

const router = Router();

router.post("/users", new CreateUserController().handle)

router.post("/login", new AuthUserController().handle)

router.get("/me", userValid, new DetailsUserController().handle)

export { router };