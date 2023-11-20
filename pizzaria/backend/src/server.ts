import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors"
import path from "path";

import { router } from './routes';

const main = express();

main.use(express.json());
main.use(router);


main.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "uploads"))
)

main.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Request foi de vasco HAHAHAHAHHAHAHAHAHAH"
    })
})

main.listen(3030, () => {
    console.log("Server running")
});