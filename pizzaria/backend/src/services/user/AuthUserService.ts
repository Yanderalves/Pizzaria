import prismaClient from "../../prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"

interface UserLogin {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: UserLogin) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email/password incorrects")
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/password incorrects")
        }

        const token = sign({
            name: user.name,
            email: user.email
        },
            process.env.SECRET_JWT,
            {
                subject: user.id,
                expiresIn: "30d"

            }
        )

        return {
            name: user.name,
            email: user.email,
            token: token
        };
    }
}


export { AuthUserService };