import { Request, Response } from "express";

export interface IUserController {
    registerUser(req: Request, res: Response): Promise<void>;
    checkEmail(req: Request, res: Response): Promise<void>;
    loginuser(req: Request, res: Response): Promise<void>;
    getUserProfile(req: Request, res: Response): Promise<void>;

    // Admin related interfaces
    adminLogin(req: Request, res: Response): Promise<void>;
    registerAdmin(req: Request, res: Response): Promise<void>;
    loadAdminDashboard(req: Request, res: Response): Promise<void>;
    updateUserData(req: Request, res: Response): Promise<void>;
}
