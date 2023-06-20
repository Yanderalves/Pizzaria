import { Request, Response } from "express";

import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
    async handle(req: Request, res: Response) {

        const { orderId, productId, amount } = req.body;

        const addItemService = new AddItemService();

        const item = await addItemService.execute({
            productId,
            amount,
            orderId
        })

        return res.json(item);
    }
}

export { AddItemController };