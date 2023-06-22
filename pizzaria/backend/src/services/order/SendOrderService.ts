import prismaClient from "../../prisma";

interface OrderRequest {
    orderId: string;
}

class SendOrderService {
    async execute({ orderId }: OrderRequest) {
        const order = prismaClient.order.update({
            where: {
                id: orderId
            },
            data: {
                draft: false
            }
        })

        return order;
    }
}

export { SendOrderService };