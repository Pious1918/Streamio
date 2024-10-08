import bcrypt from 'bcryptjs'

import { userRepository } from '../repositories/userRepository'

import { IuserDocument } from '../models/userModel'

import jwt from 'jsonwebtoken'; // Correct import statement for jsonwebtoken
import dotenv from 'dotenv'
import { IadminDocument } from '../models/adminModel';

dotenv.config()

export class UserService {

    private _userRepository!: userRepository;

    constructor() {
        this._userRepository = new userRepository()
    }


    //register new user
    async registerUser(name: string, email: string, password: string, phonenumber: string, country: string): Promise<IuserDocument> {

        const existingUser = await this._userRepository.findByEmail(email)
        if (existingUser) {
            throw new Error("User already exists")
        }

        const hashPassword = await bcrypt.hash(password, 10)
        console.log("Here at services", hashPassword)

        return this._userRepository.createUser({
            name,
            email,
            password: hashPassword,
            phonenumber,
            country,
            role: 'user'
        })

    }


    async findByemail(email: string): Promise<IuserDocument | null> {
        return this._userRepository.findByEmail(email)
    }


    async userDetails(email: string) {
        return this._userRepository.findByEmail(email)
    }


    async login(email: string, password: string): Promise<IuserDocument> {

        const user = await this._userRepository.findByEmail(email)

        if (!user) {
            throw new Error('invalid email')
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        console.log("hti", isValidPassword)
        if (!isValidPassword) {
            console.log("nott hererere")
            throw new Error('Invalid password')
        }

        return user
    }


    async getUser(token: any) {
        if (!token) {
            throw new Error("No token provided")
        }

        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)
            console.log("@serv", decoded.userId)
            let email = decoded.email
            const user = await this._userRepository.findByEmail(email)
            console.log("user iss", user)
            return user
        } catch (error) {

        }
    }



    async adminLogin(email: string, password: string): Promise<IadminDocument> {
        // Find the user by email and check if their role is 'admin'
        const user = await this._userRepository.findByEmailAndRole(email, 'admin');

        console.log("admin", user)
        // Check if the user exists
        if (!user) {
            throw new Error('Invalid email or not an admin');
        }


        // Compare the provided password with the stored hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        // If all checks pass, return the user data (or redirect)
        return user;

    }



    //register admin
    async registerAdmin(name: string, email: string, password: string, phonenumber: string, country: string): Promise<IadminDocument> {

        const existingUser = await this._userRepository.findByEmailAdmin(email)
        if (existingUser) {
            throw new Error("admin already exists")
        }

        const hashPassword = await bcrypt.hash(password, 10)
        console.log("Here at services", hashPassword)

        return this._userRepository.createAdmin({
            name,
            email,
            password: hashPassword,
            phonenumber,
            country,
            role: 'admin'
        })

    }


    async getAllUsers(): Promise<any> {
        try {
            // Call the repository method to get all users
            const allUsers = await this._userRepository.getAllUsers();
            return allUsers;
        } catch (error) {
            // Log and throw the error to be handled at the controller level
            console.error("Error in getAllUsers:", error);
            throw new Error('Error fetching users from the service');
        }
    }


    async updateProfile(userId:any , updateFields:any):Promise<any>{
        try {
            const updatedFields:any={}
            console.log("@service",updateFields)
            console.log(userId)
            if(updateFields.name){
                updatedFields.name=updateFields.name
            }
            if(updateFields.email){
                updatedFields.email=updateFields.email
            }
            if(updateFields.phonenumber){
                updatedFields.phonenumber=updateFields.phonenumber
            }
            if(updateFields.country){
                updatedFields.country=updateFields.country
            }
            return await this._userRepository.updateProfileByUserId(userId,updatedFields)
                // name , email, phonenumber , country

        } catch (error) {
            
        }
    }
    
}