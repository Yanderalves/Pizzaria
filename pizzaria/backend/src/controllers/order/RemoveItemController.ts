import { Request, Response } from "express";

import { RemoveItemService } from "../../services/order/RemoveItemService";

class RemoveItemController {
    async handle(req: Request, res: Response) {

        const itemId = req.query.item_id as string;

        const removeItemService = new RemoveItemService();

        const item = await removeItemService.execute({
            itemId
        })

        return res.json(item);
    }
}

export { RemoveItemController };