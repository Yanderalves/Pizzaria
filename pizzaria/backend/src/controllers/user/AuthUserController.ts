import prismaClient from "../../prisma";
import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";


class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Fill in all data")
        }

        const login = await new AuthUserService().execute({ email, password });

        res.json(login);

    }
}

export { AuthUserController };