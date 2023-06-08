import { Request, Response } from "express";
import { GetAllCategoriesService } from "../../services/category/GetAllCategoriesService";


class GetAllCategoriesController {
    async handle(req: Request, res: Response) {
        const getAllCategoriesService = new GetAllCategoriesService();

        const categories = await getAllCategoriesService.execute();

        console.log(categories);

        return res.json(categories)

    }
}

export { GetAllCategoriesController };