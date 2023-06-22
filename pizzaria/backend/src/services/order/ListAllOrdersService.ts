import prismaClient from "../../prisma";

class ListAllOrdersService {
    async execute() {
        const ordersList = prismaClient.order.findMany({
            where: {
                draft: false,
                status: false
            }
        })

        return ordersList;
    }
}

export { ListAllOrdersService };