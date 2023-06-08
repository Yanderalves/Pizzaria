import { Request, Response } from 'express';

import { GetAllProductsByCategoryService } from '../../services/product/GetAllProductsByCategoryService';

class GetAllProductsByCategoryController {
    async handle(req: Request, res: Response) {
        const categoryId = req.query.categoryId as string;

        if (!categoryId) {
            throw new Error("Category is Required ")
        }

        const getAllProductsByCategoryService = new GetAllProductsByCategoryService();

        const listProductsByCategory = await getAllProductsByCategoryService.execute({ categoryId });

        return res.json(listProductsByCategory);

    }
}

export { GetAllProductsByCategoryController };