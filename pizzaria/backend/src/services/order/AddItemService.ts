import prismaClient from "../../prisma";

interface ItemRequest {
    product_id: string;
    amount: number;
    order_id: string;
}

class AddItemService {
    async execute({ product_id, amount, order_id }: ItemRequest) {
        const item = prismaClient.item.create({
            data: {
                product_id,
                amount,
                order_id
            }
        })

        return item;
    }
}

export { AddItemService };