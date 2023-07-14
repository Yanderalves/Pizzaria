import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class OrderDetailsService {
    async execute({ order_id }: OrderRequest) {


        const item = prismaClient.item.findMany({
            where: {
                order_id: order_id
            },
            include: {
                product: true,
                order: true,

            }
        })

        return item;
    }
}

export { OrderDetailsService };