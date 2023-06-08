import prismaClient from "../../prisma";

class GetAllCategoriesService {
    async execute() {
        const categories = prismaClient.category.findMany({
            select: {
                id: true,
                name: true
            }
        })

        return categories;
    }
}

export { GetAllCategoriesService }