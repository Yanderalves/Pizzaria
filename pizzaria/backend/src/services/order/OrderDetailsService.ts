import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class OrderDetailsService {
    async execute({ order_id }: OrderRequest) {

        console.log(order_id)

        const item = prismaClient.item.findFirst({
            where: {
                order_id: order_id
            },
            include: {
                product: true,
                order: true,

            }
        })

        return item;

        console.log(item)
    }
}

export { OrderDetailsService };