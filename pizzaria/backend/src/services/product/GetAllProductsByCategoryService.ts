import prismaClient from "../../prisma"

interface ProductRequest {
    category_id: string
}

class GetAllProductsByCategoryService {
    async execute({ category_id }: ProductRequest) {
        const productsByCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id
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
