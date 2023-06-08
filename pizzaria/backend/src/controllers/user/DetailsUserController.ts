import { Request, Response } from 'express';
import { DetailsUserService } from '../../services/user/DetailsUserService';


class DetailsUserController {
    async handle(req: Request, res: Response) {
        const detailsUserService = new DetailsUserService();

        const userId = req.userId;

        const user = await detailsUserService.execute(userId);

        return res.json(user)
    }
}

export { DetailsUserController }