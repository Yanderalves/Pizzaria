import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";
import prismaClient from "../../prisma";

class CreateUserController {
    handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!email) {
            throw new Error("User/Password Incorrect")
        }

        const userAlreadyExists = prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        // if (userAlreadyExists) {
        //     throw new Error("user already exists")
        // }

    }
}


export { CreateUserController };