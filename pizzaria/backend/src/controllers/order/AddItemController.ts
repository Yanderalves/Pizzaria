import { Request, Response } from "express";

import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
    async handle(req: Request, res: Response) {

        const { order_id, product_id, amount } = req.body;

        const addItemService = new AddItemService();

        const item = await addItemService.execute({
            product_id,
            amount,
            order_id
        })

        return res.json(item);
    }
}

export { AddItemController };