import { Request, Response } from "express";

import { RemoveOrderService } from "../../services/order/RemoveOrderService";


class RemoveOrderController {
    async handle(req: Request, res: Response) {
        const orderId = req.query.order_id as string;

        if (!orderId) {
            throw new Error("orderId is required")
        }

        const removeOrderService = new RemoveOrderService();

        const order = await removeOrderService.execute({ orderId })

        return res.json(order);
    }
}

export { RemoveOrderController };