import { Router } from "express";
import multer from "multer";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { DetailsUserController } from "./controllers/user/DetailsUserController";

import { GetAllCategoriesController } from "./controllers/category/GetAllCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { GetAllProductsByCategoryController } from "./controllers/product/GetAllProductsByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";

import { userValid } from "./middlewares/UserValid";

import cors from "cors";
import uploadConfig from "./config/multer";
import { AddItemController } from "./controllers/order/AddItemController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { ListAllOrdersController } from "./controllers/order/ListAllOrdersController";
import { OrderDetailsController } from "./controllers/order/OrderDetailsController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./uploads"))

router.use(
    cors({
        origin: '*', // Origem permitida
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    })
);

// Rotas USER

router.post("/users", new CreateUserController().handle)

router.post("/login", new AuthUserController().handle)

router.get("/me", new DetailsUserController().handle)

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

router.delete("/order/item", userValid, new RemoveItemController().handle)


export { router };

