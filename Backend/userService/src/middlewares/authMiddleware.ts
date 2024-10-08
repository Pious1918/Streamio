import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class Middleware {

    // Middleware method for authentication
    public authorize(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(403).json({ error: 'No token provided' });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            (req as any).user = decoded; // Attach the decoded token to req object as user
            console.log("hit in the middle");
            next();
        } catch (error) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
    }
}
