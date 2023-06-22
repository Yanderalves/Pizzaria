import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";


class FinishOrderController {
    async handle(req: Request, res: Response) {

        const orderId = req.body.order_id as string;

        const finishOrderService = new FinishOrderService();

        const order = await finishOrderService.execute({ orderId });

        return res.json(order);
    }
}

export { FinishOrderController };