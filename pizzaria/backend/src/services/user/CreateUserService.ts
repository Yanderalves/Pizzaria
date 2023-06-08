import prismaClient from "../../prisma";
import { hash } from "bcrypt";
interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("user already exists")
        }

        const passwordEncrypted = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                email: email,
                password: passwordEncrypted,
                name: name
            },
            select: {
                email: true,
                name: true
            }
        })

        return user;

    }
}

export { CreateUserService };