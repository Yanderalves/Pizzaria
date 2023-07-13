import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { DetailsUserController } from "./controllers/user/DetailsUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

import { GetAllCategoriesController } from "./controllers/category/GetAllCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { GetAllProductsByCategoryController } from "./controllers/product/GetAllProductsByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";

import { userValid } from "./middlewares/UserValid";

import uploadConfig from "./config/multer"
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListAllOrdersController } from "./controllers/order/ListAllOrdersController";
import { OrderDetailsController } from "./controllers/order/OrderDetailsController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import cors from "cors";

const router = Router();

const upload = multer(uploadConfig.upload("./uploads"))

router.use(
    cors({
        origin: 'http://localhost:3000', // Origem permitida
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    }) 
);

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

// Rotas ORDER

router.post("/order", userValid, new CreateOrderController().handle);

router.delete("/order", userValid, new RemoveOrderController().handle);

router.post("/order/item", userValid, new AddItemController().handle);

router.patch("/order", userValid, new SendOrderController().handle);

router.get("/orders", userValid, new ListAllOrdersController().handle);

router.get("/order/details", userValid, new OrderDetailsController().handle);

router.patch("/order/finish", userValid, new FinishOrderController().handle);

export { router };