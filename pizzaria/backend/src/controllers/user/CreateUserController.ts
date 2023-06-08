import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!email) {
            throw new Error("Email is missing")
        }

        const user = await new CreateUserService().execute({ name, email, password });

        res.json(user);

    }
}


export { CreateUserController };