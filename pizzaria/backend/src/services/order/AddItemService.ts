import prismaClient from "../../prisma";

interface ItemRequest {
    productId: string;
    amount: number;
    orderId: string;
}

class AddItemService {
    async execute({ productId, amount, orderId }: ItemRequest) {
        const item = prismaClient.item.create({
            data: {
                productId,
                amount,
                orderId
            }
        })

        return item;
    }
}

export { AddItemService };