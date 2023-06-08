import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    categoryId: string;
}

class CreateProductService {
    async execute({ name, price, description, banner, categoryId }: ProductRequest) {

        const product = prismaClient.product.create({
            data: {
                name,
                price,
                description,
                banner,
                categoryId
            }
        })

        return product;

    }
}

export { CreateProductService };