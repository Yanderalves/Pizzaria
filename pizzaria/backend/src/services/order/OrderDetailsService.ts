import prismaClient from "../../prisma";

interface OrderRequest {
    orderId: string;
}

class OrderDetailsService {
    async execute({ orderId }: OrderRequest) {
        const item = prismaClient.item.findFirst({
            where: {
                orderId: orderId
            },
            include: {
                Product: true,
                Order: true
            }
        })

        return item;
    }
}

export { OrderDetailsService };