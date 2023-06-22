import prismaClient from "../../prisma";

interface OrderRequest {
    orderId: string;
}

class FinishOrderService {
    async execute({ orderId }: OrderRequest) {
        const order = prismaClient.order.update({
            where: {
                id: orderId
            },
            data: {
                status: true
            }
        })

        return order;
    }
}

export { FinishOrderService };