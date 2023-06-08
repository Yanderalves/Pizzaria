import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { userValid } from "./middlewares/UserValid";
import { DetailsUserController } from "./controllers/user/DetailsUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { GetAllCategoriesController } from "./controllers/category/GetAllCategoryController";

const router = Router();

// Rotas USER

router.post("/users", new CreateUserController().handle)

router.post("/login", new AuthUserController().handle)

router.get("/me", userValid, new DetailsUserController().handle)

// Rotas CATEGORY

router.post("/category", userValid, new CreateCategoryController().handle)

router.get("/category", userValid, new GetAllCategoriesController().handle)

export { router };