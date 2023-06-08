import { Request, Response } from "express";

import { CreateOrderService } from "../../services/order/CreateOrderService";


class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { table, name } = req.body;

        if (!table) {
            throw new Error("Table is required")
        }

        const createUSerService = new CreateOrderService();

        const order = await createUSerService.execute({ table, name })

        return res.json(order);
    }
}

export { CreateOrderController };