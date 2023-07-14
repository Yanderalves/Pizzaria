import { Request, Response } from 'express';

import { GetAllProductsByCategoryService } from '../../services/product/GetAllProductsByCategoryService';

class GetAllProductsByCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string;

        if (!category_id) {
            throw new Error("Category is Required ")
        }

        const getAllProductsByCategoryService = new GetAllProductsByCategoryService();

        const listProductsByCategory = await getAllProductsByCategoryService.execute({ category_id });

        return res.json(listProductsByCategory);

    }
}

export { GetAllProductsByCategoryController };