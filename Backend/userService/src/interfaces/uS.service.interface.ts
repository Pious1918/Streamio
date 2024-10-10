import { Request, Response } from "express";
import { IuserDocument } from "../models/userModel";
import { IadminDocument } from "../models/adminModel";

export interface IUserService {
    registerUser(name: string, email: string, password: string, phonenumber: string, country: string): Promise<IuserDocument>,
    // Find a user by email
    findByemail(email: string): Promise<IuserDocument | null>;

    // Get user details by email
    userDetails(email: string): Promise<IuserDocument | null>;

    // Log in a user with email and password
    login(email: string, password: string): Promise<IuserDocument>;

    // Get user by JWT token
    getUser(token: string): Promise<IuserDocument | null>;

    // Log in an admin
    adminLogin(email: string, password: string): Promise<IadminDocument>;

    // Register a new admin
    registerAdmin(
        name: string,
        email: string,
        password: string,
        phonenumber: string,
        country: string
    ): Promise<IadminDocument>;

    // Get all users
    getAllUsers(): Promise<IuserDocument[]>;

    // Update user profile
    updateProfile(
        userId: string,
        updateFields: {
            name?: string;
            email?: string;
            phonenumber?: string;
            country?: string;
        }
    ): Promise<IuserDocument | null>;
}