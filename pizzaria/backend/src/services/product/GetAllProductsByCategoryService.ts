import prismaClient from "../../prisma"

interface ProductRequest {
    categoryId: string
}

class GetAllProductsByCategoryService {
    async execute({ categoryId }: ProductRequest) {
        const productsByCategory = await prismaClient.product.findMany({
            where: {
                categoryId: categoryId
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true
            }
        })

        return productsByCategory;
    }
}

export { GetAllProductsByCategoryService };
