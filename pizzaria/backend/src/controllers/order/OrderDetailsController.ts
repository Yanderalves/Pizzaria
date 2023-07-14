import { Request, Response } from "express";
import { OrderDetailsService } from "../../services/order/OrderDetailsService";

class OrderDetailsController {
    async handle(req: Request, res: Response) {

        const order_id = req.query.order_id as string;

        if (!order_id) {
            throw new Error("Order is null")
        }

        const orderDetailService = new OrderDetailsService();

        const orderDetails = await orderDetailService.execute({ order_id });

        console.log(orderDetails)

        return res.json(orderDetails);
    }
}

export { OrderDetailsController };