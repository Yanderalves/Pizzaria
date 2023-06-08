import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { DetailsUserController } from "./controllers/user/DetailsUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

import { GetAllCategoriesController } from "./controllers/category/GetAllCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { GetAllProductsByCategoryController } from "./controllers/product/GetAllProductsByCategoryController";

import { userValid } from "./middlewares/UserValid";

import uploadConfig from "./config/multer"

const router = Router();

const upload = multer(uploadConfig.upload("./uploads"))

// Rotas USER

router.post("/users", new CreateUserController().handle)

router.post("/login", new AuthUserController().handle)

router.get("/me", userValid, new DetailsUserController().handle)

// Rotas CATEGORY

router.post("/category", userValid, new CreateCategoryController().handle)

router.get("/category", userValid, new GetAllCategoriesController().handle)

//Rotas PRODUCTS

router.post("/product", userValid, upload.single("banner"), new CreateProductController().handle)

router.get("/category/product", userValid, new GetAllProductsByCategoryController().handle)

export { router };