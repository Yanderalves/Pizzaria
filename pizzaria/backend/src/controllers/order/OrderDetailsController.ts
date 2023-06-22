import { Request, Response } from "express";
import { OrderDetailsService } from "../../services/order/OrderDetailsService";

class OrderDetailsController {
    async handle(req: Request, res: Response) {
        const orderId = req.params.order_id as string;

        const orderDetailService = new OrderDetailsService();

        const orderDetails = await orderDetailService.execute({ orderId });

        return res.json(orderDetails);
    }
}

export { OrderDetailsController };