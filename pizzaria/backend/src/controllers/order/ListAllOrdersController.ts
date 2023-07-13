import { Request, Response } from "express";
import { ListAllOrdersService } from "../../services/order/ListAllOrdersService";

class ListAllOrdersController {
    async handle(req: Request, res: Response) {
        const listAllOrderService = new ListAllOrdersService();

        const ordersList = await listAllOrderService.execute();

        return res.json(ordersList)
    }
}

export { ListAllOrdersController };