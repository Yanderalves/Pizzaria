import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";


interface Payload {
    sub: string
}

export const userValid = (req: Request, res: Response, next: NextFunction) => {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ message: "Error 401, unauthorized" }).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(
            token,
            process.env.SECRET_JWT
        ) as Payload;

        req.userId = sub;

        return next();

    } catch (err) {
        return res.status(401).json({ message: "Error 401, unauthorized" }).end();
    }

}