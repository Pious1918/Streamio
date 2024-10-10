/// contains the request body coming from frontend

import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { generateToken } from "../utils/jwtHelper";
import { IUserController } from "../interfaces/uS.controller.interface";







export class UserController implements IUserController{

    private _userService:UserService

    constructor(){
        this._userService = new UserService()
    }

// registering a new user
    public registerUser = async (req: Request , res:Response)=>{
        const { username, email, password, mobile, country } = req.body
        console.log(req.body)
        try {

            const user = await this._userService.registerUser(username, email, password, mobile, country)
    
            //generating token after registartion
            const token = generateToken(user)
    
            res.status(201).json({ user, token })
    
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: "not successfull" })
        }
    }



    // Checking email end points
    public checkEmail = async(req: Request , res:Response)=>{
        const { email } = req.query

        try {
            const existinguser = await this._userService.findByemail(email as string)
            if (existinguser) {
                res.status(200).json({ exists: true })
                return
            }
            else {
                res.status(200).json({ exists: false });
                return
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "server error" })
        }
    }



    //loggin in the registered user
     public loginuser = async (req: Request, res: Response) => {
        const { email, password } = req.body
        console.log(email)
    
        try {
    
            const result = await this._userService.login(email, password)
            console.log("data is ",result)
            const token = generateToken(result)
            res.status(200).json({message:'Login successfull',token })
    
        } catch (error:any) {
    
            if(error.message==='invalid email'){
                res.status(404).json({error:'user not found'})
            }
            else if(error.message=='Invalid password'){
                res.status(401).json({error:'Invalid password'})
            }else{
                res.status(401).json({ error: "an unexpected error happened" })
    
            }
    
    
        }
    }


    public getUserProfile= async(req:Request ,res:Response)=>{
        const token:any = req.headers.authorization?.split(' ')[1]
        console.log("usera@11",token)
        const userProfile = await this._userService.getUser(token)
        res.status(200).json({message:'user details',userProfile })

    }






    ///Admin controller
    public adminLogin = async(req:Request , res:Response)=>{
        const {email , password} =req.body
        console.log("admin data is",email)

        try {
            const admin = await this._userService.adminLogin(email , password)
            console.log("data is ",admin)
            const token = generateToken(admin)
            res.status(200).json({message:'Login successfull',token })
        } catch (error) {
            
        }
    }


    //registering admin
    public registerAdmin = async (req: Request , res:Response)=>{
        const { username, email, password, mobile, country } = req.body
        console.log(req.body)
        try {

            const user = await this._userService.registerAdmin(username, email, password, mobile, country)
    
            //generating token after registartion
            const token = generateToken(user)
    
            res.status(201).json({ user, token })
    
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: "not successfull" })
        }
    }



    public loadAdminDashboard = async (req: Request, res: Response): Promise<void> => {
        try {
            // Log to check if the controller method is being hit
            console.log("Controller: loadAdminDashboard");
    
            // Fetch all users from the service
            const allUsers = await this._userService.getAllUsers();
    
            // Log the fetched users for debugging purposes
            console.log("Fetched Users:", allUsers);
    
            // Respond with the list of users and a success message
            res.status(200).json({ users: allUsers });
        } catch (error) {
            // Log the error to identify the issue
            console.error("Error in loadAdminDashboard:", error);
    
            // Respond with an error status and message
            res.status(500).json({ message: 'Failed to load users' });
        }
    }
    

    public updateUserData = async(req:Request , res:Response) =>{
        console.log("at controller")
        const {userId, name , image , email , phonenumber , country}=req.body
        console.log(name , image , email , phonenumber , country)
        console.log(userId)
        try {
            const updatedProfile = await this._userService.updateProfile(userId,{name , email, phonenumber , country})
             res.status(200).json({ message: 'Profile updated successfully', updatedProfile });

        } catch (error) {
            
        }
    }



}























